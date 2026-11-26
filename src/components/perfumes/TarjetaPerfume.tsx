// Tarjeta limpia de fragancia con estética Warm Ivory / Light Luxury.
// Presentacional reutilizable: la descripción y todas las notas viven en la Vista Rápida.

import { MessageCircle, Sparkles } from "lucide-react";
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

// Tarjeta sobria: foto, marca, nombre serif, precio/ml y CTA WhatsApp.
export default function TarjetaPerfume({
  perfume,
  sizes,
  prioridad = false,
  alAbrirDetalle,
}: PropiedadesTarjetaPerfume): React.JSX.Element {
  const bloqueImagen = (
    <div className="relative">
      <ImagenPerfume
        src={perfume.imagenUrl}
        alt={`Frasco de ${perfume.nombre} de ${perfume.marca}`}
        sizes={sizes}
        prioridad={prioridad}
      />

      {/* Insignia Bestseller discreta arriba a la izquierda */}
      {perfume.bestseller === true ? (
        <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-[#c40a0a]/20 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c40a0a] shadow-sm sm:text-[11px]">
          <Sparkles size={11} aria-hidden="true" className="shrink-0" />
          Bestseller
        </span>
      ) : null}
    </div>
  );

  return (
    <article
      id={anclaPerfume(perfume)}
      className="group flex h-full scroll-mt-24 flex-col justify-between rounded-2xl border border-[#a6caeb]/35 bg-white/95 p-3 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#c40a0a]/40 hover:shadow-lg sm:p-5"
    >
      <div>
        {/* Foto clicable para abrir notas completas en Vista Rápida */}
        {alAbrirDetalle ? (
          <button
            type="button"
            onClick={(): void => alAbrirDetalle(perfume)}
            aria-label={`Ver detalles y notas de ${perfume.nombre} de ${perfume.marca}`}
            className="block w-full cursor-pointer rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {bloqueImagen}
          </button>
        ) : (
          bloqueImagen
        )}

        {/* Fila superior limpia: Casa perfumista + clasificación discreta */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1e3a5f]">
            {perfume.marca || "Timelux"}
          </p>
          <span className="shrink-0 text-[11px] text-[#5e626e]">
            {etiquetaTipo(perfume.tipo)} · {etiquetaGenero(perfume.genero)}
          </span>
        </div>

        {/* Nombre de la fragancia en Serif editorial */}
        <h3 className="mt-1 line-clamp-2 font-serif text-lg font-semibold leading-snug text-[#141416] transition-colors duration-200 group-hover:text-[#1e3a5f] sm:text-xl">
          {alAbrirDetalle ? (
            <button
              type="button"
              onClick={(): void => alAbrirDetalle(perfume)}
              className="cursor-pointer rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
            >
              {perfume.nombre}
            </button>
          ) : (
            perfume.nombre
          )}
        </h3>

        {/* Precio destacado junto a la presentación en ml */}
        <div className="mt-2.5 flex items-baseline justify-between gap-2 border-t border-[#a6caeb]/20 pt-2.5">
          <p className="text-lg font-bold tracking-tight text-[#141416] sm:text-xl">
            {formatearPrecio(perfume.precio)}
          </p>
          <span className="text-xs text-[#5e626e]">
            {perfume.mililitros} ml
          </span>
        </div>
      </div>

      {/* Consulta directa por WhatsApp */}
      <a
        href={enlaceWhatsAppPerfume(perfume)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Consultar ${perfume.nombre} de ${perfume.marca} por WhatsApp`}
        className="mt-3.5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-4 py-2.5 text-xs font-semibold text-[#fffff4] transition-colors duration-200 hover:bg-[#a30808] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 sm:text-sm"
      >
        <MessageCircle size={15} aria-hidden="true" className="shrink-0" />
        Consultar
      </a>
    </article>
  );
}
