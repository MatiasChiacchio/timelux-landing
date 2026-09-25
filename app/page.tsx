// Página principal de Timelux.
// Server Component: compone el Hero estático y las secciones de la landing.

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
      {/* Hero actual con ancla para la navegación */}
      <section id="hero" className="min-h-screen bg-[#0d0d11] text-white">
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <span className="mb-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
            Próximamente
          </span>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            TIMELUX
          </h1>
          <p className="mt-3 max-w-md text-sm text-neutral-400">
            Perfumería árabe y fragancias de diseñador. Alta fijación y
            elegancia atemporal.
          </p>
        </div>
      </section>

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
