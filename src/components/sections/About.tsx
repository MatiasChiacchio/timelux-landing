// Sección institucional de Timelux.
// Server Component: narrativa de marca en paleta oficial Warm Ivory con composición visual editorial.

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { getWhatsAppLink } from "@/src/config/site";

// Pilar de confianza con título y descripción.
interface PilarConfianza {
  titulo: string;
  descripcion: string;
}

// Tres pilares que sostienen la propuesta de Timelux.
const pilares: PilarConfianza[] = [
  {
    titulo: "Curaduría de Autor",
    descripcion: "Fragancias seleccionadas por su longevidad y estela.",
  },
  {
    titulo: "Garantía Total",
    descripcion:
      "Cada unidad se entrega sellada en su empaque original de fábrica.",
  },
  {
    titulo: "Asesoría Cercana",
    descripcion:
      "Recomendaciones personalizadas según notas olfativas y ocasión de uso.",
  },
];

// Fotografía vertical de alta perfumería para la composición visual.
const IMAGEN_EDITORIAL: string =
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80";

// Propiedades opcionales: permite ocultar el encabezado cuando vive bajo CabeceraSeccion.
interface PropiedadesAbout {
  mostrarEncabezado?: boolean;
}

// Historia de marca en dos columnas: narrativa refinada y fotografía vertical.
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
        className={`mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 ${
          mostrarEncabezado ? "py-16 md:py-24" : "py-12 md:py-16"
        }`}
      >
        {/* Columna izquierda: narrativa de marca */}
        <FadeIn className="lg:col-span-7">
          <div>
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
              <h2 className="font-serif text-3xl font-semibold leading-tight text-[#141416] sm:text-4xl">
                Una curaduría pensada para durar
              </h2>
            )}
            <p className="mt-5 text-sm leading-relaxed text-[#5e626e] sm:text-base">
              En Timelux concebimos cada fragancia como una extensión de la
              identidad. Seleccionamos cuidadosamente las creaciones más
              aclamadas de la perfumería árabe y las obras de diseñador que
              definieron hitos olfativos.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5e626e] sm:text-base">
              Desde acordes ambarados y maderas de oud hasta la frescura
              chispeante de los cítricos mediterráneos, te acompañamos a
              descubrir esa estela inconfundible que habla de vos antes de
              pronunciar una palabra.
            </p>

            {/* Pilares de confianza en tarjetas editoriales numeradas */}
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {pilares.map((pilar: PilarConfianza, indice: number) => (
                <li
                  key={pilar.titulo}
                  className="rounded-2xl border border-[#a6caeb]/35 bg-white/90 p-4 shadow-xs transition-colors duration-300 hover:border-[#a6caeb]/70"
                >
                  <p
                    aria-hidden="true"
                    className="font-serif text-2xl font-medium italic leading-none text-[#1e3a5f]"
                  >
                    {String(indice + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-sm font-bold text-[#141416]">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5e626e]">
                    {pilar.descripcion}
                  </p>
                </li>
              ))}
            </ul>

            {/* Recomendación personalizada por WhatsApp */}
            <a
              href={getWhatsAppLink(
                "¡Hola Timelux! Quiero una recomendación personalizada de fragancia.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar una recomendación por WhatsApp"
              className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#c40a0a]/45 bg-white/90 px-7 py-3 text-sm font-semibold text-[#c40a0a] shadow-xs transition-all duration-300 hover:bg-[#c40a0a] hover:text-[#fffff4] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Solicitar recomendación
            </a>
          </div>
        </FadeIn>

        {/* Columna derecha: composición visual con marco desplazado */}
        <FadeIn delay={120} className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 -left-3 inset-x-4 top-4 rounded-3xl border border-[#a6caeb]/55 bg-[#a6caeb]/10 sm:-bottom-4 sm:-left-4"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#a6caeb]/35 bg-white shadow-2xl shadow-[#1e3a5f]/10">
              <Image
                src={IMAGEN_EDITORIAL}
                alt="Frasco de perfume ámbar bajo luz tenue"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Gradiente oscuro sutil en la base para legibilidad del badge */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141416]/45 via-[#141416]/10 to-transparent"
              />

              {/* Badge flotante sobre fotografía */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/92 p-4 shadow-lg backdrop-blur-xs">
                <span
                  aria-hidden="true"
                  className="inline-flex h-3 w-3 shrink-0 rounded-full bg-[#c40a0a] ring-4 ring-[#c40a0a]/15"
                />
                <p className="text-sm leading-snug text-[#141416]">
                  <strong className="font-semibold">
                    Piezas 100% Originales
                  </strong>
                  <br />
                  <span className="text-xs text-[#5e626e]">
                    Selladas en origen con garantía de autenticidad
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
