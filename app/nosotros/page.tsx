// Apartado institucional "Nosotros" de Timelux.
// Server Component estático con cabecera compartida, narrativa, garantías y conserjería.

import type { Metadata } from "next";
import { PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CabeceraSeccion from "@/src/components/layout/CabeceraSeccion";
import About from "@/src/components/sections/About";
import ConserjeriaOlfativa from "@/src/components/sections/ConserjeriaOlfativa";
import JsonLd from "@/src/components/seo/JsonLd";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { baseUrl } from "@/src/config/site";
import { crearBreadcrumbSchema, crearGrafo } from "@/src/lib/schema";

// Metadatos SEO propios para /nosotros.
export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé la propuesta de Timelux: curaduría exclusiva de perfumería árabe y de diseñador 100% original, garantía de sellado en origen y asesoramiento cercano.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    url: "/nosotros",
    title: "Nosotros | Timelux",
    description:
      "Curaduría exclusiva de perfumería árabe y de diseñador 100% original con envíos a toda la Argentina.",
  },
};

// Paso del proceso de curaduría y garantía Timelux.
interface PasoGarantia {
  numero: string;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
}

const pasosGarantia: PasoGarantia[] = [
  {
    numero: "01",
    titulo: "Selección por estela y fijación",
    descripcion:
      "Evaluamos cada fragancia por su desempeño real en piel, proyección y carácter olfativo antes de sumarla al catálogo.",
    icono: Sparkles,
  },
  {
    numero: "02",
    titulo: "Origen sellado y verificado",
    descripcion:
      "Trabajamos únicamente con piezas 100% originales en su empaque cerrado de fábrica, sin fraccionados ni imitaciones.",
    icono: ShieldCheck,
  },
  {
    numero: "03",
    titulo: "Empaque protegido a todo el país",
    descripcion:
      "Preparamos cada envío con protección reforzada para que tu frasco llegue en óptimas condiciones vía Correo Argentino.",
    icono: PackageCheck,
  },
];

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

// Página dedicada "La Casa Timelux".
export default function PaginaNosotros(): React.JSX.Element {
  return (
    <main className="flex-1 bg-[#fffff4]">
      <CabeceraSeccion
        etiquetaBreadcrumb="Nosotros"
        eyebrow="La Casa Timelux"
        titulo="El arte de encontrar tu"
        tituloCursiva="firma olfativa"
        descripcion="Selección cuidada de perfumería árabe y casas de diseñador, acompañada de asesoramiento personal y garantía total de autenticidad."
      />

      {/* Historia de marca y composición visual */}
      <About mostrarEncabezado={false} />

      {/* Cómo garantizamos cada fragancia */}
      <section
        aria-labelledby="titulo-garantias-timelux"
        className="border-y border-[#a6caeb]/30 bg-white/55 py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
              Compromiso de Calidad
            </p>
            <h2
              id="titulo-garantias-timelux"
              className="mt-2 font-serif text-3xl font-semibold text-[#141416] sm:text-4xl"
            >
              Cómo garantizamos cada fragancia
            </h2>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {pasosGarantia.map((paso: PasoGarantia, indice: number) => (
              <li key={paso.numero} className="h-full">
                <FadeIn delay={indice * 75} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-[#a6caeb]/35 bg-white/90 p-6 shadow-sm">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#a6caeb]/40 bg-[#a6caeb]/15 text-[#1e3a5f]">
                          <paso.icono size={18} aria-hidden="true" />
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-serif text-2xl font-medium italic text-[#1e3a5f]/75"
                        >
                          {paso.numero}
                        </span>
                      </div>

                      <h3 className="mt-5 font-serif text-2xl font-semibold text-[#141416]">
                        {paso.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5e626e]">
                        {paso.descripcion}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bloque de recomendación y encargos */}
      <ConserjeriaOlfativa />

      {/* Datos estructurados BreadcrumbList */}
      <JsonLd datos={datosEstructurales} />
    </main>
  );
}
