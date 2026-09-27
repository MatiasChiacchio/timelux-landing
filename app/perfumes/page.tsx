// Página del catálogo completo de fragancias Timelux.
// Server Component: obtiene los perfumes y delega la exploración interactiva.

import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/src/components/layout/Footer";
import CatalogoCompleto from "@/src/components/perfumes/CatalogoCompleto";
import { obtenerPerfumes } from "@/src/services/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Metadatos dedicados para posicionar el catálogo completo.
export const metadata: Metadata = {
  title: "Catálogo Exclusivo",
  description:
    "Explorá el catálogo completo de Timelux: fragancias árabes y de diseñador 100% originales con consulta directa por WhatsApp.",
};

// Catálogo completo con búsqueda, filtros por género y marca, y carga progresiva.
export default async function PaginaPerfumes(): Promise<React.JSX.Element> {
  // Catálogo remoto con respaldo estático ante fallos de red.
  const perfumes: Perfume[] = await obtenerPerfumes();

  return (
    <main className="bg-[#fffff4]">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pt-14 lg:px-8">
        {/* Retorno a la portada */}
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#5e626e] transition-colors hover:text-[#c40a0a]"
        >
          <span aria-hidden="true">&larr;</span>
          Volver al inicio
        </Link>

        {/* Encabezado editorial */}
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#a6caeb]">
          Catálogo Timelux
        </p>
        <h1 className="mt-2 font-serif text-4xl text-[#141416] sm:text-5xl">
          Catálogo Exclusivo
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[#5e626e] sm:text-base">
          {perfumes.length}{" "}
          {perfumes.length === 1 ? "fragancia" : "fragancias"} árabes y de
          diseñador cuidadosamente seleccionadas.
        </p>

        {/* Explorador interactivo del catálogo */}
        <div className="mt-8">
          <CatalogoCompleto perfumesIniciales={perfumes} />
        </div>
      </section>

      {/* Pie de página con contacto */}
      <Footer />
    </main>
  );
}
