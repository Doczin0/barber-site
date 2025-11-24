import crypto from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendResetEmail } from "@/lib/send-email";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: true }); // não revelar se existe
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { email, token, expires },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset/${token}`;
  await sendResetEmail({ email, url: resetUrl });

  return NextResponse.json({ ok: true });
}
