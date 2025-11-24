"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ResetRequestPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRequest(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await fetch("/api/auth/reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (!res.ok) {
      setMessage("Não foi possível enviar o link.");
    } else {
      setMessage("Enviamos um link para redefinir sua senha.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <div className="w-full max-w-md bg-black/70 border border-brand/40 rounded-2xl p-8 shadow-[0_0_20px_#D4AF37] space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.35em] text-brand/80 uppercase">Senha</p>
          <h1 className="text-3xl font-bold text-brand drop-shadow-[0_0_10px_#D4AF37]">Redefinir</h1>
          <p className="text-sm text-neutral-300">Informe seu email para receber o link.</p>
        </div>

        <form className="space-y-4" onSubmit={handleRequest}>
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Email</label>
            <input
              type="email"
              className="w-full rounded-xl bg-white/5 border border-brand/30 px-3 py-3 text-sm focus:border-brand focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand text-black font-semibold py-3 hover:bg-brand/85 transition disabled:opacity-60"
          >
            Enviar link
          </button>
        </form>

        {message && <p className="text-center text-sm text-neutral-200">{message}</p>}

        <div className="text-center text-sm text-brand">
          <Link href="/login" className="hover:underline">
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
