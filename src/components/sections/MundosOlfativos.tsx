// Sección puente de colecciones olfativas entre el Hero y el catálogo destacado.
// Server Component: organiza el universo de Timelux y enlaza con filtros directos.

import Link from "next/link";
import { ArrowUpRight, Crown, Flame, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/src/components/ui/FadeIn";

// Propiedades con conteos reales calculados en el servidor.
interface PropiedadesMundosOlfativos {
  totalArabes: number;
  totalDisenador: number;
  totalBestsellers: number;
}

// Descriptor editorial de cada universo olfativo.
interface MundoOlfativo {
  numero: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  etiquetaCantidad: string;
  href: string;
  icono: LucideIcon;
}

// Tres puertas editoriales hacia el catálogo completo prefiltrado.
export default function MundosOlfativos({
  totalArabes,
  totalDisenador,
  totalBestsellers,
}: PropiedadesMundosOlfativos): React.JSX.Element {
  const mundos: MundoOlfativo[] = [
    {
      numero: "01",
      titulo: "Perfumería Árabe",
      subtitulo: "Opulencia & Fijación",
      descripcion:
        "Acordes envolventes de oud, ámbar, especias cálidas y vainilla con estela inolvidable.",
      etiquetaCantidad: `${totalArabes} fragancias`,
      href: "/perfumes?tipo=arabe",
      icono: Flame,
    },
    {
      numero: "02",
      titulo: "Casas de Diseñador",
      subtitulo: "Íconos Atemporales",
      descripcion:
        "Creaciones clásicas y contemporáneas de alta perfumería internacional para cada ocasión.",
      etiquetaCantidad: `${totalDisenador} fragancias`,
      href: "/perfumes?tipo=disenador",
      icono: Sparkles,
    },
    {
      numero: "03",
      titulo: "Los Más Elegidos",
      subtitulo: "Selección Bestseller",
      descripcion:
        "Las firmas olfativas favoritas de nuestra comunidad por su proyección y versatilidad.",
      etiquetaCantidad:
        totalBestsellers > 0
          ? `${totalBestsellers} destacados`
          : "Selección curada",
      href: "/perfumes?orden=destacados",
      icono: Crown,
    },
  ];

  return (
    <section
      aria-labelledby="titulo-mundos-olfativos"
      className="border-y border-[#a6caeb]/30 bg-white/55"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
              Universo Olfativo
            </p>
            <h2
              id="titulo-mundos-olfativos"
              className="mt-2 font-serif text-3xl font-semibold text-[#141416] sm:text-4xl"
            >
              Explorá según tu estilo
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#5e626e]">
            Elegí tu punto de partida y filtrá al instante todo nuestro catálogo
            disponible.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {mundos.map((mundo: MundoOlfativo, indice: number) => (
            <li key={mundo.titulo} className="h-full">
              <FadeIn delay={indice * 80} className="h-full">
                <Link
                  href={mundo.href}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[#a6caeb]/35 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c40a0a]/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#a6caeb]/40 bg-[#a6caeb]/15 text-[#1e3a5f] transition-colors duration-300 group-hover:border-[#c40a0a]/30 group-hover:bg-[#c40a0a]/10 group-hover:text-[#c40a0a]">
                        <mundo.icono size={18} aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-serif text-2xl font-medium italic text-[#1e3a5f]/70"
                      >
                        {mundo.numero}
                      </span>
                    </div>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1e3a5f]">
                      {mundo.subtitulo}
                    </p>
                    <h3 className="mt-1.5 font-serif text-2xl font-semibold text-[#141416] transition-colors duration-300 group-hover:text-[#c40a0a]">
                      {mundo.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e626e]">
                      {mundo.descripcion}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#a6caeb]/25 pt-4">
                    <span className="rounded-full bg-[#a6caeb]/20 px-3 py-1 text-xs font-semibold text-[#141416]">
                      {mundo.etiquetaCantidad}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] transition-colors duration-300 group-hover:text-[#c40a0a]">
                      Descubrir
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
