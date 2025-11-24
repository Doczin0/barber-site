"use client";

import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Depo = {
  nome: string;
  texto: string;
  estrelas: number;
  avatar?: string;
};

const depoimentos: Depo[] = [
  {
    nome: "Carlos S.",
    texto: "Atendimento excelente! Corte perfeito e pontualidade incrível.",
    estrelas: 5,
    avatar:
      "https://ui-avatars.com/api/?name=Carlos+S.&background=333&color=fff&format=png",
  },
  {
    nome: "William H.",
    texto: "Ambiente super agradável e profissional muito atencioso.",
    estrelas: 4,
    avatar:
      "https://ui-avatars.com/api/?name=William+H.&background=333&color=fff&format=png",
  },
  {
    nome: "João F.",
    texto: "Minha barbearia preferida! Sempre saio satisfeito.",
    estrelas: 5,
    avatar:
      "https://ui-avatars.com/api/?name=Joao+F.&background=333&color=fff&format=png",
  },
  {
    nome: "André L.",
    texto: "Equipe muito profissional e dedicada. Recomendo para todos!",
    estrelas: 5,
    avatar:
      "https://ui-avatars.com/api/?name=Andre+L.&background=333&color=fff&format=png",
  },
  {
    nome: "Felipe G.",
    texto: "Gostei muito do atendimento e da atenção aos detalhes.",
    estrelas: 4,
    avatar:
      "https://ui-avatars.com/api/?name=Felipe+G.&background=333&color=fff&format=png",
  },
  {
    nome: "Rafael M.",
    texto: "Serviço impecável, ambiente aconchegante e preço justo!",
    estrelas: 5,
    avatar:
      "https://ui-avatars.com/api/?name=Rafael+M.&background=333&color=fff&format=png",
  },
];

export default function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="
        relative scroll-mt-24
        w-full overflow-hidden
        md:bg-fixed
      "
    >
      {/* Fundo e overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/depoimentos.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/75" aria-hidden />
      {/* Conectores */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-neutral-950/95 opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-neutral-950/95 opacity-90"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand text-center drop-shadow-[0_0_10px_#D4AF37] mb-10">
          O que nossos clientes dizem
        </h2>

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {depoimentos.map((d, i) => (
              <SwiperSlide key={i}>
                <div className="relative rounded-2xl border border-brand/50 p-6 bg-black/70 shadow-[0_0_15px_#D4AF37] hover:shadow-[0_0_25px_#D4AF37] transition h-full">
                  {/* Ícone de aspas */}
                  <FaQuoteLeft className="absolute top-4 left-4 text-brand/50 text-2xl" />

                  {/* Texto */}
                  <p className="text-neutral-200 italic mt-6">&quot;{d.texto}&quot;</p>

                  {/* Estrelas */}
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: d.estrelas }).map((_, idx) => (
                      <FaStar
                        key={idx}
                        className="text-brand drop-shadow-[0_0_6px_#D4AF37]"
                      />
                    ))}
                  </div>

                  {/* Cliente */}
                  <div className="flex items-center gap-3 mt-6">
                    {d.avatar && (
                      <Image
                        src={d.avatar}
                        alt={d.nome}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border border-brand/50"
                      />
                    )}
                    <p className="font-semibold text-brand">{d.nome}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botões de navegação customizados */}
          <button
            className="swiper-button-prev absolute top-1/2 -left-6 z-10 transform -translate-y-1/2 bg-brand text-black p-3 rounded-full shadow-[0_0_10px_#D4AF37] hover:bg-brand/80 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            className="swiper-button-next absolute top-1/2 -right-6 z-10 transform -translate-y-1/2 bg-brand text-black p-3 rounded-full shadow-[0_0_10px_#D4AF37] hover:bg-brand/80 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
