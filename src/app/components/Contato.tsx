import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Contato() {
  return (
    <section
      id="contato"
      className="
        relative scroll-mt-24
        w-full overflow-hidden
        md:bg-fixed
      "
    >
      {/* Fundo e overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/contato.png')" }}
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
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand drop-shadow-[0_0_10px_#D4AF37]">
            Entre em Contato
          </h2>
          <p className="mt-3 text-neutral-300">
            Agende seu horário ou tire suas dúvidas pelo WhatsApp, telefone ou direto no salão.
          </p>
        </div>

        {/* Cards de Contato */}
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <CardContato
            icon={<FaMapMarkerAlt />}
            titulo="Endereço"
            desc="Rua César Giacomini, 176 – Vila Santa Cecília, Lençóis Paulista/SP"
          />
          <CardContato
            icon={<FaPhoneAlt />}
            titulo="Telefone"
            desc="(14) 99611-1440"
          />
          <CardContato
            icon={<FaEnvelope />}
            titulo="E-mail"
            desc="contato@binhocorts.com"
          />
        </div>

        {/* Mapa Google */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-[0_0_20px_#D4AF37] border border-brand/50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.597516432885!2d-48.806976524976086!3d-22.594151926772092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c0b156d56e85db%3A0x4e31a01db4f2965b!2sR.%20C%C3%A9sar%20Giacomini%2C%20176%20-%20Vila%20Santa%20Cecilia%2C%20Len%C3%A7%C3%B3is%20Paulista%20-%20SP%2C%2018683-211!5e0!3m2!1spt-BR!2sbr!4v1759338126951!5m2!1spt-BR!2sbr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* CTA WhatsApp */}
        <div className="text-center mt-10">
          <a
            href="https://wa.me/5514996111440"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              bg-brand px-8 py-4 rounded-full font-semibold text-black text-lg
              hover:bg-brand/80 hover:shadow-[0_0_25px_#D4AF37] transition
            "
          >
            <FaWhatsapp className="text-2xl" />
            Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* Card de Contato Reutilizável */
function CardContato({
  icon,
  titulo,
  desc,
}: {
  icon: React.ReactNode;
  titulo: string;
  desc: string;
}) {
  return (
    <div
      className="
        group h-full flex flex-col justify-between
        bg-black/70 p-6 rounded-xl border border-brand/50
        transition duration-300
        hover:bg-brand hover:shadow-[0_0_25px_#D4AF37] hover:border-brand
      "
    >
      <div className="text-3xl mb-3 text-brand drop-shadow-[0_0_8px_#D4AF37] group-hover:text-black transition">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-brand group-hover:text-black transition">
        {titulo}
      </h3>
      <p className="text-sm mt-2 text-neutral-300 group-hover:text-black transition">
        {desc}
      </p>
    </div>
  );
}
