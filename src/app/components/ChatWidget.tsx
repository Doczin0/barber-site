"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaComments, FaTimes, FaRobot, FaUser } from "react-icons/fa";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickReplies = [
  "Quero agendar um corte",
  "Quais os preços?",
  "Endereço e horário",
  "Falar com humano",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente da Barbearia Binho Cort's. Posso ajudar a agendar, informar preços ou te direcionar ao WhatsApp.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const historyForApi = useMemo(
    () =>
      messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    [messages]
  );

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const nextMessages: Message[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history: historyForApi }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Volte a falar comigo pelo WhatsApp." },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Não consegui responder agora. Fale no WhatsApp (14) 99611-1440." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70]">
      {open && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl border border-brand/60 bg-black/80 backdrop-blur shadow-[0_0_20px_#D4AF37] flex flex-col h-[420px]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand/40">
            <div className="flex items-center gap-2 text-brand">
              <FaRobot /> <span className="font-semibold">Assistente Binho</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fechar chat" className="text-white/70 hover:text-white">
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 p-4 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${m.role === "user" ? "justify-end text-right" : ""}`}
              >
                {m.role === "assistant" && (
                  <span className="mt-1 text-brand">
                    <FaRobot />
                  </span>
                )}
                <div
                  className={`rounded-2xl px-3 py-2 max-w-[75%] ${
                    m.role === "user" ? "bg-brand text-black" : "bg-white/5 text-white border border-brand/30"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <span className="mt-1 text-brand">
                    <FaUser />
                  </span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="px-3 pb-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1 rounded-full border border-brand/40 text-brand hover:bg-brand hover:text-black transition"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded-xl bg-white/5 border border-brand/30 px-3 py-2 text-sm text-white focus:outline-none focus:border-brand"
                placeholder="Escreva aqui..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading}
                className="px-3 py-2 rounded-xl bg-brand text-black font-semibold hover:bg-brand/80 transition disabled:opacity-60"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-brand text-black px-4 py-3 shadow-[0_0_20px_#D4AF37] hover:scale-105 transition"
      >
        <FaComments /> {open ? "Fechar" : "Falar com a IA"}
      </button>
    </div>
  );
}
