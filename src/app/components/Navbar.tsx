"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const to = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <header
      className="
        relative top-0 left-0 w-full z-50
        bg-[url('/fundo-topo.png')] bg-cover bg-center
        shadow-[0_0_15px_#D4AF37]
      "
      data-aos="fade-down"
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      {/* Linha dourada inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand shadow-[0_0_15px_#D4AF37]"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo + Frase alinhados à esquerda */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300"
          aria-label="Ir para a Home"
        >
          <Image
            src="/logo.png"
            alt="Logo da barbearia"
            width={90}
            height={45}
            className="
              rounded-lg object-cover border border-brand
              shadow-[0_0_6px_#D4AF37]
              transition-transform duration-300
              group-hover:scale-110 group-hover:shadow-[0_0_20px_#D4AF37]
            "
            priority
          />
          <span
            className="
              hidden md:block text-xl font-bold tracking-wide text-white
              transition-all duration-300
              group-hover:text-brand group-hover:shadow-[0_0_20px_#D4AF37]
              group-hover:scale-105
            "
          >
            Barbearia Binho Cort&apos;s
          </span>
        </Link>

        {/* Links alinhados à direita */}
        <nav
          className="flex gap-6 text-base font-medium"
          data-aos="fade-down"
          data-aos-delay="120"
          data-aos-duration="1200"
        >
          {[
            { id: "sobre", label: "Sobre" },
            { id: "servicos", label: "Serviços" },
            { id: "galeria", label: "Galeria" },
            { id: "depoimentos", label: "Depoimentos" },
            { id: "contato", label: "Contato" },
          ].map((link) => (
            <Link
              key={link.id}
              href={to(link.id)}
              className="
                px-2 text-white/80 outline-none
                transition-all duration-300
                hover:text-brand hover:shadow-[0_0_20px_#D4AF37] hover:scale-110
                focus-visible:text-brand focus-visible:shadow-[0_0_20px_#D4AF37] focus-visible:scale-110
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
