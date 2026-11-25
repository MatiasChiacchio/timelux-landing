// Página principal de Timelux.
// Server Component: compone el Hero editorial y las secciones de la landing Warm Ivory.

import Hero from "@/src/components/sections/Hero";
import MundosOlfativos from "@/src/components/sections/MundosOlfativos";
import Catalog from "@/src/components/sections/Catalog";
import ConserjeriaOlfativa from "@/src/components/sections/ConserjeriaOlfativa";
import About from "@/src/components/sections/About";
import Faq from "@/src/components/sections/Faq";
import Footer from "@/src/components/layout/Footer";
import { obtenerPerfumes } from "@/src/services/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Portada con Hero, mundos olfativos, catálogo destacado, conserjería, nosotros, preguntas y contacto.
export default async function Home(): Promise<React.JSX.Element> {
  // Catálogo remoto con respaldo estático ante fallos de red.
  const perfumes: Perfume[] = await obtenerPerfumes();

  // Conteos calculados en el servidor para enriquecer Hero y MundosOlfativos.
  const totalArabes: number = perfumes.filter(
    (p: Perfume) => p.tipo === "arabe",
  ).length;
  const totalDisenador: number = perfumes.length - totalArabes;
  const totalBestsellers: number = perfumes.filter(
    (p: Perfume) => p.bestseller === true,
  ).length;

  return (
    <main className="bg-[#fffff4]">
      {/* Portada principal en composición Split editorial */}
      <Hero totalPerfumes={perfumes.length} />

      {/* Puertas editoriales a las colecciones del catálogo */}
      <MundosOlfativos
        totalArabes={totalArabes}
        totalDisenador={totalDisenador}
        totalBestsellers={totalBestsellers}
      />

      {/* Selección de destacados con enlace al catálogo completo */}
      <Catalog perfumesIniciales={perfumes} limite={12} mostrarEnlaceCatalogo />

      {/* Conserjería olfativa y gestión de perfumes por encargo */}
      <ConserjeriaOlfativa />

      {/* Historia y propuesta de valor */}
      <About />

      {/* Preguntas frecuentes */}
      <Faq />

      {/* Pie de página con contacto */}
      <Footer />
    </main>
  );
}
