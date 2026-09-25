'use client';

// Sección interactiva del catálogo de fragancias Timelux.
// Client Component porque gestiona búsqueda y filtros por categoría.

import { useMemo, useState } from "react";
import { MessageCircle, Search, SearchX } from "lucide-react";
import { perfumes } from "@/src/data/perfumes";
import { getWhatsAppLink } from "@/src/config/site";
import type { CategoriaPerfume, Perfume } from "@/src/types/perfume";

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

// Etiqueta legible del tipo de perfume.
function etiquetaTipo(tipo: Perfume["tipo"]): string {
  return tipo === "arabe" ? "Árabe" : "Diseñador";
}

// Catálogo con buscador reactivo, filtros y consulta individual por WhatsApp.
export default function Catalog(): React.JSX.Element {
  // Categoría activa y texto de búsqueda.
  const [categoria, setCategoria] = useState<CategoriaPerfume>("todos");
  const [busqueda, setBusqueda] = useState<string>("");

  // Fragancias filtradas por categoría y búsqueda (nombre, marca o notas).
  const fraganciasFiltradas: Perfume[] = useMemo(() => {
    const texto: string = busqueda.toLowerCase().trim();

    return perfumes.filter((perfume: Perfume) => {
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
  }, [categoria, busqueda]);

  // Restablece búsqueda y categoría al estado inicial.
  function limpiarFiltros(): void {
    setCategoria("todos");
    setBusqueda("");
  }

  return (
    <section id="catalogo" className="bg-[#fffff4]">
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
            {fraganciasFiltradas.length === 1
              ? "1 fragancia disponible"
              : `${fraganciasFiltradas.length} fragancias disponibles`}
          </p>
        </div>

        {/* Grilla de tarjetas */}
        {fraganciasFiltradas.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {fraganciasFiltradas.map((perfume: Perfume) => (
              <li key={perfume.id} className="h-full">
                <article className="flex h-full flex-col justify-between rounded-2xl border border-[#a6caeb]/30 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:border-[#c40a0a]/40 hover:shadow-xl">
                  <div>
                    {/* Insignias de categoría y bestseller */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#a6caeb]/30 px-2.5 py-1 text-xs font-semibold text-[#141416]">
                        {etiquetaTipo(perfume.tipo)}
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

                    {/* Notas olfativas clave */}
                    <ul
                      aria-label={`Notas de salida de ${perfume.nombre}`}
                      className="mt-3 flex flex-wrap gap-1.5"
                    >
                      {perfume.notas.salida
                        .slice(0, 3)
                        .map((nota: string) => (
                          <li
                            key={nota}
                            className="rounded-md border border-[#a6caeb]/30 bg-[#a6caeb]/15 px-2 py-0.5 text-xs uppercase tracking-wider text-[#141416]"
                          >
                            {nota}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Consulta individual por WhatsApp */}
                  <a
                    href={getWhatsAppLink(
                      `¡Hola Timelux! Me interesa el perfume ${perfume.nombre} de ${perfume.marca}. ¿Tienen disponibilidad y precio?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar ${perfume.nombre} de ${perfume.marca} por WhatsApp`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c40a0a] px-4 py-2.5 text-sm font-medium text-[#fffff4] transition-colors hover:bg-[#a30808]"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    Consultar
                  </a>
                </article>
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
      </div>
    </section>
  );
}
