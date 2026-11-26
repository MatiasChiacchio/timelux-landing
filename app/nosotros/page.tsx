// Apartado institucional "Nosotros" de Timelux.
// Server Component estático: 1 sola lectura clara sin bloques repetidos.

import type { Metadata } from "next";
import CabeceraSeccion from "@/src/components/layout/CabeceraSeccion";
import About from "@/src/components/sections/About";
import JsonLd from "@/src/components/seo/JsonLd";
import { baseUrl } from "@/src/config/site";
import { crearBreadcrumbSchema, crearGrafo } from "@/src/lib/schema";

// Metadatos SEO propios para /nosotros.
export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé Timelux: selección curada de perfumería árabe y de diseñador 100% original, sellada en origen y con atención personalizada.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    url: "/nosotros",
    title: "Nosotros | Timelux",
    description:
      "Perfumería árabe y de diseñador 100% original con envíos protegidos a toda la Argentina.",
  },
};

// Grafo de migas de pan de /nosotros.
const datosEstructurales = crearGrafo([
  crearBreadcrumbSchema(
    [
      { nombre: "Inicio", url: baseUrl },
      { nombre: "Nosotros", url: `${baseUrl}/nosotros` },
    ],
    `${baseUrl}/nosotros#breadcrumb`,
  ),
]);

// Página dedicada "Nosotros".
export default function PaginaNosotros(): React.JSX.Element {
  return (
    <main className="flex-1 bg-[#fffff4]">
      <CabeceraSeccion
        etiquetaBreadcrumb="Nosotros"
        eyebrow="Nosotros"
        titulo="Perfumería original,"
        tituloCursiva="sin vueltas"
        descripcion="Selección curada de fragancias árabes y de diseñador, selladas en origen y con atención personalizada."
      />

      {/* Historia de marca y pilares */}
      <About mostrarEncabezado={false} />

      {/* Datos estructurados BreadcrumbList */}
      <JsonLd datos={datosEstructurales} />
    </main>
  );
}
