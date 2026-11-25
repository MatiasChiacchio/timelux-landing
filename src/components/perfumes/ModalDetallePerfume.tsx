'use client';

// Modal de Vista Rápida y Ficha Olfativa de un perfume.
// Client Component accesible con cierre por Escape, bloqueo de scroll y retorno de foco.

import { useEffect, useRef } from "react";
import {
  BadgeCheck,
  Droplets,
  MessageCircle,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import ImagenPerfume from "@/src/components/ui/ImagenPerfume";
import { getWhatsAppLink } from "@/src/config/site";
import {
  enlaceWhatsAppPerfume,
  etiquetaGenero,
  etiquetaTipo,
  formatearPrecio,
} from "@/src/lib/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Propiedades: perfume activo (o null cuando está cerrado) y callback de cierre.
interface PropiedadesModalDetallePerfume {
  perfume: Perfume | null;
  alCerrar: () => void;
}

// Sección individual de notas dentro de la pirámide olfativa.
interface NivelPiramide {
  etiqueta: string;
  notas: string[];
}

// Modal editorial Warm Ivory con fotografía ampliada, pirámide olfativa y conversión directa.
export default function ModalDetallePerfume({
  perfume,
  alCerrar,
}: PropiedadesModalDetallePerfume): React.JSX.Element | null {
  const botonCerrarRef = useRef<HTMLButtonElement>(null);

  // Gestiona cierre con Escape, bloqueo de scroll y restauración de foco.
  useEffect(() => {
    if (!perfume) {
      return;
    }

    const elementoPrevio: HTMLElement | null =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const overflowPrevio: string = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botonCerrarRef.current?.focus();

    function manejarTecla(evento: KeyboardEvent): void {
      if (evento.key === "Escape") {
        alCerrar();
      }
    }

    document.addEventListener("keydown", manejarTecla);

    return (): void => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener("keydown", manejarTecla);
      elementoPrevio?.focus();
    };
  }, [perfume, alCerrar]);

  if (!perfume) {
    return null;
  }

  const tienePiramideCompleta: boolean =
    perfume.notas.corazon.length > 0 || perfume.notas.fondo.length > 0;

  const nivelesPiramide: NivelPiramide[] = [
    { etiqueta: "Notas de salida", notas: perfume.notas.salida },
    { etiqueta: "Notas de corazón", notas: perfume.notas.corazon },
    { etiqueta: "Notas de fondo", notas: perfume.notas.fondo },
  ].filter((nivel: NivelPiramide) => nivel.notas.length > 0);

  const notasUnificadas: string[] = Array.from(
    new Set([
      ...perfume.notas.salida,
      ...perfume.notas.corazon,
      ...perfume.notas.fondo,
    ]),
  );

  const enlaceSimilares: string = getWhatsAppLink(
    `¡Hola Timelux! Estuve viendo ${perfume.nombre} de ${perfume.marca} y quiero asesoramiento sobre esta fragancia u otras con notas similares.`,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-perfume-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Fondo translúcido para cerrar al tocar fuera */}
      <div
        aria-hidden="true"
        onClick={alCerrar}
        className="fixed inset-0 bg-[#141416]/45 backdrop-blur-sm transition-opacity"
      />

      {/* Panel principal Warm Ivory */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#a6caeb]/45 bg-[#fffff4] shadow-2xl">
        {/* Botón de cierre accesible 44×44 */}
        <button
          ref={botonCerrarRef}
          type="button"
          onClick={alCerrar}
          aria-label="Cerrar ficha olfativa"
          className="absolute right-4 top-4 z-20 inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-[#a6caeb]/45 bg-white/95 text-[#141416] shadow-sm transition-colors duration-200 hover:border-[#c40a0a]/40 hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 gap-6 p-5 sm:p-8 md:grid-cols-12 md:gap-8">
          {/* Columna izquierda: fotografía de estudio */}
          <div className="md:col-span-5">
            <div className="relative">
              <ImagenPerfume
                src={perfume.imagenUrl}
                alt={`Frasco de ${perfume.nombre} de ${perfume.marca}`}
                sizes="(max-width: 767px) 85vw, 320px"
                prioridad
              />
              {perfume.bestseller === true ? (
                <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#c40a0a]/20 bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#c40a0a] shadow-sm backdrop-blur-sm">
                  <Sparkles size={12} aria-hidden="true" />
                  Bestseller
                </span>
              ) : null}
            </div>

            {/* Garantías breves bajo la imagen */}
            <ul className="mt-4 space-y-2 rounded-2xl border border-[#a6caeb]/30 bg-white/80 p-3.5 text-xs text-[#5e626e]">
              <li className="flex items-center gap-2">
                <BadgeCheck
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-[#1e3a5f]"
                />
                <span>100% original, sellado en origen</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-[#1e3a5f]"
                />
                <span>Envíos protegidos a toda la Argentina</span>
              </li>
            </ul>
          </div>

          {/* Columna derecha: datos editoriales, pirámide y CTA */}
          <div className="flex flex-col justify-between md:col-span-7">
            <div>
              <p className="pr-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f]">
                {perfume.marca || "Timelux"}
              </p>

              <h2
                id="modal-perfume-titulo"
                className="mt-1.5 pr-8 font-serif text-3xl font-semibold leading-tight text-[#141416] sm:text-4xl"
              >
                {perfume.nombre}
              </h2>

              {/* Metadatos limpios */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#a6caeb]/25 px-3 py-1 text-xs font-semibold text-[#141416]">
                  {etiquetaTipo(perfume.tipo)}
                </span>
                <span className="rounded-full bg-[#a6caeb]/25 px-3 py-1 text-xs font-semibold text-[#141416]">
                  {etiquetaGenero(perfume.genero)}
                </span>
                <span className="rounded-full border border-[#a6caeb]/40 bg-white px-3 py-1 text-xs font-medium text-[#5e626e]">
                  {perfume.mililitros} ml
                </span>
              </div>

              {/* Precio destacado */}
              <div className="mt-5 flex items-baseline gap-3 border-y border-[#a6caeb]/30 py-3.5">
                <p className="text-3xl font-bold tracking-tight text-[#141416]">
                  {formatearPrecio(perfume.precio)}
                </p>
                <span className="text-xs text-[#5e626e]">
                  Pesos argentinos · Consultá promos en USDT o transferencia
                </span>
              </div>

              {/* Descripción completa */}
              {perfume.descripcionCorta ? (
                <p className="mt-4 text-sm leading-relaxed text-[#5e626e]">
                  {perfume.descripcionCorta}
                </p>
              ) : null}

              {/* Pirámide olfativa o listado completo de acordes */}
              {notasUnificadas.length > 0 ? (
                <div className="mt-5 rounded-2xl border border-[#a6caeb]/35 bg-white/85 p-4">
                  <div className="flex items-center gap-2">
                    <Droplets
                      size={15}
                      aria-hidden="true"
                      className="text-[#1e3a5f]"
                    />
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1e3a5f]">
                      {tienePiramideCompleta
                        ? "Pirámide Olfativa"
                        : "Acordes y Notas Olfativas"}
                    </h3>
                  </div>

                  {tienePiramideCompleta ? (
                    <div className="mt-3 space-y-3">
                      {nivelesPiramide.map((nivel: NivelPiramide) => (
                        <div key={nivel.etiqueta}>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5e626e]">
                            {nivel.etiqueta}
                          </p>
                          <ul className="mt-1.5 flex flex-wrap gap-1.5">
                            {nivel.notas.map((nota: string) => (
                              <li
                                key={nota}
                                className="rounded-md border border-[#a6caeb]/35 bg-[#a6caeb]/15 px-2.5 py-1 text-xs font-medium capitalize text-[#141416]"
                              >
                                {nota}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {notasUnificadas.map((nota: string) => (
                        <li
                          key={nota}
                          className="rounded-md border border-[#a6caeb]/35 bg-[#a6caeb]/15 px-2.5 py-1 text-xs font-medium capitalize text-[#141416]"
                        >
                          {nota}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>

            {/* Acciones de conversión por WhatsApp */}
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={enlaceWhatsAppPerfume(perfume)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-6 py-3 text-sm font-semibold text-[#fffff4] shadow-md transition-all duration-300 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Consultar disponibilidad por WhatsApp
              </a>
              <a
                href={enlaceSimilares}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#a6caeb]/60 bg-white/90 px-5 py-2.5 text-xs font-semibold text-[#1e3a5f] transition-colors duration-200 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
              >
                Pedir asesoría sobre aromas similares
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
