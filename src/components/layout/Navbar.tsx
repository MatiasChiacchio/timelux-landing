'use client';

// Barra de navegación limpia y adaptativa de Timelux.
// Client Component porque gestiona el estado del menú móvil.

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { name, navLinks } from "@/src/config/site";

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

  return (
    <header className="sticky top-0 z-50 border-b border-[#a6caeb]/30 bg-[#fffff4]/90 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Isotipo y marca con retorno al inicio */}
        <a
          href="#hero"
          onClick={cerrarMenu}
          aria-label={`${name} - Ir al inicio`}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt={`Logotipo de ${name}`}
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-lg font-bold tracking-tight text-[#141416]">
            {name}
          </span>
        </a>

        {/* Navegación horizontal para escritorio, alineada a la derecha */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                className="tracking-wide text-sm font-medium text-[#141416] transition-colors hover:text-[#c40a0a]"
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
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#141416] transition-colors hover:bg-[#a6caeb]/20 hover:text-[#c40a0a] md:hidden"
        >
          {menuAbierto ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Menú desplegable móvil con solo enlaces de sección */}
      {menuAbierto && (
        <div
          id="menu-movil-navegacion"
          className="border-t border-[#a6caeb]/30 bg-[#fffff4]/95 backdrop-blur-md md:hidden"
        >
          <ul className="space-y-1 px-4 pb-6 pt-3">
            {navLinks.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  onClick={cerrarMenu}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-[#141416] transition-colors hover:bg-[#a6caeb]/20 hover:text-[#c40a0a]"
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
