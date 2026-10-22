// Sección institucional de Timelux.
// Server Component: narrativa de marca con composición visual editorial.

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

// Historia de marca en dos columnas: narrativa refinada y fotografía vertical.
export default function About(): React.JSX.Element {
  return (
    <section
      id="nosotros"
      className="scroll-mt-20 bg-[#fffff4] md:scroll-mt-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Columna izquierda: narrativa de marca */}
        <FadeIn className="lg:col-span-7">
          <div>
            <p className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Nosotros · Timelux
            </p>
            <h2 className="mb-6 font-serif text-3xl leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              El arte de encontrar tu firma olfativa
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
              En Timelux concebimos cada fragancia como una extensión de la
              identidad. Seleccionamos cuidadosamente las creaciones más
              aclamadas de la perfumería árabe y las obras de diseñador que
              definieron hitos olfativos.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Desde acordes ambarados y maderas de oud hasta la frescura
              chispeante de los cítricos mediterráneos, te acompañamos a
              descubrir esa estela inconfundible que habla de vos antes de
              pronunciar una palabra.
            </p>

            {/* Pilares de confianza en lista minimalista */}
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {pilares.map((pilar: PilarConfianza, indice: number) => (
                <li key={pilar.titulo}>
                  <p
                    aria-hidden="true"
                    className="font-serif text-sm italic text-[#1e3a5f]"
                  >
                    {String(indice + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-sm font-bold text-neutral-900">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
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
              className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#c40a0a]/40 px-7 py-3 text-sm font-semibold text-[#c40a0a] transition-all duration-300 hover:bg-[#c40a0a] hover:text-[#fffff4] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Solicitar recomendación
            </a>
          </div>
        </FadeIn>

        {/* Columna derecha: composición visual */}
        <FadeIn delay={120} className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl lg:max-w-none">
            <Image
              src={IMAGEN_EDITORIAL}
              alt="Frasco de perfume ámbar bajo luz tenue"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            {/* Gradiente oscuro en la base para dar contraste */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
            />

            {/* Badge flotante con glassmorphism */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-xl border border-white/40 bg-white/80 p-4 shadow-lg backdrop-blur-md">
              <span className="relative flex h-3 w-3 shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c40a0a] opacity-60 motion-reduce:animate-none"
                />
                <span
                  aria-hidden="true"
                  className="relative inline-flex h-3 w-3 rounded-full bg-[#c40a0a]"
                />
              </span>
              <p className="text-sm leading-snug text-neutral-900">
                <strong className="font-bold">
                  Piezas 100% Originales
                </strong>
                <br />
                <span className="text-xs text-neutral-600">
                  Selladas en origen con garantía de autenticidad
                </span>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
