import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const schema = z.object({
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

const openaiKey = process.env.OPENAI_API_KEY;
const openai = openaiKey
  ? new OpenAI({
      apiKey: openaiKey,
    })
  : null;

const systemPrompt = `
Você é o assistente virtual da Barbearia Binho Cort's. 
Endereço: Rua César Giacomini, 176, Lençóis Paulista/SP.
Horário: Ter-Sex 9:30 às 19h, Sáb 9h às 17h.
Telefone/WhatsApp: (14) 99611-1440.
Serviços comuns: Corte Social (R$40), Degradê (R$40), Degradê+Barba (R$65), Barba (R$30), Pezinho (R$15).
Se o cliente pedir agendar, peça dia/horário e oferta o link rápido do WhatsApp https://wa.me/5514996111440 ou aponte para a página de agendamento.
Se não souber, encaminhe para atendimento humano (diga para falar no WhatsApp).
Se identificar frustração, seja direto e objetivo.
`;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  if (!openai) {
    return NextResponse.json({
      reply: "Estou sem conexão com o assistente agora. Fale conosco no WhatsApp (14) 99611-1440.",
      handoff: true,
    });
  }

  const { message, history } = parsed.data;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...(history || []),
      { role: "user", content: message },
    ],
    temperature: 0.3,
    max_tokens: 350,
  });

  const reply = completion.choices[0]?.message?.content || "Posso te ajudar pelo WhatsApp: (14) 99611-1440.";
  const handoff = reply.toLowerCase().includes("whatsapp");

  return NextResponse.json({ reply, handoff });
}
