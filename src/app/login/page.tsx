"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePasswordLogin(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setMessage("Email ou senha incorretos.");
    } else {
      setMessage("Login realizado!");
    }
  }

  async function handleMagicLink(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const res = await signIn("email", { email, redirect: false });
    setLoading(false);
    if (res?.error) {
      setMessage("Não foi possível enviar o link.");
    } else {
      setMessage("Enviamos um link mágico para seu email.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <div className="w-full max-w-md bg-black/70 border border-brand/40 rounded-2xl p-8 shadow-[0_0_20px_#D4AF37] space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.35em] text-brand/80 uppercase">Acesso</p>
          <h1 className="text-3xl font-bold text-brand drop-shadow-[0_0_10px_#D4AF37]">Entrar</h1>
          <p className="text-sm text-neutral-300">Use sua conta ou peça um link por email.</p>
        </div>

        <form className="space-y-4" onSubmit={handlePasswordLogin}>
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
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Senha</label>
            <input
              type="password"
              className="w-full rounded-xl bg-white/5 border border-brand/30 px-3 py-3 text-sm focus:border-brand focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand text-black font-semibold py-3 hover:bg-brand/85 transition disabled:opacity-60"
          >
            Entrar com senha
          </button>
        </form>

        <form onSubmit={handleMagicLink} className="space-y-3">
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full rounded-xl border border-brand text-brand font-semibold py-3 hover:bg-brand hover:text-black transition disabled:opacity-60"
          >
            Receber link mágico
          </button>
        </form>

        {message && <p className="text-center text-sm text-neutral-200">{message}</p>}

        <div className="flex justify-between text-sm text-brand">
          <Link href="/signup" className="hover:underline">
            Criar conta
          </Link>
          <Link href="/reset" className="hover:underline">
            Esqueci a senha
          </Link>
        </div>
      </div>
    </div>
  );
}
