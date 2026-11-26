// Sección institucional de Timelux.
// Server Component: narrativa clara, 3 pilares sobrios y fotografía limpia sin stickers.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// Pilar de confianza con título y descripción.
interface PilarConfianza {
  titulo: string;
  descripcion: string;
}

// Tres pilares que sostienen la propuesta de Timelux.
const pilares: PilarConfianza[] = [
  {
    titulo: "Curaduría de autor",
    descripcion: "Fragancias seleccionadas por su fijación y estela.",
  },
  {
    titulo: "100% originales",
    descripcion: "Cada unidad se entrega sellada en su empaque de fábrica.",
  },
  {
    titulo: "Asesoría directa",
    descripcion: "Te ayudamos a elegir según notas y ocasión de uso.",
  },
];

// Fotografía vertical de alta perfumería para la composición visual.
const IMAGEN_EDITORIAL: string =
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80";

// Propiedades opcionales: permite ocultar el encabezado cuando vive bajo CabeceraSeccion.
interface PropiedadesAbout {
  mostrarEncabezado?: boolean;
}

// Historia de marca en dos columnas limpias: narrativa concisa y fotografía editorial.
export default function About({
  mostrarEncabezado = true,
}: PropiedadesAbout): React.JSX.Element {
  return (
    <section
      id="nosotros"
      className={`scroll-mt-20 md:scroll-mt-24 ${
        mostrarEncabezado
          ? "border-t border-[#a6caeb]/30 bg-white/45"
          : "bg-[#fffff4]"
      }`}
    >
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 ${
          mostrarEncabezado ? "py-16 md:py-24" : "py-10 md:py-16"
        }`}
      >
        {/* Columna izquierda: narrativa de marca */}
        <div className="lg:col-span-7">
          {mostrarEncabezado ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
                Nosotros · Timelux
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#141416] sm:text-4xl lg:text-5xl">
                El arte de encontrar tu{" "}
                <span className="italic text-[#1e3a5f]">firma olfativa</span>
              </h2>
            </>
          ) : (
            <h2 className="font-serif text-2xl font-semibold leading-tight text-[#141416] sm:text-3xl">
              Una curaduría pensada para durar
            </h2>
          )}

          <p className="mt-4 text-sm leading-relaxed text-[#5e626e] sm:text-base">
            En Timelux seleccionamos las creaciones más destacadas de la
            perfumería árabe y de diseñador, eligiendo cada referencia por su
            fijación real en piel y su carácter olfativo.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#5e626e] sm:text-base">
            Desde maderas de oud y notas ambaradas hasta acordes cítricos y
            frescos, te acompañamos por WhatsApp para que encuentres una
            fragancia que hable de vos y llegue protegida a cualquier punto del
            país.
          </p>

          {/* Pilares de confianza en columnas limpias */}
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {pilares.map((pilar: PilarConfianza) => (
              <li
                key={pilar.titulo}
                className="border-t border-[#a6caeb]/40 pt-3"
              >
                <h3 className="text-sm font-bold text-[#141416]">
                  {pilar.titulo}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#5e626e]">
                  {pilar.descripcion}
                </p>
              </li>
            ))}
          </ul>

          {/* Acciones claras: catálogo y WhatsApp */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/perfumes"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-7 py-3 text-sm font-semibold text-[#fffff4] shadow-sm transition-colors duration-200 hover:bg-[#a30808] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
            >
              Explorar catálogo
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <a
              href={getWhatsAppLink(
                "¡Hola Timelux! Quiero asesoramiento para elegir una fragancia.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar por WhatsApp"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#a6caeb]/65 bg-white px-6 py-2.5 text-sm font-semibold text-[#1e3a5f] transition-colors duration-200 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {/* Columna derecha: fotografía editorial limpia */}
        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#a6caeb]/35 bg-white shadow-lg">
            <Image
              src={IMAGEN_EDITORIAL}
              alt="Frasco de perfume ámbar bajo luz natural"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
