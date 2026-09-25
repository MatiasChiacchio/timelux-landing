// Página principal de Timelux.
// Server Component: compone el Hero estático y las secciones de la landing.

import Hero from "@/src/components/sections/Hero";
import Catalog from "@/src/components/sections/Catalog";
import About from "@/src/components/sections/About";
import Faq from "@/src/components/sections/Faq";
import Footer from "@/src/components/layout/Footer";
import { obtenerPerfumes } from "@/src/services/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Portada con Hero, catálogo, nosotros, preguntas y contacto.
export default async function Home(): Promise<React.JSX.Element> {
  // Catálogo remoto con respaldo estático ante fallos de red.
  const perfumes: Perfume[] = await obtenerPerfumes();

  return (
    <main className="bg-[#fffff4]">
      {/* Portada principal con ancla para la navegación */}
      <Hero />

      {/* Catálogo interactivo debajo del Hero */}
      <Catalog perfumesIniciales={perfumes} />

      {/* Historia y propuesta de valor */}
      <About />

      {/* Preguntas frecuentes */}
      <Faq />

      {/* Pie de página con contacto */}
      <Footer />
    </main>
  );
}
