import Fastify from "fastify";
import cors from "@fastify/cors";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Stripe from "stripe";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "./lib/env";
import { prisma } from "./lib/prisma";
import { sendEmail, resetTemplate } from "./lib/email";
import { getUserIdFromRequest, signToken } from "./lib/auth";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;
const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

const app = Fastify({ logger: true });

app.register(cors, {
  origin: true,
});

app.get("/health", async () => ({ ok: true }));

app.get("/users", async () => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
  });
  return users;
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

app.post("/auth/signup", async (request, reply) => {
  const parse = signupSchema.safeParse(request.body);
  if (!parse.success) return reply.status(400).send({ error: "Dados inválidos" });
  const { name, email, password, confirmPassword } = parse.data;

  if (password !== confirmPassword) return reply.status(400).send({ error: "Senhas não conferem" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return reply.status(409).send({ error: "Email já cadastrado" });

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
    select: { id: true, name: true, email: true },
  });

  const token = signToken({ sub: user.id, email: user.email });
  return { user, token };
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

app.post("/auth/login", async (request, reply) => {
  const parse = loginSchema.safeParse(request.body);
  if (!parse.success) return reply.status(400).send({ error: "Dados inválidos" });
  const { email, password } = parse.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.password) return reply.status(401).send({ error: "Credenciais inválidas" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return reply.status(401).send({ error: "Credenciais inválidas" });

  const token = signToken({ sub: user.id, email: user.email });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
});

const resetRequestSchema = z.object({
  email: z.string().email(),
});

app.post("/auth/reset/request", async (request, reply) => {
  const parse = resetRequestSchema.safeParse(request.body);
  if (!parse.success) return reply.status(400).send({ error: "Dados inválidos" });
  const { email } = parse.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { ok: true };

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { email, token, expires },
  });

  const url = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset/${token}`;
  await sendEmail(email, "Redefinir senha - Barbearia Binho Cort's", resetTemplate(url));
  return { ok: true };
});

const resetConfirmSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

app.post("/auth/reset/confirm", async (request, reply) => {
  const parse = resetConfirmSchema.safeParse(request.body);
  if (!parse.success) return reply.status(400).send({ error: "Dados inválidos" });
  const { token, password, confirmPassword } = parse.data;

  if (password !== confirmPassword) return reply.status(400).send({ error: "Senhas não conferem" });

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.expires < new Date()) {
    return reply.status(400).send({ error: "Token inválido ou expirado" });
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { email: record.email }, data: { password: hashed } }),
    prisma.passwordResetToken.delete({ where: { token } }),
  ]);

  return { ok: true };
});

app.get("/services", async () => {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { name: "asc" } });
  if (services.length === 0) {
    const defaults = [
      { name: "Corte Social", description: "Clássico limpo", priceCents: 4000, durationMinutes: 30 },
      { name: "Degradê + Barba", description: "Acabamento com navalha", priceCents: 6500, durationMinutes: 45 },
      { name: "Barba Completa", description: "Toalha quente e hidratação", priceCents: 3000, durationMinutes: 25 },
    ];
    await prisma.service.createMany({ data: defaults });
    return defaults;
  }
  return services;
});

const bookingSchema = z.object({
  serviceId: z.string(),
  startTime: z.string().datetime(),
  notes: z.string().max(280).optional(),
});

app.addHook("preHandler", (request, reply, done) => {
  if (request.routerPath?.startsWith("/bookings")) {
    const user = getUserIdFromRequest(request);
    if (!user) {
      reply.status(401).send({ error: "Não autenticado" });
      return;
    }
    (request as any).user = user;
  }
  done();
});

app.get("/bookings", async (request) => {
  const user = (request as any).user;
  const bookings = await prisma.booking.findMany({
    where: { userId: user?.sub },
    include: { service: true, payment: true },
    orderBy: { startTime: "asc" },
  });
  return bookings;
});

app.post("/bookings", async (request, reply) => {
  const user = (request as any).user;
  const parse = bookingSchema.safeParse(request.body);
  if (!parse.success) return reply.status(400).send({ error: "Dados inválidos" });
  const { serviceId, startTime, notes } = parse.data;

  const service = await prisma.service.findUnique({ where: { id: serviceId, active: true } });
  if (!service) return reply.status(404).send({ error: "Serviço não encontrado" });

  const start = new Date(startTime);
  const amount = service.priceCents;

  let paymentIntent: Stripe.PaymentIntent | null = null;
  if (stripe) {
    paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      description: `Agendamento: ${service.name}`,
      metadata: { serviceId, startTime },
    });
  }

  const booking = await prisma.booking.create({
    data: {
      userId: user?.sub,
      serviceId,
      startTime: start,
      priceCents: amount,
      status: paymentIntent ? "PENDING" : "CONFIRMED",
      notes,
      payment: paymentIntent
        ? {
            create: {
              provider: "stripe",
              paymentIntentId: paymentIntent.id,
              clientSecret: paymentIntent.client_secret || "",
              status: paymentIntent.status,
              amountCents: amount,
            },
          }
        : undefined,
    },
    include: { payment: true, service: true },
  });

  return { booking, clientSecret: paymentIntent?.client_secret || null };
});

const chatSchema = z.object({
  message: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});

const systemPrompt = `
Você é o assistente virtual da Barbearia Binho Cort's. 
Endereço: Rua César Giacomini, 176, Lençóis Paulista/SP.
Horário: Ter-Sex 9:30 às 19h, Sáb 9h às 17h.
Telefone/WhatsApp: (14) 99611-1440.
Serviços comuns: Corte Social (R$40), Degradê (R$40), Degradê+Barba (R$65), Barba (R$30), Pezinho (R$15).
Se o cliente pedir agendar, peça dia/horário e ofereça o link do WhatsApp https://wa.me/5514996111440 ou aponte para a página de agendamento.
Se não souber, encaminhe para atendimento humano (diga para falar no WhatsApp).
`;

app.post("/chat", async (request, reply) => {
  const parse = chatSchema.safeParse(request.body);
  if (!parse.success) return reply.status(400).send({ error: "Dados inválidos" });
  if (!openai) {
    return {
      reply: "Estou offline agora. Fale no WhatsApp (14) 99611-1440.",
      handoff: true,
    };
  }
  const { message, history } = parse.data;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 300,
    messages: [
      { role: "system", content: systemPrompt },
      ...(history || []),
      { role: "user", content: message },
    ],
  });
  const replyText =
    completion.choices[0]?.message?.content ||
    "Posso te ajudar pelo WhatsApp: (14) 99611-1440.";
  return { reply: replyText, handoff: replyText.toLowerCase().includes("whatsapp") };
});

app.listen({ port: Number(env.PORT), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`API rodando em ${address}`);
});
