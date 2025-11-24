import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t-0 bg-neutral-950 text-neutral-200">
      {/* Linha dourada com glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-brand shadow-[0_0_20px_#D4AF37]" />

      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Coluna 1 - Institucional */}
        <div>
          <h3 className="text-xl font-bold text-brand mb-4">Institucional</h3>
          <ul className="space-y-2 text-base">
            <li>
              {/* Agora rola para a seção 'Sobre' na Home */}
              <Link
                href="/#sobre"
                className="transition-transform duration-200 hover:scale-105 hover:text-brand hover:shadow-[0_0_10px_#D4AF37]"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/#servicos"
                className="transition-transform duration-200 hover:scale-105 hover:text-brand hover:shadow-[0_0_10px_#D4AF37]"
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                href="/politica"
                className="transition-transform duration-200 hover:scale-105 hover:text-brand hover:shadow-[0_0_10px_#D4AF37]"
              >
                Política de Privacidade
              </Link>
            </li>
            <li className="opacity-80">
              © 2015 – {new Date().getFullYear()}
            </li>
          </ul>
        </div>

        {/* Coluna 2 - Atendimento */}
        <div>
          <h3 className="text-xl font-bold text-brand mb-4">Atendimento</h3>
          <ul className="space-y-2 text-base">
            <li>
              <a
                href="tel:+5514996111440"
                className="transition-transform duration-200 hover:scale-105 hover:text-brand hover:shadow-[0_0_10px_#D4AF37]"
              >
                Telefone: (14) 99611-1440
              </a>
            </li>
            <li>
              <span className="transition-transform duration-200 hover:scale-105 hover:text-brand hover:shadow-[0_0_10px_#D4AF37]">
                Horário: Ter–Sex: 9:30h – Sáb: 9h–17h
              </span>
            </li>
            <li>
              <a
                href="mailto:contato@binhocorts.com"
                className="transition-transform duration-200 hover:scale-105 hover:text-brand hover:shadow-[0_0_10px_#D4AF37]"
              >
                contato@binhocorts.com
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 3 - Redes Sociais */}
        <div>
          <h3 className="text-xl font-bold text-brand mb-4">Redes Sociais</h3>
          <div className="flex justify-center md:justify-start gap-6 text-3xl">
            <a
              href="https://www.instagram.com/binhocortsbarbearia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-brand transition-transform duration-200 hover:scale-110 hover:shadow-[0_0_15px_#D4AF37]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/Barbershopgaleria"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-brand transition-transform duration-200 hover:scale-110 hover:shadow-[0_0_15px_#D4AF37]"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
