"use client";

import { useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetConfirmPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleReset(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setMessage(data.error || "Não foi possível redefinir.");
    } else {
      setMessage("Senha alterada! Voltando para login...");
      setTimeout(() => router.push("/login"), 1200);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <div className="w-full max-w-md bg-black/70 border border-brand/40 rounded-2xl p-8 shadow-[0_0_20px_#D4AF37] space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.35em] text-brand/80 uppercase">Senha</p>
          <h1 className="text-3xl font-bold text-brand drop-shadow-[0_0_10px_#D4AF37]">Nova senha</h1>
          <p className="text-sm text-neutral-300">Crie uma nova senha para sua conta.</p>
        </div>

        <form className="space-y-4" onSubmit={handleReset}>
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
            <label className="text-sm text-neutral-300">Confirmar senha</label>
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
            Salvar nova senha
          </button>
        </form>

        {message && <p className="text-center text-sm text-neutral-200">{message}</p>}
      </div>
    </div>
  );
}
