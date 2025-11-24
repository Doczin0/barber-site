import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Política de Privacidade — Barbearia Binho Cort's",
  description: "Entenda como a Barbearia Binho Cort's trata e protege seus dados pessoais.",
};

const sections = [
  {
    title: "Informações Coletadas",
    body:
      "Coletamos dados fornecidos voluntariamente (nome, telefone e informações de agendamento) e dados técnicos (cookies e analytics) para melhorar sua experiência.",
  },
  {
    title: "Uso dos Dados",
    body:
      "Usamos os dados para agendar serviços, enviar confirmações, oferecer suporte e aprimorar o site. Não vendemos suas informações.",
  },
  {
    title: "Compartilhamento",
    body:
      "Compartilhamos dados apenas quando necessário com plataformas de agendamento, hospedagem e analytics, sempre respeitando a LGPD.",
  },
  {
    title: "Cookies",
    body:
      "Utilizamos cookies para estatísticas e personalização. Você pode desativá-los nas configurações do navegador, mas algumas funções podem ser afetadas.",
  },
  {
    title: "Segurança",
    body:
      "Adotamos medidas técnicas e administrativas para proteger seus dados. Ainda assim, nenhum método é 100% infalível, então use senhas fortes e mantenha seus dispositivos seguros.",
  },
  {
    title: "Direitos do Usuário",
    body:
      "Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).",
  },
  {
    title: "Atualizações",
    body:
      "Podemos atualizar esta política para refletir melhorias e novas leis. A versão mais recente estará sempre disponível nesta página.",
  },
];

export default function Politica() {
  return (
    <>
      <Navbar />

      <main className="bg-neutral-950 text-neutral-100">
        {/* Hero */}
        <section
          className="
            relative overflow-hidden
            w-full
          "
        >
          <div
            className="absolute inset-0 bg-cover bg-center md:bg-fixed"
            style={{ backgroundImage: "url('/bg-servicos.png')" }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/80" aria-hidden />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-neutral-950/95" />

          <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
            <p className="text-xs tracking-[0.3em] text-brand/80 uppercase mb-4" data-aos="fade-up">
              Transparência
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-brand drop-shadow-[0_0_14px_#D4AF37]"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              Política de Privacidade
            </h1>
            <p className="mt-4 text-neutral-200 text-lg" data-aos="fade-up" data-aos-delay="100">
              Como protegemos e usamos suas informações na Barbearia Binho Cort&apos;s.
            </p>
          </div>
        </section>

        {/* Conteúdo */}
        <section
          className="
            relative w-full overflow-hidden
            pb-20 pt-10
          "
        >
          <div
            className="absolute inset-0 bg-cover bg-center md:bg-fixed"
            style={{ backgroundImage: "url('/bg-sobre.png')" }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-neutral-950/90 to-black/85" aria-hidden />

          <div className="relative z-10 mx-auto max-w-5xl px-6 space-y-8">
            {sections.map((item, idx) => (
              <div
                key={item.title}
                className="
                  bg-black/55 border border-brand/40 rounded-2xl
                  shadow-[0_0_18px_#D4AF37] hover:shadow-[0_0_26px_#D4AF37]
                  transition-[transform,box-shadow,border-color,background-color] duration-300
                  p-6 md:p-8
                "
                data-aos="fade-up"
                data-aos-delay={idx * 60}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[2px] w-8 bg-brand shadow-[0_0_10px_#D4AF37]" />
                  <p className="text-sm uppercase tracking-wide text-brand/80">Seção {idx + 1}</p>
                </div>
                <h2 className="text-2xl font-semibold text-brand drop-shadow-[0_0_10px_#D4AF37]">
                  {item.title}
                </h2>
                <p className="mt-3 text-neutral-200 leading-relaxed">{item.body}</p>
              </div>
            ))}

            <div
              className="
                mt-10 flex flex-col md:flex-row items-center justify-between gap-4
                bg-black/60 border border-brand/50 rounded-2xl p-6 md:p-8
                shadow-[0_0_20px_#D4AF37]
              "
              data-aos="fade-up"
              data-aos-delay={sections.length * 60}
            >
              <div className="text-center md:text-left">
                <p className="text-brand font-semibold text-lg">Fale com a gente</p>
                <p className="text-neutral-200 mt-1">
                  Precisa exercer seus direitos de dados ou tirar dúvidas? Estamos à disposição.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                <a
                  href="https://wa.me/5514996111440"
                  className="bg-brand text-black px-5 py-3 rounded-xl font-semibold hover:bg-brand/85 transition shadow-[0_0_18px_#D4AF37]"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:contato@binhocorts.com"
                  className="px-5 py-3 rounded-xl border border-brand text-brand font-semibold hover:bg-brand hover:text-black transition shadow-[0_0_12px_#D4AF37]"
                >
                  contato@binhocorts.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
