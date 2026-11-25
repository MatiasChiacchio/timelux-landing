'use client';

// Selector de ordenamiento para el catálogo de Timelux.
// Client Component accesible con estética Warm Ivory coherente con ComboboxMarcas.

import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";

// Criterios disponibles para ordenar el catálogo.
export type OrdenCatalogo =
  | "destacados"
  | "precio-asc"
  | "precio-desc"
  | "nombre-asc";

// Opción visible del selector de ordenamiento.
export interface OpcionOrden {
  valor: OrdenCatalogo;
  etiqueta: string;
}

interface PropiedadesSelectorOrden {
  opciones: OpcionOrden[];
  ordenSeleccionado: OrdenCatalogo;
  alCambiarOrden: (valor: OrdenCatalogo) => void;
}

// Desplegable accesible sin controles nativos dispares, con soporte de Escape y teclado.
export default function SelectorOrden({
  opciones,
  ordenSeleccionado,
  alCambiarOrden,
}: PropiedadesSelectorOrden): React.JSX.Element {
  const [abierto, setAbierto] = useState<boolean>(false);
  const [indiceActivo, setIndiceActivo] = useState<number>(0);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const focoPendiente = useRef<number | null>(null);

  const etiquetaActiva: string =
    opciones.find((opcion) => opcion.valor === ordenSeleccionado)?.etiqueta ??
    opciones[0]?.etiqueta ??
    "Ordenar";

  function indiceSeleccionado(): number {
    const pos: number = opciones.findIndex(
      (opcion) => opcion.valor === ordenSeleccionado,
    );
    return pos >= 0 ? pos : 0;
  }

  function enfocarOpcion(indice: number): void {
    contenedorRef.current
      ?.querySelector<HTMLButtonElement>(`#orden-opcion-${indice}`)
      ?.focus();
  }

  useEffect(() => {
    if (abierto && focoPendiente.current !== null) {
      const indice: number = focoPendiente.current;
      focoPendiente.current = null;
      enfocarOpcion(indice);
    }
  }, [abierto]);

  useEffect(() => {
    if (!abierto) {
      return;
    }

    function manejarPuntero(evento: PointerEvent): void {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(evento.target as Node)
      ) {
        setAbierto(false);
      }
    }

    document.addEventListener("pointerdown", manejarPuntero);

    return (): void => {
      document.removeEventListener("pointerdown", manejarPuntero);
    };
  }, [abierto]);

  function abrirMenu(conFoco: boolean, indice: number): void {
    setIndiceActivo(indice);
    focoPendiente.current = conFoco ? indice : null;
    setAbierto(true);
  }

  function alternarMenu(): void {
    if (abierto) {
      setAbierto(false);
    } else {
      abrirMenu(false, indiceSeleccionado());
    }
  }

  function moverFoco(indice: number): void {
    const total: number = opciones.length;
    const normalizado: number = ((indice % total) + total) % total;
    setIndiceActivo(normalizado);
    enfocarOpcion(normalizado);
  }

  function elegirOrden(valor: OrdenCatalogo): void {
    alCambiarOrden(valor);
    setAbierto(false);
    botonRef.current?.focus();
  }

  function manejarTeclaBoton(evento: React.KeyboardEvent): void {
    if (
      evento.key === "ArrowDown" ||
      evento.key === "ArrowUp" ||
      evento.key === "Enter"
    ) {
      evento.preventDefault();
      abrirMenu(true, indiceSeleccionado());
    }
  }

  function manejarTeclaLista(evento: React.KeyboardEvent): void {
    if (evento.key === "Escape") {
      setAbierto(false);
      botonRef.current?.focus();
    } else if (evento.key === "ArrowDown") {
      evento.preventDefault();
      moverFoco(indiceActivo + 1);
    } else if (evento.key === "ArrowUp") {
      evento.preventDefault();
      moverFoco(indiceActivo - 1);
    } else if (evento.key === "Home") {
      evento.preventDefault();
      moverFoco(0);
    } else if (evento.key === "End") {
      evento.preventDefault();
      moverFoco(opciones.length - 1);
    } else if (evento.key === "Tab") {
      setAbierto(false);
    }
  }

  return (
    <div ref={contenedorRef} className="relative w-full">
      <button
        ref={botonRef}
        type="button"
        onClick={alternarMenu}
        onKeyDown={manejarTeclaBoton}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls="lista-orden-catalogo"
        aria-label="Ordenar fragancias"
        className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-[#a6caeb]/45 bg-white px-3.5 py-2.5 text-sm font-medium text-[#141416] shadow-sm transition-colors hover:border-[#a6caeb] focus:border-[#c40a0a] focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/60"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <ArrowUpDown
            aria-hidden="true"
            size={16}
            className="shrink-0 text-[#5e626e]"
          />
          <span className="truncate">{etiquetaActiva}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          size={17}
          className={`shrink-0 text-[#5e626e] transition-transform duration-300 ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id="lista-orden-catalogo"
        role="listbox"
        aria-label="Opciones de ordenamiento"
        onKeyDown={manejarTeclaLista}
        className={`absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#a6caeb]/30 bg-white py-1.5 shadow-xl transition-all duration-200 ease-out ${
          abierto
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        {opciones.map((opcion: OpcionOrden, indice: number) => {
          const seleccionada: boolean = ordenSeleccionado === opcion.valor;
          const activo: boolean = indice === indiceActivo;
          return (
            <button
              key={opcion.valor}
              id={`orden-opcion-${indice}`}
              type="button"
              role="option"
              aria-selected={seleccionada}
              onClick={(): void => elegirOrden(opcion.valor)}
              onMouseEnter={(): void => setIndiceActivo(indice)}
              onFocus={(): void => setIndiceActivo(indice)}
              tabIndex={abierto ? 0 : -1}
              className={`flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#a6caeb]/10 hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c40a0a] ${
                seleccionada
                  ? "bg-[#c40a0a]/5 font-semibold text-[#c40a0a]"
                  : activo
                    ? "bg-[#a6caeb]/15 text-[#c40a0a]"
                    : "text-[#141416]"
              }`}
            >
              <span className="truncate">{opcion.etiqueta}</span>
              {seleccionada ? (
                <Check size={16} aria-hidden="true" className="shrink-0" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
