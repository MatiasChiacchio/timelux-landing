'use client';

// Selector de marcas con desplegable personalizado y animado.
// Client Component porque gestiona apertura, selección y navegación por teclado.

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

// Propiedades: marcas únicas, valor activo y notificación de cambio.
interface PropiedadesComboboxMarcas {
  marcas: string[];
  marcaSeleccionada: string;
  alSeleccionarMarca: (marca: string) => void;
}

// Valor y etiqueta de la opción que muestra todas las marcas.
const VALOR_TODAS: string = "todas";

// Desplegable accesible con animación de entrada y salida.
export default function ComboboxMarcas({
  marcas,
  marcaSeleccionada,
  alSeleccionarMarca,
}: PropiedadesComboboxMarcas): React.JSX.Element {
  // Apertura del menú e índice resaltado para el teclado.
  const [abierto, setAbierto] = useState<boolean>(false);
  const [indiceActivo, setIndiceActivo] = useState<number>(0);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const focoPendiente = useRef<number | null>(null);

  // Cantidad total de opciones incluyendo "Todas las marcas".
  const totalOpciones: number = marcas.length + 1;

  // Etiqueta visible del valor actualmente seleccionado.
  const etiquetaSeleccionada: string =
    marcaSeleccionada === VALOR_TODAS
      ? "Todas las marcas"
      : marcaSeleccionada;

  // Índice de la opción actualmente seleccionada.
  function indiceSeleccionado(): number {
    if (marcaSeleccionada === VALOR_TODAS) {
      return 0;
    }
    const posicion: number = marcas.indexOf(marcaSeleccionada);
    return posicion >= 0 ? posicion + 1 : 0;
  }

  // Lleva el foco a una opción cuando el menú termina de abrirse.
  useEffect(() => {
    if (abierto && focoPendiente.current !== null) {
      const indice: number = focoPendiente.current;
      focoPendiente.current = null;
      enfocarOpcion(indice);
    }
  }, [abierto]);

  // Cierra el menú al hacer clic fuera del componente.
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

  // Abre el menú, con foco opcional en una opción.
  function abrirMenu(conFoco: boolean, indice: number): void {
    setIndiceActivo(indice);
    focoPendiente.current = conFoco ? indice : null;
    setAbierto(true);
  }

  // Alterna el menú desde el botón disparador.
  function alternarMenu(): void {
    if (abierto) {
      setAbierto(false);
    } else {
      abrirMenu(false, indiceSeleccionado());
    }
  }

  // Lleva el foco del teclado a una opción dentro del menú abierto.
  function enfocarOpcion(indice: number): void {
    contenedorRef.current
      ?.querySelector<HTMLButtonElement>(`#marca-opcion-${indice}`)
      ?.focus();
  }

  // Mueve el resaltado y el foco entre opciones abiertas.
  function moverFoco(indice: number): void {
    const normalizado: number =
      ((indice % totalOpciones) + totalOpciones) % totalOpciones;
    setIndiceActivo(normalizado);
    enfocarOpcion(normalizado);
  }

  // Elige una marca, notifica el cambio y devuelve el foco al botón.
  function elegirMarca(marca: string): void {
    alSeleccionarMarca(marca);
    setAbierto(false);
    botonRef.current?.focus();
  }

  // Cierra con Escape y devuelve el foco al botón disparador.
  function cerrarConEscape(): void {
    setAbierto(false);
    botonRef.current?.focus();
  }

  // Atajos del botón: flechas y Enter abren el menú con foco en la lista.
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

  // Navegación dentro de la lista abierta: flechas, Inicio, Fin y Escape.
  function manejarTeclaLista(evento: React.KeyboardEvent): void {
    if (evento.key === "Escape") {
      cerrarConEscape();
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
      moverFoco(totalOpciones - 1);
    } else if (evento.key === "Tab") {
      setAbierto(false);
    }
  }

  // Clases de una opción según resaltado y selección.
  function clasesOpcion(indice: number, seleccionada: boolean): string {
    const base: string =
      "flex min-h-[44px] w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c40a0a]/30";

    if (seleccionada) {
      return `${base} bg-[#c40a0a]/5 font-semibold text-[#c40a0a]`;
    }

    if (indice === indiceActivo) {
      return `${base} bg-neutral-50 text-[#c40a0a]`;
    }

    return `${base} text-neutral-800`;
  }

  return (
    <div ref={contenedorRef} className="relative sm:w-60 sm:shrink-0">
      {/* Botón disparador con la marca activa */}
      <button
        ref={botonRef}
        type="button"
        onClick={alternarMenu}
        onKeyDown={manejarTeclaBoton}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls="lista-marcas"
        aria-label="Filtrar perfumes por marca"
        className="flex min-h-[44px] w-full min-w-[200px] items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 shadow-sm transition-colors hover:border-neutral-300 focus:border-[#c40a0a]/50 focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/20"
      >
        <span className="truncate">{etiquetaSeleccionada}</span>
        <ChevronDown
          aria-hidden="true"
          size={18}
          className={`shrink-0 text-neutral-500 transition-transform duration-300 ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú flotante siempre montado para animar entrada y salida */}
      <div
        id="lista-marcas"
        role="listbox"
        aria-label="Marcas disponibles"
        onKeyDown={manejarTeclaLista}
        className={`desplegable-marcas absolute left-0 z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-neutral-100 bg-white py-1.5 shadow-xl transition-all duration-200 ease-out ${
          abierto
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <button
          id="marca-opcion-0"
          type="button"
          role="option"
          aria-selected={marcaSeleccionada === VALOR_TODAS}
          onClick={(): void => elegirMarca(VALOR_TODAS)}
          onMouseEnter={(): void => setIndiceActivo(0)}
          onFocus={(): void => setIndiceActivo(0)}
          tabIndex={abierto ? 0 : -1}
          className={clasesOpcion(0, marcaSeleccionada === VALOR_TODAS)}
        >
          <span>Todas las marcas</span>
          {marcaSeleccionada === VALOR_TODAS && (
            <Check size={16} aria-hidden="true" className="shrink-0" />
          )}
        </button>

        {marcas.map((nombreMarca: string, posicion: number) => {
          const indice: number = posicion + 1;
          const seleccionada: boolean = marcaSeleccionada === nombreMarca;
          return (
            <button
              key={nombreMarca}
              id={`marca-opcion-${indice}`}
              type="button"
              role="option"
              aria-selected={seleccionada}
              onClick={(): void => elegirMarca(nombreMarca)}
              onMouseEnter={(): void => setIndiceActivo(indice)}
              onFocus={(): void => setIndiceActivo(indice)}
              tabIndex={abierto ? 0 : -1}
              className={clasesOpcion(indice, seleccionada)}
            >
              <span className="truncate">{nombreMarca}</span>
              {seleccionada && (
                <Check size={16} aria-hidden="true" className="shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
