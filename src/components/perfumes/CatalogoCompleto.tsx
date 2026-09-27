'use client';

// Explorador del catálogo completo de fragancias Timelux.
// Client Component porque gestiona búsqueda, filtros y carga progresiva.

import { useMemo, useState } from "react";
import { ChevronDown, Search, SearchX } from "lucide-react";
import TarjetaPerfume from "@/src/components/perfumes/TarjetaPerfume";
import type { GeneroPerfume, Perfume } from "@/src/types/perfume";

// Propiedades: lista completa provista por el Server Component.
interface PropiedadesCatalogoCompleto {
  perfumesIniciales: Perfume[];
}

// Filtro de género con valor y etiqueta visible.
interface FiltroGenero {
  valor: GeneroPerfume | "todos";
  etiqueta: string;
}

// Píldoras de género disponibles.
const filtrosGenero: FiltroGenero[] = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "hombre", etiqueta: "Hombre" },
  { valor: "mujer", etiqueta: "Mujer" },
  { valor: "unisex", etiqueta: "Unisex" },
];

// Cantidad de tarjetas que se suman con cada tanda.
const TANDA_CARGA: number = 20;

// Catálogo completo con buscador reactivo, filtros y botón de carga progresiva.
export default function CatalogoCompleto({
  perfumesIniciales,
}: PropiedadesCatalogoCompleto): React.JSX.Element {
  // Lista base provista por el servidor y controles de filtrado.
  const [perfumes] = useState<Perfume[]>(perfumesIniciales);
  const [busqueda, setBusqueda] = useState<string>("");
  const [genero, setGenero] = useState<GeneroPerfume | "todos">("todos");
  const [marca, setMarca] = useState<string>("todas");
  const [visibles, setVisibles] = useState<number>(TANDA_CARGA);

  // Marcas únicas ordenadas alfabéticamente para el selector.
  const marcas: string[] = useMemo(() => {
    const unicas: Set<string> = new Set<string>();
    for (const perfume of perfumes) {
      if (perfume.marca.trim().length > 0) {
        unicas.add(perfume.marca);
      }
    }
    return [...unicas].sort((a: string, b: string) => a.localeCompare(b, "es"));
  }, [perfumes]);

  // Fragancias filtradas por búsqueda (nombre o marca), género y marca.
  const fraganciasFiltradas: Perfume[] = useMemo(() => {
    const texto: string = busqueda.toLowerCase().trim();

    return perfumes.filter((perfume: Perfume) => {
      if (genero !== "todos" && perfume.genero !== genero) {
        return false;
      }

      if (marca !== "todas" && perfume.marca !== marca) {
        return false;
      }

      if (!texto) {
        return true;
      }

      return (
        perfume.nombre.toLowerCase().includes(texto) ||
        perfume.marca.toLowerCase().includes(texto)
      );
    });
  }, [perfumes, busqueda, genero, marca]);

  // Porción visible según la carga progresiva.
  const fraganciasVisibles: Perfume[] = fraganciasFiltradas.slice(0, visibles);
  const hayMas: boolean = visibles < fraganciasFiltradas.length;

  // Actualiza un filtro y reinicia la carga progresiva.
  function actualizarBusqueda(valor: string): void {
    setBusqueda(valor);
    setVisibles(TANDA_CARGA);
  }

  function actualizarGenero(valor: GeneroPerfume | "todos"): void {
    setGenero(valor);
    setVisibles(TANDA_CARGA);
  }

  function actualizarMarca(valor: string): void {
    setMarca(valor);
    setVisibles(TANDA_CARGA);
  }

  // Restablece todos los filtros al estado inicial.
  function limpiarFiltros(): void {
    setBusqueda("");
    setGenero("todos");
    setMarca("todas");
    setVisibles(TANDA_CARGA);
  }

  return (
    <div>
      {/* Barra de controles: buscador, género y marca */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5e626e]"
          />
          <input
            type="search"
            value={busqueda}
            onChange={(
              evento: React.ChangeEvent<HTMLInputElement>,
            ): void => actualizarBusqueda(evento.target.value)}
            placeholder="Buscar por nombre o marca…"
            aria-label="Buscar perfumes por nombre o marca"
            className="min-h-[44px] w-full rounded-full border border-[#a6caeb]/40 bg-white/90 py-3 pl-11 pr-4 text-sm text-[#141416] placeholder:text-[#5e626e] focus:border-[#c40a0a]/50 focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/20"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div
            role="tablist"
            aria-label="Filtrar perfumes por género"
            className="flex flex-1 gap-2 overflow-x-auto pb-1"
          >
            {filtrosGenero.map((filtro: FiltroGenero) => {
              const activo: boolean = genero === filtro.valor;
              return (
                <button
                  key={filtro.valor}
                  type="button"
                  role="tab"
                  aria-selected={activo}
                  onClick={(): void => actualizarGenero(filtro.valor)}
                  className={`min-h-[44px] whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                    activo
                      ? "bg-[#c40a0a] text-[#fffff4]"
                      : "border border-[#a6caeb]/40 bg-[#a6caeb]/20 text-[#141416] hover:bg-[#a6caeb]/40"
                  }`}
                >
                  {filtro.etiqueta}
                </button>
              );
            })}
          </div>

          <div className="relative sm:w-56 sm:shrink-0">
            <select
              value={marca}
              onChange={(
                evento: React.ChangeEvent<HTMLSelectElement>,
              ): void => actualizarMarca(evento.target.value)}
              aria-label="Filtrar perfumes por marca"
              className="min-h-[44px] w-full appearance-none rounded-full border border-[#a6caeb]/40 bg-white/90 py-2 pl-4 pr-10 text-sm font-medium text-[#141416] focus:border-[#c40a0a]/50 focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/20"
            >
              <option value="todas">Todas las marcas</option>
              {marcas.map((nombreMarca: string) => (
                <option key={nombreMarca} value={nombreMarca}>
                  {nombreMarca}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5e626e]"
            />
          </div>
        </div>

        <p aria-live="polite" className="text-sm text-[#5e626e]">
          Mostrando {fraganciasVisibles.length} de {fraganciasFiltradas.length}{" "}
          {fraganciasFiltradas.length === 1 ? "perfume" : "perfumes"}
        </p>
      </div>

      {/* Grilla de tarjetas */}
      {fraganciasFiltradas.length > 0 ? (
        <>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {fraganciasVisibles.map((perfume: Perfume) => (
              <li key={perfume.id} className="h-full">
                <TarjetaPerfume perfume={perfume} />
              </li>
            ))}
          </ul>

          {/* Carga progresiva por tandas */}
          {hayMas && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={(): void =>
                  setVisibles(
                    (previo: number) => previo + TANDA_CARGA,
                  )}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#c40a0a]/40 bg-white/90 px-8 py-3 text-sm font-medium text-[#c40a0a] transition-all duration-300 hover:bg-[#c40a0a] hover:text-white hover:shadow-lg"
              >
                Cargar más fragancias
                <span aria-hidden="true">&darr;</span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* Estado vacío sin coincidencias */
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-[#a6caeb]/30 bg-white/90 px-6 py-12 text-center">
          <SearchX aria-hidden="true" className="h-10 w-10 text-[#a6caeb]" />
          <h3 className="mt-4 text-lg font-bold text-[#141416]">
            Sin coincidencias por ahora
          </h3>
          <p className="mt-2 max-w-md text-sm text-[#5e626e]">
            No encontramos fragancias con esos filtros. Probá con otro nombre o
            marca, o limpiá la búsqueda para ver todo el catálogo.
          </p>
          <button
            type="button"
            onClick={limpiarFiltros}
            className="mt-6 min-h-[44px] rounded-full bg-[#c40a0a] px-5 py-2.5 text-sm font-medium text-[#fffff4] transition-colors hover:bg-[#a30808]"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
