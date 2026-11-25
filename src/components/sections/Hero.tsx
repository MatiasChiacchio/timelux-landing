// Portada principal de Timelux en composición editorial Split.
// Server Component: combina narrativa Warm Ivory con escaparate visual de perfumería.

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// Propiedades opcionales: cantidad real de fragancias del catálogo.
interface PropiedadesHero {
  totalPerfumes?: number;
}

// Micro-beneficio con icono minimalista.
interface PuntoConfianza {
  icono: LucideIcon;
  texto: string;
}

// Fila de confianza bajo las acciones principales.
const puntosConfianza: PuntoConfianza[] = [
  { icono: BadgeCheck, texto: "100% originales selladas" },
  { icono: Truck, texto: "Envíos a todo el país" },
  { icono: HeartHandshake, texto: "Asesoría personalizada" },
];

// Hero luminoso Warm Ivory con composición editorial asimétrica y LCP optimizado.
export default function Hero({
  totalPerfumes = 180,
}: PropiedadesHero): React.JSX.Element {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden bg-[#fffff4] md:scroll-mt-24"
    >
      {/* Resplandores de luz suave sobre marfil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(166,202,235,0.34),_transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(166,202,235,0.22),_transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 md:pb-24 md:pt-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Columna izquierda: narrativa, CTAs y sellos de confianza */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Cápsula editorial única */}
            <div
              className="animacion-hero inline-flex items-center gap-2.5 rounded-full border border-[#a6caeb]/60 bg-white/90 px-4 py-1.5 shadow-sm"
              style={{ animationDelay: "0ms" }}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#c40a0a]"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f]">
                Perfumería Árabe &amp; Diseñador
              </span>
            </div>

            {/* Encabezado monumental en tipografía serif editorial */}
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-[#141416] sm:text-6xl lg:text-[4.25rem]">
              Más que una fragancia,{" "}
              <span className="inline-block whitespace-nowrap font-medium italic text-[#1e3a5f]">
                tu esencia
              </span>
            </h1>

            {/* Subtítulo persuasivo */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#5e626e] sm:text-lg lg:mx-0">
              Curaduría exclusiva de{" "}
              <strong className="font-semibold text-[#141416]">
                {totalPerfumes} fragancias
              </strong>{" "}
              árabes y de diseñador 100% originales, seleccionadas por su
              fijación duradera, estela envolvente y carácter único.
            </p>

            {/* Acciones principales */}
            <div
              className="animacion-hero mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row lg:justify-start"
              style={{ animationDelay: "100ms" }}
            >
              <Link
                href="/perfumes"
                aria-label="Explorar el catálogo completo de fragancias"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-7 py-3.5 text-sm font-semibold text-[#fffff4] shadow-md shadow-[#c40a0a]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95 sm:w-auto"
              >
                Explorar catálogo
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href={getWhatsAppLink(
                  "¡Hola Timelux! Quiero conocer sus fragancias disponibles y recibir asesoramiento.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar por WhatsApp"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#a6caeb]/70 bg-white/90 px-7 py-3.5 text-sm font-semibold text-[#141416] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95 sm:w-auto"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Asesoría por WhatsApp
              </a>
            </div>

            {/* Bloque de confianza visible desde el primer render */}
            <ul className="mt-10 grid grid-cols-1 gap-3 border-t border-[#a6caeb]/35 pt-7 sm:grid-cols-3">
              {puntosConfianza.map((punto: PuntoConfianza) => (
                <li
                  key={punto.texto}
                  className="group flex items-center justify-center gap-2.5 rounded-xl border border-[#a6caeb]/35 bg-white/90 px-3.5 py-2.5 shadow-xs transition-colors duration-200 hover:border-[#a6caeb]/70 lg:justify-start"
                >
                  <punto.icono
                    size={17}
                    aria-hidden="true"
                    className="shrink-0 text-[#1e3a5f] transition-colors duration-300 group-hover:text-[#c40a0a]"
                  />
                  <span className="text-xs font-medium text-[#141416]">
                    {punto.texto}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha: vitrina fotográfica de alta perfumería */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            {/* Marco decorativo desplazado */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 -right-3 inset-x-4 top-4 rounded-3xl border border-[#a6caeb]/55 bg-[#a6caeb]/10 sm:-bottom-4 sm:-right-4"
            />

            {/* Contenedor principal de la fotografía editorial */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#a6caeb]/40 bg-white shadow-2xl shadow-[#1e3a5f]/10">
              <Image
                src="/hero-perfumeria.jpg"
                alt="Frascos esculturales de alta perfumería árabe y de diseñador sobre piedra travertino marfil"
                fill
                priority
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 448px, 40vw"
                className="object-cover"
              />
              {/* Velo muy sutil para armonizar con los badges de cristal */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141416]/25 via-transparent to-transparent"
              />

              {/* Badge flotante superior: acordes de firma */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#a6caeb]/45 bg-white/95 px-3.5 py-2 shadow-md">
                <Sparkles
                  size={14}
                  aria-hidden="true"
                  className="shrink-0 text-[#1e3a5f]"
                />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1e3a5f]">
                  Oud · Ámbar · Bergamota
                </span>
              </div>

              {/* Tarjeta flotante inferior: garantía de origen */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/92 px-4 py-3.5 shadow-lg backdrop-blur-xs">
                <div>
                  <p className="font-serif text-lg font-semibold leading-tight text-[#141416]">
                    Curaduría de Alta Gama
                  </p>
                  <p className="mt-0.5 text-xs text-[#5e626e]">
                    Piezas selladas en origen · Atención directa
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-[#a6caeb]/25 px-3 py-1 text-xs font-semibold text-[#1e3a5f]">
                  +{totalPerfumes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
