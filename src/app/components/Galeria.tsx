"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fotos = [
  { src: "/corte 1.png", alt: "Corte 1" },
  { src: "/Corte 2.png", alt: "Corte 2" },
  { src: "/Corte 3.png", alt: "Corte 3" },
  { src: "/Corte 4.png", alt: "Corte 4" },
  { src: "/Corte 5.png", alt: "Corte 5" },
  { src: "/Corte 6.png", alt: "Corte 6" },
];

export default function Galeria() {
  return (
    <section
      id="galeria"
      className="
        relative min-h-[70vh] scroll-mt-24
        w-full
        -mb-16
        overflow-hidden
      "
    >
      {/* Fundo cobrindo 100% da seção */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/galeria.png')" }}
        aria-hidden
      />
      {/* Overlay escura */}
      <div className="absolute inset-0 bg-black/75" aria-hidden />

      {/* Conectores de degradê entre seções */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-28 md:h-36 bg-gradient-to-t from-transparent to-neutral-950/95 opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 md:h-60 bg-gradient-to-b from-transparent to-neutral-950/95 opacity-90"
      />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-12">
        {/* Bloco com fundo translúcido para reforçar a seção */}
        <div
          className="
            bg-black/50 border border-brand rounded-2xl p-8 md:p-10
            shadow-[0_0_20px_#D4AF37] hover:shadow-[0_0_30px_#D4AF37]
            transition-[box-shadow] duration-300
          "
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand text-center drop-shadow-[0_0_10px_#D4AF37] mb-16">
            Galeria de Cortes
          </h2>

          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".galeria-button-next",
                prevEl: ".galeria-button-prev",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {fotos.map((foto, i) => (
                <SwiperSlide key={i}>
                  <div data-aos="zoom-in" data-aos-delay={i * 50}>
                    <div
                      className="
                        group cursor-pointer
                        rounded-2xl border border-brand
                        bg-black/70
                        shadow-[0_0_15px_#D4AF37]
                        transform-gpu will-change-transform
                        transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out
                        hover:-translate-y-2 hover:shadow-[0_0_30px_#D4AF37] hover:border-brand hover:bg-brand/5
                        overflow-hidden
                      "
                      role="presentation"
                    >
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={foto.src}
                          alt={foto.alt}
                          fill
                          className="
                            object-cover
                            transition-[transform,filter] duration-300
                            group-hover:scale-105
                          "
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Botões de navegação customizados */}
            <button
              className="
                galeria-button-prev absolute top-1/2 -left-6 z-10 -translate-y-1/2
                bg-brand text-black p-3 rounded-full
                shadow-[0_0_10px_#D4AF37]
                transition-[transform,box-shadow,background-color] duration-300
                hover:-translate-y-[52%] hover:shadow-[0_0_18px_#D4AF37] hover:bg-brand/80
                focus:outline-none
              "
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </button>
            <button
              className="
                galeria-button-next absolute top-1/2 -right-6 z-10 -translate-y-1/2
                bg-brand text-black p-3 rounded-full
                shadow-[0_0_10px_#D4AF37]
                transition-[transform,box-shadow,background-color] duration-300
                hover:-translate-y-[52%] hover:shadow-[0_0_18px_#D4AF37] hover:bg-brand/80
                focus:outline-none
              "
              aria-label="Próximo"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
