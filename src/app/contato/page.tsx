import Navbar from "../components/Navbar";
import Contato from "../components/Contato";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contato — Barbearia Binho Cort's",
  description: "Agende um horário ou tire dúvidas com a Barbearia Binho Cort's.",
};

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-950 text-neutral-100">
        <Contato />
      </main>
      <Footer />
    </>
  );
}
