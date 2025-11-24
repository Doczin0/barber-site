import Navbar from "../components/Navbar";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

export const metadata = {
  title: "Galeria — Barbearia Binho Cort's",
  description: "Veja fotos de cortes e do ambiente da Barbearia Binho Cort's.",
};

export default function GaleriaPage() {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-950 text-neutral-100">
        <Galeria />
      </main>
      <Footer />
    </>
  );
}
