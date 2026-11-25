// Cabecera editorial reutilizable para los apartados dedicados de Timelux.
// Server Component: renderiza migas de pan accesibles, titular serif y ranura lateral opcional.

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

// Propiedades de la cabecera boutique compartida.
interface PropiedadesCabeceraSeccion {
  etiquetaBreadcrumb: string;
  eyebrow: string;
  titulo: string;
  tituloCursiva?: string;
  descripcion: string;
  children?: ReactNode;
}

// Encabezado luminoso Warm Ivory compartido por /perfumes, /nosotros, /preguntas y /contacto.
export default function CabeceraSeccion({
  etiquetaBreadcrumb,
  eyebrow,
  titulo,
  tituloCursiva,
  descripcion,
  children,
}: PropiedadesCabeceraSeccion): React.JSX.Element {
  return (
    <section className="relative overflow-hidden border-b border-[#a6caeb]/35 bg-white/60">
      {/* Resplandor luminoso celeste sobre marfil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,202,235,0.32),_transparent_62%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 md:pb-12 md:pt-12 lg:px-8">
        {/* Migas de pan accesibles sincronizadas con BreadcrumbList */}
        <nav aria-label="Migas de pan">
          <ol className="flex items-center gap-1.5 text-xs font-medium text-[#5e626e] sm:text-sm">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center rounded-md px-1 transition-colors hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
              >
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#5e626e]/70">
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="font-semibold text-[#1e3a5f]">
              {etiquetaBreadcrumb}
            </li>
          </ol>
        </nav>

        {/* Encabezado editorial y bloque lateral opcional */}
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
              {eyebrow}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight text-[#141416] sm:text-5xl lg:text-6xl">
              {titulo}
              {tituloCursiva ? (
                <>
                  {" "}
                  <span className="inline-block font-medium italic text-[#1e3a5f]">
                    {tituloCursiva}
                  </span>
                </>
              ) : null}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5e626e] sm:text-base">
              {descripcion}
            </p>
          </div>

          {children ? <div className="shrink-0">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
