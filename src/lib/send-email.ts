import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || "contato@example.com";

const resend = resendKey ? new Resend(resendKey) : null;

export async function sendSignInEmail({ email, url }: { email: string; url: string }) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY ausente. Link:", url);
    return;
  }

  await resend.emails.send({
    from,
    to: email,
    subject: "Acesse sua conta - Barbearia Binho Cort's",
    html: `
      <div style="font-family:Arial,sans-serif;padding:16px;background:#0b0b0b;color:#f8f8f8;border:1px solid #d4af37;border-radius:12px;">
        <h2 style="color:#d4af37;">Entrar na conta</h2>
        <p>Clique no botão para entrar:</p>
        <a href="${url}" style="display:inline-block;padding:12px 18px;background:#d4af37;color:#000;text-decoration:none;border-radius:10px;font-weight:bold;">Acessar</a>
        <p style="margin-top:12px;font-size:12px;color:#ccc;">Link válido por 15 minutos.</p>
      </div>
    `,
  });
}

export async function sendResetEmail({ email, url }: { email: string; url: string }) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY ausente. Link reset:", url);
    return;
  }

  await resend.emails.send({
    from,
    to: email,
    subject: "Redefinir senha - Barbearia Binho Cort's",
    html: `
      <div style="font-family:Arial,sans-serif;padding:16px;background:#0b0b0b;color:#f8f8f8;border:1px solid #d4af37;border-radius:12px;">
        <h2 style="color:#d4af37;">Redefinir senha</h2>
        <p>Clique para criar uma nova senha:</p>
        <a href="${url}" style="display:inline-block;padding:12px 18px;background:#d4af37;color:#000;text-decoration:none;border-radius:10px;font-weight:bold;">Redefinir</a>
        <p style="margin-top:12px;font-size:12px;color:#ccc;">Link válido por 30 minutos.</p>
      </div>
    `,
  });
}
