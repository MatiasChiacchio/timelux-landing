'use client';

// Barra de navegación institucional de Timelux sobre rojo insignia.
// Client Component porque gestiona el estado del menú móvil.

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/src/config/site";

// Navegación principal persistente sin CTA (la conversión vive en el botón flotante).
export default function Navbar(): React.JSX.Element {
  // Estado de apertura del menú móvil.
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);

  // Alterna la visibilidad del menú en celulares.
  function alternarMenu(): void {
    setMenuAbierto((previo: boolean) => !previo);
  }

  // Cierra el menú al navegar hacia una sección.
  function cerrarMenu(): void {
    setMenuAbierto(false);
  }

  // Lleva al inicio con scroll suave nativo (Next.js puede tragarse el
  // hash cuando ya estamos en la raíz, por eso se fuerza el desplazamiento).
  function manejarClicLogo(evento: MouseEvent<HTMLAnchorElement>): void {
    cerrarMenu();
    if (window.location.pathname === "/") {
      evento.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Limpia el hash sin romper el historial del navegador.
      window.history.pushState(null, "", "/");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#a30808] bg-[#c40a0a] shadow-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8"
      >
        {/* Logotipo unificado blanco con retorno al inicio */}
        <Link
          href="/"
          onClick={manejarClicLogo}
          aria-label="Ir al inicio - Timelux"
          className="flex shrink-0 cursor-pointer items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/Timelux_Blanco-sinFondo.png"
            alt="Timelux Perfumes"
            width={190}
            height={48}
            priority
            className="h-auto w-36 object-contain sm:w-44 md:w-48"
          />
        </Link>

        {/* Navegación horizontal para escritorio, alineada a la derecha */}
        <ul className="hidden items-center gap-7 text-sm font-medium tracking-wide text-white md:flex lg:gap-9 lg:text-base">
          {navLinks.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                className="transition-opacity hover:opacity-80"
              >
                {enlace.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa para celulares con objetivo táctil accesible */}
        <button
          type="button"
          onClick={alternarMenu}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil-navegacion"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 hover:text-white/80 md:hidden"
        >
          {menuAbierto ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Menú desplegable móvil sobre rojo institucional */}
      {menuAbierto && (
        <div
          id="menu-movil-navegacion"
          className="border-t border-[#a30808] bg-[#c40a0a] md:hidden"
        >
          <ul className="space-y-1 px-4 pb-6 pt-3">
            {navLinks.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  onClick={cerrarMenu}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10 hover:text-white/80"
                >
                  {enlace.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
