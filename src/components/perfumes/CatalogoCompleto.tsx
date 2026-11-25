'use client';

// Explorador del catálogo completo de fragancias Timelux.
// Client Component porque gestiona búsqueda, filtros combinados, ordenamiento y Vista Rápida.

import { Suspense, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, ChevronDown, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import ComboboxMarcas from "@/src/components/perfumes/ComboboxMarcas";
import ModalDetallePerfume from "@/src/components/perfumes/ModalDetallePerfume";
import TarjetaPerfume from "@/src/components/perfumes/TarjetaPerfume";
import {
  SIZES_TARJETA_CATALOGO,
  TANDA_CARGA_CATALOGO,
} from "@/src/config/catalogo";
import { etiquetaGenero, etiquetaTipo } from "@/src/lib/perfumes";
import type { CategoriaPerfume, GeneroPerfume, Perfume } from "@/src/types/perfume";

// Propiedades: lista completa provista por el Server Component.
interface PropiedadesCatalogoCompleto {
  perfumesIniciales: Perfume[];
}

// Criterios disponibles para ordenar el catálogo.
type OrdenCatalogo =
  | "destacados"
  | "precio-asc"
  | "precio-desc"
  | "nombre-asc";

// Filtros leídos opcionalmente desde la query de la URL.
interface FiltrosDesdeUrl {
  tipo?: CategoriaPerfume;
  genero?: GeneroPerfume | "todos";
  marca?: string;
  orden?: OrdenCatalogo;
  q?: string;
}

// Opciones de categoría (origen) y género.
const filtrosCategoria: Array<{ valor: CategoriaPerfume; etiqueta: string }> = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "arabe", etiqueta: "Árabes" },
  { valor: "disenador", etiqueta: "Diseñador" },
];

const filtrosGenero: Array<{ valor: GeneroPerfume | "todos"; etiqueta: string }> = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "hombre", etiqueta: "Hombre" },
  { valor: "mujer", etiqueta: "Mujer" },
  { valor: "unisex", etiqueta: "Unisex" },
];

const opcionesOrden: Array<{ valor: OrdenCatalogo; etiqueta: string }> = [
  { valor: "destacados", etiqueta: "Destacados primero" },
  { valor: "precio-asc", etiqueta: "Menor precio" },
  { valor: "precio-desc", etiqueta: "Mayor precio" },
  { valor: "nombre-asc", etiqueta: "Nombre (A–Z)" },
];

// Normaliza texto eliminando diacríticos para búsquedas tolerantes a tildes.
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Micro-componente envuelto en Suspense para leer parámetros de URL sin
// impedir el prerenderizado estático e ISR de /perfumes.
function SincronizadorFiltrosUrl({
  marcasValidas,
  alAplicarFiltros,
}: {
  marcasValidas: string[];
  alAplicarFiltros: (filtros: FiltrosDesdeUrl) => void;
}): null {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tipoParam: string | null = searchParams.get("tipo");
    const generoParam: string | null = searchParams.get("genero");
    const marcaParam: string | null = searchParams.get("marca");
    const ordenParam: string | null = searchParams.get("orden");
    const qParam: string | null = searchParams.get("q");

    const filtros: FiltrosDesdeUrl = {};

    if (tipoParam === "arabe" || tipoParam === "disenador" || tipoParam === "todos") {
      filtros.tipo = tipoParam;
    }

    if (
      generoParam === "hombre" ||
      generoParam === "mujer" ||
      generoParam === "unisex" ||
      generoParam === "todos"
    ) {
      filtros.genero = generoParam;
    }

    if (marcaParam && marcasValidas.includes(marcaParam)) {
      filtros.marca = marcaParam;
    }

    if (
      ordenParam === "destacados" ||
      ordenParam === "precio-asc" ||
      ordenParam === "precio-desc" ||
      ordenParam === "nombre-asc"
    ) {
      filtros.orden = ordenParam;
    }

    if (qParam !== null && qParam.trim().length > 0) {
      filtros.q = qParam;
    }

    if (Object.keys(filtros).length > 0) {
      alAplicarFiltros(filtros);
    }
  }, [searchParams, marcasValidas, alAplicarFiltros]);

  return null;
}

