import Navbar from "../components/Navbar";
import Depoimentos from "../components/Depoimentos";
import Footer from "../components/Footer";

export const metadata = {
  title: "Depoimentos — Barbearia Binho Cort's",
  description: "Opiniões de clientes que já passaram pela Barbearia Binho Cort's.",
};

export default function DepoimentosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-950 text-neutral-100">
        <Depoimentos />
      </main>
      <Footer />
    </>
  );
}
