// Tarjeta de fragancia con diseño de alta gama.
// Server Component presentacional: se reutiliza en la Home y en /perfumes.

import { BadgeCheck, MessageCircle } from "lucide-react";
import ImagenPerfume from "@/src/components/ui/ImagenPerfume";
import {
  enlaceWhatsAppPerfume,
  etiquetaGenero,
  etiquetaTipo,
  formatearPrecio,
} from "@/src/lib/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Propiedades de la tarjeta: una fragancia del catálogo.
interface PropiedadesTarjetaPerfume {
  perfume: Perfume;
}

// Tarjeta con foto, insignias, notas y consulta directa por WhatsApp.
export default function TarjetaPerfume({
  perfume,
}: PropiedadesTarjetaPerfume): React.JSX.Element {
  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-[#a6caeb]/30 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:border-[#c40a0a]/40 hover:shadow-xl">
      <div>
        {/* Frasco con dimensiones propias y respaldo local */}
        <ImagenPerfume
          src={perfume.imagenUrl}
          alt={`Frasco de ${perfume.nombre} de ${perfume.marca}`}
        />

        {/* Insignias de categoría, género y bestseller */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#a6caeb]/30 px-2.5 py-1 text-xs font-semibold text-[#141416]">
            {etiquetaTipo(perfume.tipo)}
          </span>
          <span className="rounded-full bg-[#a6caeb]/30 px-2.5 py-1 text-xs font-semibold text-[#141416]">
            {etiquetaGenero(perfume.genero)}
          </span>
          {perfume.bestseller === true && (
            <span className="rounded-full bg-[#a6caeb]/30 px-2.5 py-1 text-xs font-semibold text-[#141416]">
              Bestseller
            </span>
          )}
          <span className="rounded-full bg-[#a6caeb]/30 px-2.5 py-1 text-xs font-semibold text-[#141416]">
            {perfume.mililitros} ml
          </span>
        </div>

        {/* Nombre y marca */}
        <h3 className="mt-4 text-lg font-bold text-[#141416]">
          {perfume.nombre}
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#5e626e]">
          {perfume.marca}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#5e626e]">
          {perfume.descripcionCorta}
        </p>

        {/* Precio destacado en pesos */}
        <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#141416]">
          {formatearPrecio(perfume.precio)}
        </p>

        {/* Notas olfativas clave */}
        <ul
          aria-label={`Notas de salida de ${perfume.nombre}`}
          className="mt-3 flex flex-wrap gap-1.5"
        >
          {perfume.notas.salida.slice(0, 3).map((nota: string) => (
            <li
              key={nota}
              className="rounded-md border border-[#a6caeb]/30 bg-[#a6caeb]/15 px-2 py-0.5 text-xs uppercase tracking-wider text-[#141416]"
            >
              {nota}
            </li>
          ))}
        </ul>

        {/* Garantía de originalidad */}
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#5e626e]">
          <BadgeCheck size={14} aria-hidden="true" className="text-[#7bb4e3]" />
          100% original · Sellado en origen
        </p>
      </div>

      {/* Consulta individual por WhatsApp */}
      <a
        href={enlaceWhatsAppPerfume(perfume)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Consultar ${perfume.nombre} de ${perfume.marca} por WhatsApp`}
        className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#c40a0a] px-4 py-2.5 text-sm font-medium text-[#fffff4] transition-colors hover:bg-[#a30808]"
      >
        <MessageCircle size={16} aria-hidden="true" />
        Consultar
      </a>
    </article>
  );
}