// Catálogo completo con consola glassmorphism, filtros combinados, ordenamiento y Vista Rápida.
export default function CatalogoCompleto({
  perfumesIniciales,
}: PropiedadesCatalogoCompleto): React.JSX.Element {
  const [perfumes] = useState<Perfume[]>(perfumesIniciales);
  const [busqueda, setBusqueda] = useState<string>("");
  const [categoria, setCategoria] = useState<CategoriaPerfume>("todos");
  const [genero, setGenero] = useState<GeneroPerfume | "todos">("todos");
  const [marca, setMarca] = useState<string>("todas");
  const [orden, setOrden] = useState<OrdenCatalogo>("destacados");
  const [visibles, setVisibles] = useState<number>(TANDA_CARGA_CATALOGO);
  const [perfumeDetalle, setPerfumeDetalle] = useState<Perfume | null>(null);

  // Difiere la consulta pesada de texto para mantener el input instantáneo (INP).
  const busquedaDiferida: string = useDeferredValue(busqueda);

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

  // Aplica filtros provenientes de enlaces directos (?tipo=arabe, ?q=..., etc.).
  const aplicarFiltrosUrl = useMemo(
    () => (filtros: FiltrosDesdeUrl): void => {
      if (filtros.tipo) {
        setCategoria(filtros.tipo);
      }
      if (filtros.genero) {
        setGenero(filtros.genero);
      }
      if (filtros.marca) {
        setMarca(filtros.marca);
      }
      if (filtros.orden) {
        setOrden(filtros.orden);
      }
      if (filtros.q !== undefined) {
        setBusqueda(filtros.q);
      }
      setVisibles(TANDA_CARGA_CATALOGO);
    },
    [],
  );

  // Fragancias filtradas por categoría, género, marca y búsqueda (nombre, marca, descripción o notas).
  const fraganciasFiltradas: Perfume[] = useMemo(() => {
    const texto: string = normalizarTexto(busquedaDiferida.trim());

    const filtradas: Perfume[] = perfumes.filter((perfume: Perfume) => {
      if (categoria !== "todos" && perfume.tipo !== categoria) {
        return false;
      }

      if (genero !== "todos" && perfume.genero !== genero) {
        return false;
      }

      if (marca !== "todas" && perfume.marca !== marca) {
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

    const ordenadas: Perfume[] = [...filtradas];

    if (orden === "destacados") {
      ordenadas.sort(
        (a: Perfume, b: Perfume) =>
          Number(b.bestseller === true) - Number(a.bestseller === true),
      );
    } else if (orden === "precio-asc") {
      ordenadas.sort((a: Perfume, b: Perfume) => a.precio - b.precio);
    } else if (orden === "precio-desc") {
      ordenadas.sort((a: Perfume, b: Perfume) => b.precio - a.precio);
    } else if (orden === "nombre-asc") {
      ordenadas.sort((a: Perfume, b: Perfume) =>
        a.nombre.localeCompare(b.nombre, "es"),
      );
    }

    return ordenadas;
  }, [perfumes, busquedaDiferida, categoria, genero, marca, orden]);

  // Porción visible según la carga progresiva.
  const fraganciasVisibles: Perfume[] = fraganciasFiltradas.slice(0, visibles);
  const hayMas: boolean = visibles < fraganciasFiltradas.length;
  const porcentajeVisto: number =
    fraganciasFiltradas.length > 0
      ? Math.min(
          100,
          Math.round(
            (fraganciasVisibles.length / fraganciasFiltradas.length) * 100,
          ),
        )
      : 0;

  const tieneFiltrosActivos: boolean =
    busqueda.trim().length > 0 ||
    categoria !== "todos" ||
    genero !== "todos" ||
    marca !== "todas";

  // Actualizadores que reinician la tanda visible.
  function actualizarBusqueda(valor: string): void {
    setBusqueda(valor);
    setVisibles(TANDA_CARGA_CATALOGO);
  }

  function actualizarCategoria(valor: CategoriaPerfume): void {
    setCategoria(valor);
    setVisibles(TANDA_CARGA_CATALOGO);
  }

  function actualizarGenero(valor: GeneroPerfume | "todos"): void {
    setGenero(valor);
    setVisibles(TANDA_CARGA_CATALOGO);
  }

  function actualizarMarca(valor: string): void {
    setMarca(valor);
    setVisibles(TANDA_CARGA_CATALOGO);
  }

  function actualizarOrden(valor: OrdenCatalogo): void {
    setOrden(valor);
    setVisibles(TANDA_CARGA_CATALOGO);
  }

  function limpiarFiltros(): void {
    setBusqueda("");
    setCategoria("todos");
    setGenero("todos");
    setMarca("todas");
    setOrden("destacados");
    setVisibles(TANDA_CARGA_CATALOGO);
  }

  return (
    <div>
      {/* Lectura de parámetros de URL sin bloquear SSR/ISR */}
      <Suspense fallback={null}>
        <SincronizadorFiltrosUrl
          marcasValidas={marcas}
          alAplicarFiltros={aplicarFiltrosUrl}
        />
      </Suspense>

      {/* Consola de controles en superficie glassmorphism */}
      <div className="rounded-2xl border border-[#a6caeb]/40 bg-white/85 p-4 shadow-sm backdrop-blur-md sm:p-5">
        {/* Fila superior: buscador, marca y ordenamiento */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5e626e]"
            />
            <input
              type="search"
              value={busqueda}
              onChange={(
                evento: React.ChangeEvent<HTMLInputElement>,
              ): void => actualizarBusqueda(evento.target.value)}
              placeholder="Buscar por nombre, marca o nota olfativa…"
              aria-label="Buscar perfumes por nombre, marca o nota olfativa"
              className="min-h-[44px] w-full rounded-full border border-[#a6caeb]/45 bg-white py-2.5 pl-11 pr-11 text-sm text-[#141416] placeholder:text-[#5e626e] focus:border-[#c40a0a] focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/60"
            />
            {busqueda.length > 0 ? (
              <button
                type="button"
                onClick={(): void => actualizarBusqueda("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-1.5 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#5e626e] transition-colors hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
              >
                <X size={16} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="lg:col-span-3">
            <ComboboxMarcas
              marcas={marcas}
              marcaSeleccionada={marca}
              alSeleccionarMarca={actualizarMarca}
            />
          </div>

          <div className="relative lg:col-span-3">
            <ArrowUpDown
              aria-hidden="true"
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5e626e]"
            />
            <select
              value={orden}
              onChange={(
                evento: React.ChangeEvent<HTMLSelectElement>,
              ): void => actualizarOrden(evento.target.value as OrdenCatalogo)}
              aria-label="Ordenar fragancias"
              className="min-h-[44px] w-full cursor-pointer appearance-none rounded-xl border border-[#a6caeb]/45 bg-white bg-none py-2.5 pl-10 pr-10 text-sm font-medium text-[#141416] shadow-sm transition-colors hover:border-[#a6caeb] focus:border-[#c40a0a] focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/60"
            >
              {opcionesOrden.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                  {opcion.etiqueta}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              size={17}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5e626e]"
            />
          </div>
        </div>

        {/* Fila intermedia: píldoras de Categoría (Origen) y Género */}
        <div className="mt-4 flex flex-col gap-3.5 border-t border-[#a6caeb]/25 pt-4 md:flex-row md:items-center md:justify-between">
          {/* Filtro por categoría: Árabes / Diseñador */}
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
              <SlidersHorizontal size={13} aria-hidden="true" />
              Tipo:
            </span>
            <div
              role="tablist"
              aria-label="Filtrar perfumes por categoría"
              className="flex flex-wrap gap-1.5"
            >
              {filtrosCategoria.map((filtro) => {
                const activo: boolean = categoria === filtro.valor;
                return (
                  <button
                    key={filtro.valor}
                    type="button"
                    role="tab"
                    aria-selected={activo}
                    onClick={(): void => actualizarCategoria(filtro.valor)}
                    className={`min-h-[44px] cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-4 sm:text-sm ${
                      activo
                        ? "bg-[#c40a0a] text-[#fffff4] shadow-sm"
                        : "border border-[#a6caeb]/45 bg-[#a6caeb]/15 text-[#141416] hover:bg-[#a6caeb]/35"
                    }`}
                  >
                    {filtro.etiqueta}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtro por género */}
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
              Género:
            </span>
            <div
              role="tablist"
              aria-label="Filtrar perfumes por género"
              className="flex flex-wrap gap-1.5"
            >
              {filtrosGenero.map((filtro) => {
                const activo: boolean = genero === filtro.valor;
                return (
                  <button
                    key={filtro.valor}
                    type="button"
                    role="tab"
                    aria-selected={activo}
                    onClick={(): void => actualizarGenero(filtro.valor)}
                    className={`min-h-[44px] cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-4 sm:text-sm ${
                      activo
                        ? "bg-[#c40a0a] text-[#fffff4] shadow-sm"
                        : "border border-[#a6caeb]/45 bg-[#a6caeb]/15 text-[#141416] hover:bg-[#a6caeb]/35"
                    }`}
                  >
                    {filtro.etiqueta}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fila inferior: contador y chips removibles de filtros activos */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#a6caeb]/20 pt-3">
          <p aria-live="polite" className="text-xs font-medium text-[#5e626e] sm:text-sm">
            Mostrando{" "}
            <strong className="font-semibold text-[#141416]">
              {fraganciasVisibles.length}
            </strong>{" "}
            de{" "}
            <strong className="font-semibold text-[#141416]">
              {fraganciasFiltradas.length}
            </strong>{" "}
            {fraganciasFiltradas.length === 1 ? "perfume" : "perfumes"}
          </p>

          {tieneFiltrosActivos ? (
            <div className="flex flex-wrap items-center gap-2">
              {categoria !== "todos" ? (
                <button
                  type="button"
                  onClick={(): void => actualizarCategoria("todos")}
                  className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-full border border-[#a6caeb]/50 bg-[#fffff4] px-3 py-1 text-xs font-medium text-[#1e3a5f] transition-colors hover:border-[#c40a0a]/40 hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
                >
                  {etiquetaTipo(categoria)}
                  <X size={13} aria-hidden="true" />
                </button>
              ) : null}

              {genero !== "todos" ? (
                <button
                  type="button"
                  onClick={(): void => actualizarGenero("todos")}
                  className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-full border border-[#a6caeb]/50 bg-[#fffff4] px-3 py-1 text-xs font-medium text-[#1e3a5f] transition-colors hover:border-[#c40a0a]/40 hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
                >
                  {etiquetaGenero(genero)}
                  <X size={13} aria-hidden="true" />
                </button>
              ) : null}

              {marca !== "todas" ? (
                <button
                  type="button"
                  onClick={(): void => actualizarMarca("todas")}
                  className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-full border border-[#a6caeb]/50 bg-[#fffff4] px-3 py-1 text-xs font-medium text-[#1e3a5f] transition-colors hover:border-[#c40a0a]/40 hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
                >
                  {marca}
                  <X size={13} aria-hidden="true" />
                </button>
              ) : null}

              {busqueda.trim().length > 0 ? (
                <button
                  type="button"
                  onClick={(): void => actualizarBusqueda("")}
                  className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-full border border-[#a6caeb]/50 bg-[#fffff4] px-3 py-1 text-xs font-medium text-[#1e3a5f] transition-colors hover:border-[#c40a0a]/40 hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
                >
                  “{busqueda.trim()}”
                  <X size={13} aria-hidden="true" />
                </button>
              ) : null}

              <button
                type="button"
                onClick={limpiarFiltros}
                className="inline-flex min-h-[36px] cursor-pointer items-center px-2 text-xs font-semibold text-[#c40a0a] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]"
              >
                Limpiar todo
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Grilla de tarjetas */}
      {fraganciasFiltradas.length > 0 ? (
        <>
          <ul className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {fraganciasVisibles.map((perfume: Perfume, indice: number) => (
              <li key={perfume.id} className="h-full">
                {/* La primera imagen está above the fold y suele ser el LCP
                    de /perfumes: se precarga solo esa, no toda la grilla. */}
                <TarjetaPerfume
                  perfume={perfume}
                  sizes={SIZES_TARJETA_CATALOGO}
                  prioridad={indice === 0}
                  alAbrirDetalle={setPerfumeDetalle}
                />
              </li>
            ))}
          </ul>

          {/* Progreso y carga progresiva por tandas */}
          {hayMas ? (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-medium text-[#5e626e]">
                  Viste {fraganciasVisibles.length} de{" "}
                  {fraganciasFiltradas.length} fragancias ({porcentajeVisto}%)
                </p>
                <div
                  aria-hidden="true"
                  className="h-1.5 w-48 overflow-hidden rounded-full bg-[#a6caeb]/30"
                >
                  <div
                    className="h-full rounded-full bg-[#1e3a5f] transition-all duration-300"
                    style={{ width: `${porcentajeVisto}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={(): void =>
                  setVisibles(
                    (previo: number) => previo + TANDA_CARGA_CATALOGO,
                  )
                }
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border border-[#c40a0a]/45 bg-white/95 px-8 py-3 text-sm font-semibold text-[#c40a0a] shadow-sm transition-all duration-300 hover:bg-[#c40a0a] hover:text-[#fffff4] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
              >
                Cargar más fragancias
                <span aria-hidden="true">&darr;</span>
              </button>
            </div>
          ) : null}
        </>
      ) : (
        /* Estado vacío sin coincidencias */
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-[#a6caeb]/35 bg-white/90 px-6 py-14 text-center shadow-sm">
          <SearchX aria-hidden="true" className="h-10 w-10 text-[#1e3a5f]" />
          <h3 className="mt-4 font-serif text-2xl font-semibold text-[#141416]">
            Sin coincidencias por ahora
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5e626e]">
            No encontramos fragancias con esos filtros. Probá con otra nota,
            marca o nombre, o limpiá los filtros para ver todo el catálogo.
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

      {/* Modal de Vista Rápida / Ficha Olfativa */}
      <ModalDetallePerfume
        perfume={perfumeDetalle}
        alCerrar={(): void => setPerfumeDetalle(null)}
      />
    </div>
  );
}
