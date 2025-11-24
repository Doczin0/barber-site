import { Resend } from "resend";
import { env } from "./env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY não configurada. Conteúdo:", { to, subject });
    return;
  }
  await resend.emails.send({
    from: env.EMAIL_FROM || "contato@example.com",
    to,
    subject,
    html,
  });
}

export function signInTemplate(url: string) {
  return `
    <div style="font-family:Arial,sans-serif;padding:16px;background:#0b0b0b;color:#f8f8f8;border:1px solid #d4af37;border-radius:12px;">
      <h2 style="color:#d4af37;">Acessar sua conta</h2>
      <p>Clique para entrar:</p>
      <a href="${url}" style="display:inline-block;padding:12px 18px;background:#d4af37;color:#000;text-decoration:none;border-radius:10px;font-weight:bold;">Entrar</a>
    </div>
  `;
}

export function resetTemplate(url: string) {
  return `
    <div style="font-family:Arial,sans-serif;padding:16px;background:#0b0b0b;color:#f8f8f8;border:1px solid #d4af37;border-radius:12px;">
      <h2 style="color:#d4af37;">Redefinir senha</h2>
      <p>Clique para criar uma nova senha:</p>
      <a href="${url}" style="display:inline-block;padding:12px 18px;background:#d4af37;color:#000;text-decoration:none;border-radius:10px;font-weight:bold;">Redefinir</a>
    </div>
  `;
}
