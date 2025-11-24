"use client";

import CTAButton from "./CTAButton";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative min-h-screen flex items-center bg-cover bg-center
        w-full overflow-hidden -mb-6
        md:bg-fixed
      "
      style={{ backgroundImage: "url('/bg-hero.png')" }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Gradiente para conectar com a próxima seção */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-neutral-950"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Seu corte, sua identidade.
          </h1>
          <p className="mt-4 text-neutral-300">
            Corte e barba com horário marcado, atendimento rápido e caprichado.
          </p>
          <div className="mt-8 flex gap-3">
            <CTAButton />
            <a
              href="#servicos"
              className="px-5 py-3 rounded-xl border border-brand text-white transition-colors duration-300 hover:bg-brand hover:text-black"
            >
              Ver serviços
            </a>
          </div>
          <p className="mt-3 text-xs opacity-70">
            Rua: César Giacomini, 176, Lençóis Paulista, SP, Brasil
          </p>
        </div>

        {/* Imagens */}
        <div className="flex flex-col gap-4 items-center" data-aos="fade-left">
          {/* Barbeiro 1 */}
          <a
            href="https://www.instagram.com/binhocortsbarbearia"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
            className="block w-full"
          >
            <div
              className="relative w-full aspect-[8/5] rounded-2xl overflow-hidden border border-brand
                         shadow-[0_0_15px_#D4AF37] transition-transform duration-300
                         hover:scale-110 hover:shadow-[0_0_40px_#D4AF37]"
            >
              <Image
                src="/barbeiro1.png"
                alt="Barbeiro 1"
                fill
                className="object-cover"
                priority
              />
            </div>
          </a>

          {/* Barbeiro 2 e 3 */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <a
              href="https://www.instagram.com/tavinho_pmartins"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="zoom-in"
              data-aos-delay="100"
              data-aos-duration="1200"
            >
              <div
                className="relative aspect-square rounded-2xl overflow-hidden border border-brand
                           shadow-[0_0_15px_#D4AF37] transition-transform duration-300
                           hover:scale-110 hover:shadow-[0_0_40px_#D4AF37]"
              >
                <Image src="/barbeiro2.png" alt="Barbeiro 2" fill className="object-cover" />
              </div>
            </a>

            <a
              href="https://www.instagram.com/eduardo.goncalves7"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="1200"
            >
              <div
                className="relative aspect-square rounded-2xl overflow-hidden border border-brand
                           shadow-[0_0_15px_#D4AF37] transition-transform duration-300
                           hover:scale-110 hover:shadow-[0_0_40px_#D4AF37]"
              >
                <Image src="/barbeiro3.png" alt="Barbeiro 3" fill className="object-cover" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
