// Portada principal de Timelux.
// Server Component: contenido estático con anclas y CTA a WhatsApp.

import { ArrowDown, BadgeCheck, HeartHandshake, MessageCircle, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// Micro-beneficio con icono minimalista.
interface PuntoConfianza {
  icono: LucideIcon;
  texto: string;
}

// Fila de confianza bajo las acciones principales.
const puntosConfianza: PuntoConfianza[] = [
  { icono: BadgeCheck, texto: "Fragancias 100% originales" },
  { icono: Truck, texto: "Envíos a todo el país" },
  { icono: HeartHandshake, texto: "Atención personalizada" },
];

// Hero nocturno de alta gama con aura luminosa y contenido editorial.
export default function Hero(): React.JSX.Element {
  return (
    <section id="hero" className="relative scroll-mt-20 overflow-hidden bg-[#fffff4] md:scroll-mt-24">
      {/* Resplandores de luz suave sobre marfil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(166,202,235,0.45),_transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.8),_transparent_60%)]"
      />
      {/* Marca de agua monumental en grafito tenue */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-2 select-none text-center text-[18vw] font-bold leading-none tracking-tight text-[#111827]/[0.03] sm:text-[14vw] lg:text-[10rem]"
      >
        TIMELUX
      </p>

      <div className="relative mx-auto flex min-h-[88vh] w-full max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        {/* Isotipo distintivo */}
        <p
          className="animacion-hero text-xs font-semibold uppercase tracking-[0.5em] text-[#1e3a5f]"
          style={{ animationDelay: "0ms" }}
        >
          Timelux
        </p>

        {/* Badge editorial */}
        <p
          className="animacion-hero mt-4 rounded-full border border-[#a6caeb]/60 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1e3a5f]"
          style={{ animationDelay: "40ms" }}
        >
          Perfumería árabe &amp; diseñador
        </p>

        {/* Encabezado de lujo */}
        <h1 className="mb-6 mt-6 max-w-3xl font-serif text-4xl leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-5xl md:text-6xl lg:text-7xl">
          Más que una fragancia,{" "}
          <span className="block font-normal italic text-[#1e3a5f] sm:inline">
            tu esencia
          </span>
        </h1>

        {/* Subtítulo persuasivo */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4b5563] sm:text-xl">
          Fragancias árabes y de diseñador 100% originales, con fijación
          duradera y notas seleccionadas para cada ocasión.
        </p>

        {/* Acciones principales */}
        <div
          className="animacion-hero mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={{ animationDelay: "160ms" }}
        >
          <a
            href="#catalogo"
            aria-label="Ver el catálogo de fragancias"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-7 py-3.5 text-sm font-semibold text-[#fffff4] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] sm:w-auto"
          >
            <ArrowDown size={18} aria-hidden="true" />
            Ver catálogo
          </a>
          <a
            href={getWhatsAppLink(
              "¡Hola Timelux! Quiero conocer sus fragancias disponibles.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#a6caeb]/60 bg-white/90 px-7 py-3.5 text-sm font-semibold text-[#111827] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] sm:w-auto"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Consultar por WhatsApp
          </a>
        </div>

        {/* Bloque de confianza visible desde el primer render */}
        <ul className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {puntosConfianza.map((punto: PuntoConfianza) => (
            <li
              key={punto.texto}
              className="group rounded-2xl border border-[#a6caeb]/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2.5">
                <punto.icono
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-[#1e3a5f] group-hover:text-[#c40a0a]"
                />
                <span className="text-xs font-medium text-[#1f2937] sm:text-sm">
                  {punto.texto}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
