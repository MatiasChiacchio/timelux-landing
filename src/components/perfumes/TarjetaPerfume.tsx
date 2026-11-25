// Tarjeta de fragancia con estética Warm Ivory / Light Luxury.
// Presentacional reutilizable en la Home y en /perfumes, con acceso opcional a Vista Rápida.

import { Eye, MessageCircle, Sparkles } from "lucide-react";
import ImagenPerfume from "@/src/components/ui/ImagenPerfume";
import {
  anclaPerfume,
  enlaceWhatsAppPerfume,
  etiquetaGenero,
  etiquetaTipo,
  formatearPrecio,
} from "@/src/lib/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Propiedades de la tarjeta: fragancia, sizes de la grilla y callback opcional de Vista Rápida.
interface PropiedadesTarjetaPerfume {
  perfume: Perfume;
  sizes: string;
  prioridad?: boolean;
  alAbrirDetalle?: (perfume: Perfume) => void;
}

// Reúne las notas clave visibles en la tarjeta sin duplicados.
function obtenerNotasResumen(perfume: Perfume): {
  visibles: string[];
  restantes: number;
} {
  const todas: string[] = [
    ...perfume.notas.salida,
    ...perfume.notas.corazon,
    ...perfume.notas.fondo,
  ];
  const unicas: string[] = Array.from(new Set(todas));
  return {
    visibles: unicas.slice(0, 3),
    restantes: Math.max(0, unicas.length - 3),
  };
}

// Tarjeta editorial con foto sobre estudio blanco, jerarquía Marca → Serif y CTA WhatsApp.
export default function TarjetaPerfume({
  perfume,
  sizes,
  prioridad = false,
  alAbrirDetalle,
}: PropiedadesTarjetaPerfume): React.JSX.Element {
  const { visibles: notasVisibles, restantes: notasRestantes } =
    obtenerNotasResumen(perfume);

  const bloqueImagen = (
    <div className="relative">
      <ImagenPerfume
        src={perfume.imagenUrl}
        alt={`Frasco de ${perfume.nombre} de ${perfume.marca}`}
        sizes={sizes}
        prioridad={prioridad}
      />

      {/* Insignia Bestseller flotante sobre el frasco para evitar ruido en el texto */}
      {perfume.bestseller === true ? (
        <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-[#c40a0a]/20 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c40a0a] shadow-sm backdrop-blur-sm sm:text-[11px]">
          <Sparkles size={11} aria-hidden="true" className="shrink-0" />
          Bestseller
        </span>
      ) : null}

      {/* Píldora sutil de Vista Rápida en escritorio */}
      {alAbrirDetalle ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 left-1/2 hidden -translate-x-1/2 translate-y-1 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#a6caeb]/50 bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1e3a5f] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:inline-flex"
        >
          <Eye size={13} aria-hidden="true" />
          Ver ficha olfativa
        </span>
      ) : null}
    </div>
  );

  return (
    <article
      id={anclaPerfume(perfume)}
      className="group flex h-full scroll-mt-24 flex-col justify-between rounded-2xl border border-[#a6caeb]/35 bg-white/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c40a0a]/40 hover:shadow-xl hover:shadow-[#1e3a5f]/10 sm:p-5"
    >
      <div>
        {/* Foto clicable para Vista Rápida si está habilitada */}
        {alAbrirDetalle ? (
          <button
            type="button"
            onClick={(): void => alAbrirDetalle(perfume)}
            aria-label={`Ver ficha olfativa y detalles de ${perfume.nombre} de ${perfume.marca}`}
            className="block w-full cursor-pointer rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {bloqueImagen}
          </button>
        ) : (
          bloqueImagen
        )}

        {/* Fila superior limpia: Casa perfumista + clasificación compacta */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 sm:mt-4">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1e3a5f] sm:text-xs">
            {perfume.marca || "Timelux"}
          </p>
          <span className="shrink-0 rounded-full bg-[#a6caeb]/20 px-2 py-0.5 text-[10px] font-semibold text-[#141416] sm:px-2.5 sm:text-[11px]">
            {etiquetaTipo(perfume.tipo)} · {etiquetaGenero(perfume.genero)}
          </span>
        </div>

        {/* Nombre de la fragancia en Serif editorial */}
        <h3 className="mt-1.5 line-clamp-2 font-serif text-lg font-semibold leading-snug text-[#141416] transition-colors duration-200 group-hover:text-[#1e3a5f] sm:text-[1.4rem]">
          {alAbrirDetalle ? (
            <button
              type="button"
              onClick={(): void => alAbrirDetalle(perfume)}
              className="cursor-pointer text-left focus-visible:outline-none focus-visible:underline focus-visible:decoration-[#1e3a5f]"
            >
              {perfume.nombre}
            </button>
          ) : (
            perfume.nombre
          )}
        </h3>

        {/* Descripción breve opcional */}
        {perfume.descripcionCorta ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#5e626e] sm:text-sm">
            {perfume.descripcionCorta}
          </p>
        ) : null}

        {/* Precio destacado junto a la presentación en ml */}
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-1.5 border-t border-[#a6caeb]/25 pt-3">
          <p className="text-lg font-bold tracking-tight text-[#141416] sm:text-2xl">
            {formatearPrecio(perfume.precio)}
          </p>
          <span className="text-[11px] font-medium text-[#5e626e] sm:text-xs">
            {perfume.mililitros} ml
          </span>
        </div>

        {/* Notas olfativas clave */}
        {notasVisibles.length > 0 ? (
          <ul
            aria-label={`Notas olfativas de ${perfume.nombre}`}
            className="mt-2.5 flex flex-wrap gap-1 sm:gap-1.5"
          >
            {notasVisibles.map((nota: string) => (
              <li
                key={nota}
                className="rounded-md border border-[#a6caeb]/35 bg-[#a6caeb]/15 px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide text-[#141416] sm:text-[11px]"
              >
                {nota}
              </li>
            ))}
            {notasRestantes > 0 ? (
              <li className="rounded-md bg-[#a6caeb]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#1e3a5f] sm:text-[11px]">
                +{notasRestantes}
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>

      {/* Acciones de conversión + acceso rápido a ficha olfativa */}
      <div className="mt-4 flex items-center gap-1.5 sm:gap-2">
        <a
          href={enlaceWhatsAppPerfume(perfume)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar ${perfume.nombre} de ${perfume.marca} por WhatsApp`}
          className="flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#c40a0a] px-2.5 py-2.5 text-xs font-semibold text-[#fffff4] transition-all duration-300 hover:bg-[#a30808] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 sm:gap-2 sm:px-4 sm:text-sm"
        >
          <MessageCircle
            size={15}
            aria-hidden="true"
            className="hidden shrink-0 sm:inline-block"
          />
          <span className="truncate">Consultar</span>
        </a>

        {alAbrirDetalle ? (
          <button
            type="button"
            onClick={(): void => alAbrirDetalle(perfume)}
            aria-label={`Ver notas completas de ${perfume.nombre}`}
            title="Ver ficha olfativa"
            className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#a6caeb]/60 bg-white text-[#1e3a5f] transition-colors duration-200 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
          >
            <Eye size={17} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </article>
  );
}
