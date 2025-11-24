"use client";

import React from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaHome,
  FaBullseye,
  FaEye,
  FaMedal,
  FaCut,
  FaGem,
} from "react-icons/fa";
import { GiRazor } from "react-icons/gi";

export default function SobreHome() {
  return (
    <section
      id="sobre"
      className="
        relative min-h-screen scroll-mt-24
        w-full overflow-hidden
        md:bg-fixed
        -mb-20
      "
    >
      {/* Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/bg-sobre.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Conectores */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-28 md:h-36 bg-gradient-to-t from-transparent to-neutral-950 opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-neutral-950 opacity-90"
      />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-12">
        <div
          className="
            bg-black/40 border border-brand rounded-2xl p-10
            shadow-[0_0_20px_#D4AF37] hover:shadow-[0_0_30px_#D4AF37]
            transition-[box-shadow] duration-300
          "
          data-aos="fade-up"
        >
          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-bold text-brand text-center mb-12">
            Quem Somos?
          </h2>

          {/* Quem Somos Cards */}
          <div className="grid md:grid-cols-3 gap-8 text-center mb-12 items-stretch auto-rows-[1fr]">
            <Card
              icon={<FaCalendarAlt />}
              title="A MELHOR BARBEARIA DE LENÇÓIS PAULISTA E REGIÃO"
              text="Setembro de 2015"
              delay={0}
            />
            <Card
              icon={<FaUser />}
              title="+1 MILHÃO DE CLIENTES ATENDIDOS"
              text="Desde o início"
              delay={100}
            />
            <Card
              icon={<FaHome />}
              title="40 UNIDADES COMERCIALIZADAS"
              text="Comercializadas"
              delay={200}
            />
          </div>

          {/* Nosso Compromisso */}
          <h2 className="text-3xl md:text-4xl font-bold text-brand text-center mb-12">
            Nosso Compromisso
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center mb-12 items-stretch auto-rows-[1fr]">
            <Card
              icon={<FaBullseye />}
              title="Missão"
              text="Atender e prestar serviços de barbearia a todos com o mais alto nível de qualidade e excelência. Transformar vidas com oportunidades de crescimento."
              delay={0}
            />
            <Card
              icon={<FaEye />}
              title="Visão"
              text="Ser a maior e melhor rede de barbearias do Brasil até 2025, referência em beleza masculina."
              delay={100}
            />
            <Card
              icon={<FaMedal />}
              title="Valores"
              text="Respeito. Lealdade. Fidelidade."
              delay={200}
            />
          </div>

          {/* O Que Oferecemos */}
          <h2 className="text-3xl md:text-4xl font-bold text-brand text-center mb-12">
            O Que Oferecemos
          </h2>
          <p className="text-center text-neutral-300 mb-8">
            Confira os serviços disponíveis na Barbearia Binho Cort&apos;s.
          </p>
          <div className="grid md:grid-cols-3 gap-6 items-stretch auto-rows-[1fr]">
            <Card
              icon={<FaCut />}
              title="Corte"
              text="Feito com base na estética e harmonia adequadas para o formato do seu rosto."
              delay={0}
            />
            <Card
              icon={<GiRazor />}
              title="Barba"
              text="Tratamento com navalha e produtos que hidratam os pelos do rosto."
              delay={100}
            />
            <Card
              icon={<FaGem />}
              title="Máquina"
              text="Cortes apenas com a máquina de cabelo, com variação de pentes conforme o estilo."
              delay={200}
            />
          </div>

          {/* Botão */}
          <div className="text-center mt-10">
            <a href="#servicos">
              <button
                className="
                  bg-brand px-6 py-3 rounded-full font-semibold text-black
                  transition-[transform,box-shadow] duration-300
                  hover:scale-105 hover:shadow-[0_0_25px_#D4AF37]
                "
              >
                Ver todos os serviços
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Card: wrapper com AOS e h-full; card interno flex h-full para igualar alturas.
 * Hover: elevação com translate + shadow. Uma única transition-property (sem conflitos).
 */
function Card({
  icon,
  title,
  text,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <div data-aos="zoom-in" data-aos-delay={delay} className="h-full">
      <div
        className="
          group cursor-pointer
          flex h-full flex-col
          rounded-xl border border-brand/60 p-6
          bg-black/70
          shadow-[0_0_10px_#D4AF37]
          transform-gpu will-change-transform
          transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out
          hover:-translate-y-2 hover:shadow-[0_0_25px_#D4AF37]
          hover:bg-brand hover:border-brand hover:text-black
          focus-within:-translate-y-2 focus-within:shadow-[0_0_25px_#D4AF37]
          focus-within:bg-brand focus-within:border-brand focus-within:text-black focus:outline-none
          motion-reduce:transform-none
        "
        tabIndex={0}
      >
        <div
          className="
            text-4xl mb-3 text-brand
            transition-[transform,color] duration-300
            group-hover:text-black group-hover:scale-110
            group-focus:text-black
          "
        >
          {icon}
        </div>

        <h3
          className="
            font-bold text-lg text-brand
            transition-[color] duration-300
            group-hover:text-black group-focus:text-black
          "
        >
          {title}
        </h3>

        <p
          className="
            text-sm text-neutral-300 mt-2
            transition-[color] duration-300
            group-hover:text-black group-focus:text-black
          "
        >
          {text}
        </p>

        <div className="mt-auto" />
      </div>
    </div>
  );
}
