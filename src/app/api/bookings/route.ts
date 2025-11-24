import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey) : null;

const schema = z.object({
  serviceId: z.string(),
  startTime: z.string().datetime(),
  notes: z.string().max(280).optional(),
  userId: z.string().optional(),
});

function mapStripeStatus(status: Stripe.PaymentIntent.Status): string {
  switch (status) {
    case "succeeded":
      return "SUCCEEDED";
    case "requires_action":
      return "REQUIRES_ACTION";
    case "requires_payment_method":
      return "REQUIRES_PAYMENT_METHOD";
    case "processing":
      return "PROCESSING";
    case "canceled":
      return "CANCELED";
    default:
      return "REQUIRES_PAYMENT_METHOD";
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { serviceId, startTime, notes, userId } = parsed.data;
  const service = await prisma.service.findUnique({ where: { id: serviceId, active: true } });
  if (!service) {
    return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
  }

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
      userId,
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
              status: mapStripeStatus(paymentIntent.status),
              amountCents: amount,
            },
          }
        : undefined,
    },
    include: { payment: true, service: true },
  });

  return NextResponse.json({
    booking,
    clientSecret: paymentIntent?.client_secret || null,
  });
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { startTime: "asc" },
    include: { service: true, payment: true },
  });
  return NextResponse.json(bookings);
}
