'use client';

// Sección de fragancias destacadas de Timelux para la portada.
// Client Component porque gestiona búsqueda, filtros por categoría y Vista Rápida.

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, SearchX, X } from "lucide-react";
import ModalDetallePerfume from "@/src/components/perfumes/ModalDetallePerfume";
import TarjetaPerfume from "@/src/components/perfumes/TarjetaPerfume";
import { SIZES_TARJETA_DESTACADOS } from "@/src/config/catalogo";
import type { CategoriaPerfume, Perfume } from "@/src/types/perfume";

// Propiedades del catálogo: lista inicial, total del catálogo y controles.
interface PropiedadesCatalogo {
  perfumesIniciales: Perfume[];
  limite?: number;
  totalCatalogo?: number;
  mostrarBuscador?: boolean;
  mostrarEnlaceCatalogo?: boolean;
}

// Pestaña de filtro con valor y etiqueta visible.
interface PestanaCategoria {
  valor: CategoriaPerfume;
  etiqueta: string;
}

// Pestañas disponibles del catálogo de portada.
const pestanas: PestanaCategoria[] = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "arabe", etiqueta: "Árabes" },
  { valor: "disenador", etiqueta: "Diseñador" },
];

// Normaliza texto eliminando diacríticos para búsquedas sin fricción.
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Catálogo destacado con buscador reactivo opcional, consola glassmorphism y Vista Rápida.
export default function Catalog({
  perfumesIniciales,
  limite,
  totalCatalogo,
  mostrarBuscador = true,
  mostrarEnlaceCatalogo = false,
}: PropiedadesCatalogo): React.JSX.Element {
  const [perfumes] = useState<Perfume[]>(perfumesIniciales);
  const [categoria, setCategoria] = useState<CategoriaPerfume>("todos");
  const [busqueda, setBusqueda] = useState<string>("");
  const [perfumeDetalle, setPerfumeDetalle] = useState<Perfume | null>(null);

  const totalReferencias: number = totalCatalogo ?? perfumes.length;
  const busquedaDiferida: string = useDeferredValue(busqueda);

  // Calcula coincidencias totales y aplica orden por bestseller + límite de portada.
  const { visibles: fraganciasFiltradas, totalCoincidencias } = useMemo(() => {
    const texto: string = normalizarTexto(busquedaDiferida.trim());

    const filtradas: Perfume[] = perfumes.filter((perfume: Perfume) => {
      const coincideCategoria: boolean =
        categoria === "todos" ? true : perfume.tipo === categoria;

      if (!coincideCategoria) {
        return false;
      }

      if (!texto) {
        return true;
      }

      const notasUnidas: string = normalizarTexto(
        [
          ...perfume.notas.salida,
          ...perfume.notas.corazon,
          ...perfume.notas.fondo,
        ].join(" "),
      );

      return (
        normalizarTexto(perfume.nombre).includes(texto) ||
        normalizarTexto(perfume.marca).includes(texto) ||
        normalizarTexto(perfume.descripcionCorta).includes(texto) ||
        notasUnidas.includes(texto)
      );
    });

    if (limite === undefined) {
      return {
        visibles: filtradas,
        totalCoincidencias: filtradas.length,
      };
    }

    const ordenadas: Perfume[] = [...filtradas].sort(
      (a: Perfume, b: Perfume) =>
        Number(b.bestseller === true) - Number(a.bestseller === true),
    );

    return {
      visibles: ordenadas.slice(0, limite),
      totalCoincidencias: filtradas.length,
    };
  }, [perfumes, categoria, busquedaDiferida, limite]);

  const hayFiltroActivo: boolean =
    categoria !== "todos" || busqueda.trim().length > 0;
  const hayMasCoincidencias: boolean =
    totalCoincidencias > fraganciasFiltradas.length;

  // Construye enlace directo al catálogo completo conservando la consulta actual.
  const enlaceCatalogoConFiltro: string = useMemo(() => {
    const params = new URLSearchParams();
    if (categoria !== "todos") {
      params.set("tipo", categoria);
    }
    if (busqueda.trim().length > 0) {
      params.set("q", busqueda.trim());
    }
    const query: string = params.toString();
    return query ? `/perfumes?${query}` : "/perfumes";
  }, [categoria, busqueda]);

  // Restablece búsqueda y categoría al estado inicial.
  function limpiarFiltros(): void {
    setCategoria("todos");
    setBusqueda("");
  }

  return (
    <section
      id="catalogo"
      className="scroll-mt-20 bg-[#fffff4] md:scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Encabezado editorial con enlace secundario en escritorio */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
              Selección Destacada
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#141416] sm:text-4xl lg:text-5xl">
              Fragancias que dejan huella
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5e626e] sm:text-base">
              {mostrarBuscador
                ? "Explorá nuestras creaciones árabes y de diseñador más elegidas. Filtrá por categoría, buscá por nota olfativa o abrí cada ficha para conocer sus acordes."
                : "Una curaduría de nuestras creaciones árabes y de diseñador más elegidas. Abrí cada ficha para descubrir sus notas olfativas o explorá el catálogo completo."}
            </p>
          </div>

          {mostrarEnlaceCatalogo ? (
            <Link
              href="/perfumes"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] transition-colors hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
            >
              Ver las {totalReferencias} fragancias
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        {/* Consola de controles en cristal (opcional) */}
        {mostrarBuscador ? (
          <div className="mt-8 rounded-2xl border border-[#a6caeb]/40 bg-white/85 p-4 shadow-sm backdrop-blur-md sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5e626e]"
                />
                <input
                  type="search"
                  value={busqueda}
                  onChange={(
                    evento: React.ChangeEvent<HTMLInputElement>,
                  ): void => setBusqueda(evento.target.value)}
                  placeholder="Buscar por nombre, marca o nota olfativa…"
                  aria-label="Buscar perfumes por nombre, marca o nota olfativa"
                  className="min-h-[44px] w-full rounded-full border border-[#a6caeb]/45 bg-white py-2.5 pl-11 pr-11 text-sm text-[#141416] placeholder:text-[#5e626e] focus:border-[#c40a0a] focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/60"
                />
                {busqueda.length > 0 ? (
                  <button
                    type="button"
                    onClick={(): void => setBusqueda("")}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-1.5 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#5e626e] transition-colors hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                ) : null}
              </div>

              <div
                role="tablist"
                aria-label="Filtrar perfumes por categoría"
                className="flex shrink-0 gap-2 overflow-x-auto pb-0.5 pt-0.5"
              >
                {pestanas.map((pestana: PestanaCategoria) => {
                  const activa: boolean = categoria === pestana.valor;
                  return (
                    <button
                      key={pestana.valor}
                      type="button"
                      role="tab"
                      aria-selected={activa}
                      onClick={(): void => setCategoria(pestana.valor)}
                      className={`min-h-[44px] cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                        activa
                          ? "bg-[#c40a0a] text-[#fffff4] shadow-sm"
                          : "border border-[#a6caeb]/45 bg-[#a6caeb]/15 text-[#141416] hover:bg-[#a6caeb]/35"
                      }`}
                    >
                      {pestana.etiqueta}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#a6caeb]/20 pt-3">
              <p
                aria-live="polite"
                className="text-xs font-medium text-[#5e626e] sm:text-sm"
              >
                {hayFiltroActivo
                  ? `Mostrando ${fraganciasFiltradas.length} de ${totalCoincidencias} ${
                      totalCoincidencias === 1 ? "coincidencia" : "coincidencias"
                    }`
                  : `Mostrando ${fraganciasFiltradas.length} destacados de ${totalReferencias} ${
                      totalReferencias === 1 ? "fragancia" : "fragancias"
                    }`}
              </p>

              {hayFiltroActivo && hayMasCoincidencias ? (
                <Link
                  href={enlaceCatalogoConFiltro}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#c40a0a] hover:text-[#a30808] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
                >
                  Ver las {totalCoincidencias} coincidencias en el catálogo
                  completo
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Grilla de tarjetas destacadas */}
        {fraganciasFiltradas.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {fraganciasFiltradas.map((perfume: Perfume) => (
              <li key={perfume.id} className="h-full">
                <TarjetaPerfume
                  perfume={perfume}
                  sizes={SIZES_TARJETA_DESTACADOS}
                  alAbrirDetalle={setPerfumeDetalle}
                />
              </li>
            ))}
          </ul>
        ) : (
          /* Estado vacío sin coincidencias */
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-[#a6caeb]/35 bg-white/90 px-6 py-14 text-center shadow-sm">
            <SearchX
              aria-hidden="true"
              className="h-10 w-10 text-[#1e3a5f]"
            />
            <h3 className="mt-4 font-serif text-2xl font-semibold text-[#141416]">
              Sin coincidencias por ahora
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5e626e]">
              No encontramos fragancias con esos filtros. Probá con otro
              nombre, marca o nota, o limpiá la búsqueda para ver los destacados.
            </p>
            <button
              type="button"
              onClick={limpiarFiltros}
              className="mt-6 min-h-[44px] cursor-pointer rounded-full bg-[#c40a0a] px-6 py-2.5 text-sm font-semibold text-[#fffff4] transition-colors hover:bg-[#a30808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Enlace destacado al catálogo completo */}
        {mostrarEnlaceCatalogo ? (
          <div className="mt-12 flex justify-center">
            <Link
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#c40a0a] px-8 py-3.5 text-sm font-semibold text-[#fffff4] shadow-md shadow-[#c40a0a]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
              href={enlaceCatalogoConFiltro}
            >
              Explorar catálogo completo ({totalReferencias} fragancias)
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ) : null}
      </div>

      {/* Modal de Vista Rápida / Ficha Olfativa */}
      <ModalDetallePerfume
        perfume={perfumeDetalle}
        alCerrar={(): void => setPerfumeDetalle(null)}
      />
    </section>
  );
}
