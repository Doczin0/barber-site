"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePasswordLogin(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Email ou senha incorretos.");
      } else {
        localStorage.setItem("token", data.token);
        setMessage("Login realizado!");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setMessage("Não foi possível entrar agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <div className="w-full max-w-md bg-black/70 border border-brand/40 rounded-2xl p-8 shadow-[0_0_20px_#D4AF37] space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.35em] text-brand/80 uppercase">Acesso</p>
          <h1 className="text-3xl font-bold text-brand drop-shadow-[0_0_10px_#D4AF37]">Entrar</h1>
          <p className="text-sm text-neutral-300">Use sua conta para gerenciar agendamentos.</p>
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
            Entrar
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
