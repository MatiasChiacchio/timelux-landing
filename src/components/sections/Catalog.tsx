'use client';

// Sección de fragancias destacadas de Timelux para la portada.
// Client Component porque gestiona búsqueda y filtros por categoría.

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SearchX } from "lucide-react";
import TarjetaPerfume from "@/src/components/perfumes/TarjetaPerfume";
import type { CategoriaPerfume, Perfume } from "@/src/types/perfume";

// Propiedades del catálogo: lista inicial y modo de destacados.
interface PropiedadesCatalogo {
  perfumesIniciales: Perfume[];
  limite?: number;
  mostrarEnlaceCatalogo?: boolean;
}

// Pestaña de filtro con valor y etiqueta visible.
interface PestanaCategoria {
  valor: CategoriaPerfume;
  etiqueta: string;
}

// Pestañas disponibles del catálogo.
const pestanas: PestanaCategoria[] = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "arabe", etiqueta: "Árabes" },
  { valor: "disenador", etiqueta: "Diseñador" },
];

// Catálogo con buscador reactivo, filtros y enlace al catálogo completo.
export default function Catalog({
  perfumesIniciales,
  limite,
  mostrarEnlaceCatalogo = false,
}: PropiedadesCatalogo): React.JSX.Element {
  // Lista base provista por el servidor y controles de filtrado.
  const [perfumes] = useState<Perfume[]>(perfumesIniciales);
  const [categoria, setCategoria] = useState<CategoriaPerfume>("todos");
  const [busqueda, setBusqueda] = useState<string>("");

  // Fragancias filtradas por categoría y búsqueda (nombre, marca o notas).
  // En modo destacados, los bestsellers van primero y se aplica el límite.
  const fraganciasFiltradas: Perfume[] = useMemo(() => {
    const texto: string = busqueda.toLowerCase().trim();

    const filtradas: Perfume[] = perfumes.filter((perfume: Perfume) => {
      const coincideCategoria: boolean =
        categoria === "todos" ? true : perfume.tipo === categoria;

      if (!coincideCategoria) {
        return false;
      }

      if (!texto) {
        return true;
      }

      const notasUnidas: string = [
        ...perfume.notas.salida,
        ...perfume.notas.corazon,
        ...perfume.notas.fondo,
      ]
        .join(" ")
        .toLowerCase();

      return (
        perfume.nombre.toLowerCase().includes(texto) ||
        perfume.marca.toLowerCase().includes(texto) ||
        notasUnidas.includes(texto)
      );
    });

    if (limite === undefined) {
      return filtradas;
    }

    const ordenadas: Perfume[] = [...filtradas].sort(
      (a: Perfume, b: Perfume) =>
        Number(b.bestseller === true) - Number(a.bestseller === true),
    );

    return ordenadas.slice(0, limite);
  }, [perfumes, categoria, busqueda, limite]);

  // Restablece búsqueda y categoría al estado inicial.
  function limpiarFiltros(): void {
    setCategoria("todos");
    setBusqueda("");
  }

  return (
    <section id="catalogo" className="scroll-mt-20 bg-[#fffff4] md:scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Encabezado editorial */}
        <p className="text-sm font-semibold uppercase tracking-widest text-[#a6caeb]">
          Catálogo Timelux
        </p>
        <h2 className="mt-2 font-serif text-3xl text-[#141416] sm:text-4xl">
          Fragancias que dejan huella
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[#5e626e] sm:text-base">
          Explorá nuestra selección de perfumería árabe y de diseñador.
          Filtrá por categoría o buscá por nombre, marca o nota olfativa.
        </p>

        {/* Barra de controles: buscador y filtros */}
        <div className="mt-8 flex flex-col gap-4">
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
              ): void => setBusqueda(evento.target.value)
              }
              placeholder="Buscar por nombre, marca o nota…"
              aria-label="Buscar perfumes por nombre, marca o nota olfativa"
              className="min-h-[44px] w-full rounded-full border border-[#a6caeb]/40 bg-white/90 py-3 pl-11 pr-4 text-sm text-[#141416] placeholder:text-[#5e626e] focus:border-[#c40a0a]/50 focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/20"
            />
          </div>

          <div
            role="tablist"
            aria-label="Filtrar perfumes por categoría"
            className="flex gap-2 overflow-x-auto pb-2"
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
                  className={`min-h-[44px] whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activa
                      ? "bg-[#c40a0a] text-[#fffff4]"
                      : "border border-[#a6caeb]/40 bg-[#a6caeb]/20 text-[#141416] hover:bg-[#a6caeb]/40"
                  }`}
                >
                  {pestana.etiqueta}
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="text-sm text-[#5e626e]">
            Mostrando {fraganciasFiltradas.length} de {perfumes.length}{" "}
            {perfumes.length === 1 ? "fragancia" : "fragancias"}
          </p>
        </div>

        {/* Grilla de tarjetas */}
        {fraganciasFiltradas.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {fraganciasFiltradas.map((perfume: Perfume) => (
              <li key={perfume.id} className="h-full">
                <TarjetaPerfume perfume={perfume} />
              </li>
            ))}
          </ul>
        ) : (
          /* Estado vacío sin coincidencias */
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-[#a6caeb]/30 bg-white/90 px-6 py-12 text-center">
            <SearchX
              aria-hidden="true"
              className="h-10 w-10 text-[#a6caeb]"
            />
            <h3 className="mt-4 text-lg font-bold text-[#141416]">
              Sin coincidencias por ahora
            </h3>
            <p className="mt-2 max-w-md text-sm text-[#5e626e]">
              No encontramos fragancias con esos filtros. Probá con otro
              nombre, marca o nota, o limpiá la búsqueda para ver todo el
              catálogo.
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

        {/* Enlace destacado al catálogo completo */}
        {mostrarEnlaceCatalogo && (
          <div className="mt-10 flex justify-center">
            <Link
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#c40a0a] px-8 py-3.5 font-medium text-white shadow-md transition-all duration-300 hover:bg-[#a30808] hover:shadow-lg"
              href="/perfumes"
            >
              Explorar catálogo completo ({perfumes.length} fragancias)
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
