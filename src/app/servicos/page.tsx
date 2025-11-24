import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Servicos from "../components/Servicos";

export const metadata = {
  title: "Serviços — Barbearia Binho Cort's",
  description: "Confira os serviços, preços e combos da Barbearia Binho Cort's.",
};

export default function ServicosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-950 text-neutral-100">
        <Servicos />
      </main>
      <Footer />
    </>
  );
}
