"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setMessage(data.error || "Não foi possível criar a conta.");
    } else {
      setMessage("Conta criada! Agora faça login.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <div className="w-full max-w-md bg-black/70 border border-brand/40 rounded-2xl p-8 shadow-[0_0_20px_#D4AF37] space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.35em] text-brand/80 uppercase">Criar conta</p>
          <h1 className="text-3xl font-bold text-brand drop-shadow-[0_0_10px_#D4AF37]">Cadastro</h1>
          <p className="text-sm text-neutral-300">Cadastre-se para gerenciar seus agendamentos.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Nome</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-brand/30 px-3 py-3 text-sm focus:border-brand focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Confirmar Senha</label>
            <input
              type="password"
              className="w-full rounded-xl bg-white/5 border border-brand/30 px-3 py-3 text-sm focus:border-brand focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand text-black font-semibold py-3 hover:bg-brand/85 transition disabled:opacity-60"
          >
            Criar conta
          </button>
        </form>

        {message && <p className="text-center text-sm text-neutral-200">{message}</p>}

        <div className="text-center text-sm text-brand">
          <Link href="/login" className="hover:underline">
            Já tenho conta
          </Link>
        </div>
      </div>
    </div>
  );
}
