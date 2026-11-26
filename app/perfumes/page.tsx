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

// Catálogo completo con cabecera compacta, búsqueda, filtros y carga progresiva.
export default async function PaginaPerfumes(): Promise<React.JSX.Element> {
  // Catálogo remoto con respaldo estático ante fallos de red.
  const perfumes: Perfume[] = await obtenerPerfumes();

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

  const descripcionCabecera: string = `${perfumes.length} ${
    perfumes.length === 1 ? "fragancia original" : "fragancias originales"
  } de ${totalMarcas} ${
    totalMarcas === 1 ? "casa" : "casas"
  }. Tocá cualquier perfume para ver sus notas.`;

  return (
    <main className="flex-1 bg-[#fffff4]">
      <CabeceraSeccion
        etiquetaBreadcrumb="Catálogo"
        eyebrow="Catálogo"
        titulo="Fragancias disponibles"
        descripcion={descripcionCabecera}
      />

      {/* Explorador interactivo del catálogo */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 md:pb-24 md:pt-8 lg:px-8">
        <CatalogoCompleto perfumesIniciales={perfumes} />
      </section>

      {/* Datos estructurados del catálogo */}
      <JsonLd datos={datosEstructurales} />
    </main>
  );
}
