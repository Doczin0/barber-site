const itens = [
  { title: "Profissional experiente", desc: "Detalhe e técnica em cada corte." },
  { title: "Ambiente top", desc: "Conforto, higiene e boa conversa." },
  { title: "Horário pontual", desc: "Sem enrolação, respeito ao seu tempo." },
];

export default function Features() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Por que escolher a gente?</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {itens.map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/10 p-5">
            <h3 className="font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-neutral-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
