import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SobreHome from "./components/SobreHome";
import Servicos from "./components/Servicos";
import Galeria from "./components/Galeria";
import Depoimentos from "./components/Depoimentos";
import Contato from "./components/Contato";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-950 text-neutral-100">
        <Hero />

        <div className="space-y-6">
          <SobreHome />
          <Servicos />
          <Galeria />
          <Depoimentos />
          <Contato />
        </div>
      </main>
      <Footer />
    </>
  );
}
