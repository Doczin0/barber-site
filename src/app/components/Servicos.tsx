"use client";

type Item = { nome: string; preco: string; desc?: string; tempo?: string };

type Categoria = {
  titulo: string;
  itens: Item[];
};

// Link único para todos os cards
const linkPadrao =
  "https://topsalao.com/?tel=14996111440&fbclid=PAZXh0bgNhZW0CMTEAAad9o70JqXMDsVEQuULLdkkSN2c0bCcmfBlr4BXvoCBQWCiyOQdnS2oNGE76Mw_aem_7RJKEDIqVpkmx_9Van3sDg";

const categorias: Categoria[] = [
  {
    titulo: "Cortes e Combos",
    itens: [
      { nome: "SOCIAL", preco: "R$ 40,00" },
      { nome: "SOCIAL + BARBA", preco: "R$ 60,00" },
      { nome: "DEGRADÊ", preco: "R$ 40,00" },
      { nome: "DEGRADÊ + SOBRANCELHA", preco: "R$ 40,00" },
      { nome: "DEGRADÊ + BARBA", preco: "R$ 65,00" },
      { nome: "COMPLETO", preco: "R$ 65,00" },
      { nome: "SOCIAL + BARBA + SOBRANCELHA", preco: "R$ 65,00" },
      { nome: "DEGRADÊ + BARBA + SOBRANCELHA", preco: "R$ 65,00" },
    ],
  },
  {
    titulo: "Adicionais",
    itens: [{ nome: "PEZINHO", preco: "R$ 15,00" }],
  },
  {
    titulo: "Serviços Químicos",
    itens: [
      { nome: "RELAXAMENTO", preco: "R$ 25,00" },
      { nome: "LUZES (cabelo pequeno)", preco: "R$ 60,00" },
      { nome: "LUZES (cabelo grande)", preco: "R$ 100,00" },
      { nome: "LUZES + CORTE", preco: "R$ 125,00" },
      { nome: "PLATINADO + CORTE (cabelo pequeno)", preco: "R$ 150,00" },
    ],
  },
  {
    titulo: "Produtos",
    itens: [
      { nome: "Pomadas", preco: "R$ 30,00" },
      { nome: "Gel", preco: "R$ 25,00" },
    ],
  },
];

export default function Servicos() {
  return (
    <section
      id="servicos"
      className="
        relative min-h-screen scroll-mt-24
        w-full overflow-hidden
        md:bg-fixed
        -mb-16
      "
    >
      {/* Fundo com imagem + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/bg-servicos.png')" }}
      />
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
        <h2
          className="text-3xl md:text-4xl font-bold text-brand drop-shadow-[0_0_10px_#D4AF37] mb-12 text-center"
          data-aos="fade-up"
        >
          Serviços e Preços
        </h2>

        {categorias.map((cat, idxCat) => (
          <div
            key={cat.titulo}
            className="mb-10"
            data-aos="fade-up"
            data-aos-delay={idxCat * 80}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-brand mb-5 border-b border-brand pb-2">
              {cat.titulo}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.itens.map((s, idxItem) => (
                <a
                  key={s.nome}
                  href={linkPadrao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus-visible:outline-none"
                  data-aos="zoom-in"
                  data-aos-delay={120 + idxItem * 60}
                >
                  {/* CARD */}
                  <div
                    className="
                      rounded-2xl border border-brand/50 p-5
                      bg-black/70
                      shadow-[0_0_10px_#D4AF37]
                      transform-gpu will-change-transform
                      transition-[transform,colors,box-shadow,border-color] duration-300 ease-out
                      group-hover:bg-brand group-hover:shadow-[0_0_25px_#D4AF37]
                      group-hover:border-brand group-hover:scale-105 group-hover:-translate-y-1
                      group-focus-visible:scale-105 group-focus-visible:-translate-y-1
                      motion-reduce:transform-none
                    "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-medium text-brand transition-colors duration-300 group-hover:text-black">
                        {s.nome}
                      </h4>
                      <span className="text-white font-semibold transition-colors duration-300 group-hover:text-black">
                        {s.preco}
                      </span>
                    </div>

                    {s.desc && (
                      <p className="mt-2 text-sm text-neutral-300 transition-colors duration-300 group-hover:text-black">
                        {s.desc}
                      </p>
                    )}
                    {s.tempo && (
                      <p className="mt-1 text-xs text-neutral-400 transition-colors duration-300 group-hover:text-black">
                        Tempo: {s.tempo}
                      </p>
                    )}
                  </div>
                  {/* /CARD */}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
