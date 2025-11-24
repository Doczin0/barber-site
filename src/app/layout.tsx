import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AOSProvider from "./providers/AOSProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbearia do Binho — Sua melhor versão",
  description: "Cortes, barba e atendimento de primeira na sua cidade.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased overflow-x-hidden`}>
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
