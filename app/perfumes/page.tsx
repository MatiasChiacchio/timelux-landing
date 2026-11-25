// Página del catálogo completo de fragancias Timelux.
// Server Component: obtiene los perfumes y delega la exploración interactiva.

import type { Metadata } from "next";
import CabeceraSeccion from "@/src/components/layout/CabeceraSeccion";
import CatalogoCompleto from "@/src/components/perfumes/CatalogoCompleto";
import JsonLd from "@/src/components/seo/JsonLd";
import { TANDA_CARGA_CATALOGO } from "@/src/config/catalogo";
import { baseUrl } from "@/src/config/site";
import {
  crearBreadcrumbSchema,
  crearGrafo,
  crearItemListSchema,
  crearProductoSchema,
} from "@/src/lib/schema";
import { obtenerPerfumes } from "@/src/services/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Metadatos dedicados para posicionar el catálogo completo.
export const metadata: Metadata = {
  title: "Catálogo Exclusivo",
  description:
    "Explorá el catálogo completo de Timelux: fragancias árabes y de diseñador 100% originales con consulta directa por WhatsApp.",
  alternates: {
    canonical: "/perfumes",
  },
  openGraph: {
    url: "/perfumes",
    title: "Catálogo Exclusivo | Timelux",
    description:
      "Fragancias árabes y de diseñador 100% originales con consulta directa por WhatsApp.",
  },
};

// Catálogo completo con cabecera boutique, búsqueda, filtros y carga progresiva.
export default async function PaginaPerfumes(): Promise<React.JSX.Element> {
  // Catálogo remoto con respaldo estático ante fallos de red.
  const perfumes: Perfume[] = await obtenerPerfumes();

  // Conteos reales para enriquecer la cabecera editorial sin sobrecargar al cliente.
  const totalArabes: number = perfumes.filter(
    (p: Perfume) => p.tipo === "arabe",
  ).length;
  const totalDisenador: number = perfumes.length - totalArabes;
  const totalMarcas: number = new Set(
    perfumes.map((p: Perfume) => p.marca.trim()).filter(Boolean),
  ).size;

  // Solo se declaran los productos de la primera tanda renderizada: el schema
  // debe coincidir con el contenido visible y no inflar el HTML del listado.
  const perfumesEstructurados: Perfume[] = perfumes.slice(
    0,
    TANDA_CARGA_CATALOGO,
  );

  // Grafo de la página: migas, lista del catálogo y un Product con Offer
  // por cada fragancia de la tanda visible.
  const datosEstructurales = crearGrafo([
    crearBreadcrumbSchema(
      [
        { nombre: "Inicio", url: baseUrl },
        { nombre: "Catálogo Exclusivo", url: `${baseUrl}/perfumes` },
      ],
      `${baseUrl}/perfumes#breadcrumb`,
    ),
    crearItemListSchema(perfumesEstructurados),
    ...perfumesEstructurados.map((perfume: Perfume) =>
      crearProductoSchema(perfume),
    ),
  ]);

  return (
    <main className="flex-1 bg-[#fffff4]">
      {/* Cabecera editorial compartida con indicadores del catálogo */}
      <CabeceraSeccion
        etiquetaBreadcrumb="Catálogo Exclusivo"
        eyebrow="Vitrina Timelux"
        titulo="Catálogo Exclusivo"
        descripcion="Explorá nuestra selección de fragancias árabes y de diseñador 100% originales. Tocá cualquier perfume para ver sus notas completas o consultá disponibilidad por WhatsApp."
      >
        <ul className="flex flex-wrap gap-2.5">
          <li className="rounded-xl border border-[#a6caeb]/40 bg-white/90 px-4 py-2.5 shadow-xs">
            <p className="font-serif text-2xl font-semibold leading-none text-[#141416]">
              {perfumes.length}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#1e3a5f]">
              Fragancias
            </p>
          </li>
          <li className="rounded-xl border border-[#a6caeb]/40 bg-white/90 px-4 py-2.5 shadow-xs">
            <p className="font-serif text-2xl font-semibold leading-none text-[#141416]">
              {totalMarcas}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#1e3a5f]">
              Casas
            </p>
          </li>
          <li className="rounded-xl border border-[#a6caeb]/40 bg-white/90 px-4 py-2.5 shadow-xs">
            <p className="font-serif text-2xl font-semibold leading-none text-[#141416]">
              {totalArabes} / {totalDisenador}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#1e3a5f]">
              Árabes · Diseñador
            </p>
          </li>
        </ul>
      </CabeceraSeccion>

      {/* Explorador interactivo del catálogo */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-24 md:pt-10 lg:px-8">
        <CatalogoCompleto perfumesIniciales={perfumes} />
      </section>

      {/* Datos estructurados del catálogo */}
      <JsonLd datos={datosEstructurales} />
    </main>
  );
}
