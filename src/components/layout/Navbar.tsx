'use client';

// Barra de navegación institucional de Timelux sobre rojo insignia.
// Client Component porque gestiona el menú móvil, cierre con Escape y ruta activa.

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { getWhatsAppLink, navLinks } from "@/src/config/site";

// Navegación principal persistente con microinteracciones sutiles y foco accesible.
export default function Navbar(): React.JSX.Element {
  const rutaActual: string = usePathname();
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
  const encabezadoRef = useRef<HTMLElement>(null);

  // Alterna la visibilidad del menú en celulares.
  function alternarMenu(): void {
    setMenuAbierto((previo: boolean) => !previo);
  }

  // Cierra el menú al navegar hacia una sección.
  function cerrarMenu(): void {
    setMenuAbierto(false);
  }

  // Cierra el menú móvil con la tecla Escape o al tocar fuera del header.
  useEffect(() => {
    if (!menuAbierto) {
      return;
    }

    function manejarTecla(evento: KeyboardEvent): void {
      if (evento.key === "Escape") {
        setMenuAbierto(false);
      }
    }

    function manejarPuntero(evento: PointerEvent): void {
      if (
        encabezadoRef.current &&
        !encabezadoRef.current.contains(evento.target as Node)
      ) {
        setMenuAbierto(false);
      }
    }

    document.addEventListener("keydown", manejarTecla);
    document.addEventListener("pointerdown", manejarPuntero);

    return (): void => {
      document.removeEventListener("keydown", manejarTecla);
      document.removeEventListener("pointerdown", manejarPuntero);
    };
  }, [menuAbierto]);

  // Lleva al inicio con scroll suave nativo cuando ya estamos en la portada.
  function manejarClicLogo(evento: MouseEvent<HTMLAnchorElement>): void {
    cerrarMenu();
    if (window.location.pathname === "/") {
      evento.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  }

  return (
    <header
      ref={encabezadoRef}
      className="sticky top-0 z-50 w-full border-b border-[#a30808]/90 bg-[#c40a0a]/95 shadow-md backdrop-blur-md"
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8"
      >
        {/* Logotipo recortado a su proporción real (261×107) para evitar desborde */}
        <Link
          href="/"
          onClick={manejarClicLogo}
          aria-label="Ir al inicio - Timelux"
          className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center rounded-lg px-1 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a]"
        >
          <Image
            src="/logo-timelux-blanco.png"
            alt="Timelux Perfumes"
            width={261}
            height={107}
            priority
            className="h-9 w-auto object-contain sm:h-11"
          />
        </Link>

        {/* Navegación horizontal para escritorio con subrayado animado */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          <ul className="flex items-center gap-6 text-sm font-medium tracking-wide text-[#fffff4] lg:gap-8">
            {navLinks.map((enlace) => {
              const esRutaActiva: boolean =
                enlace.href === "/"
                  ? rutaActual === "/"
                  : rutaActual === enlace.href;

              return (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    aria-current={esRutaActiva ? "page" : undefined}
                    className={`relative inline-flex min-h-[44px] items-center px-1 transition-opacity duration-200 after:absolute after:bottom-2.5 after:left-0 after:h-[1.5px] after:w-full after:origin-center after:bg-[#fffff4] after:transition-transform after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a] rounded-md ${
                      esRutaActiva
                        ? "font-semibold after:scale-x-100"
                        : "text-[#fffff4]/90 hover:text-[#fffff4] after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {enlace.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Acceso directo de asesoría en escritorio */}
          <a
            href={getWhatsAppLink(
              "¡Hola Timelux! Quiero asesoramiento para elegir una fragancia.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#fffff4]/35 bg-[#fffff4]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#fffff4] transition-all duration-300 hover:border-[#fffff4] hover:bg-[#fffff4] hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a]"
          >
            <MessageCircle size={15} aria-hidden="true" />
            Asesoría
          </a>
        </div>

        {/* Botón hamburguesa para celulares con objetivo táctil accesible */}
        <button
          type="button"
          onClick={alternarMenu}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil-navegacion"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#fffff4] transition-colors duration-200 hover:bg-[#fffff4]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a] md:hidden"
        >
          {menuAbierto ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Menú desplegable móvil con transición fluida CSS Grid */}
      <div
        id="menu-movil-navegacion"
        aria-hidden={!menuAbierto}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          menuAbierto
            ? "grid-rows-[1fr] opacity-100 border-t border-[#a30808]"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden bg-[#c40a0a]">
          <ul className="space-y-1 px-4 pb-5 pt-3">
            {navLinks.map((enlace) => {
              const esRutaActiva: boolean =
                enlace.href === "/"
                  ? rutaActual === "/"
                  : rutaActual === enlace.href;

              return (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    onClick={cerrarMenu}
                    tabIndex={menuAbierto ? 0 : -1}
                    aria-current={esRutaActiva ? "page" : undefined}
                    className={`flex min-h-[44px] items-center rounded-xl px-4 py-2.5 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#fffff4] ${
                      esRutaActiva
                        ? "bg-[#fffff4]/15 font-semibold text-[#fffff4]"
                        : "text-[#fffff4]/90 hover:bg-[#fffff4]/10 hover:text-[#fffff4]"
                    }`}
                  >
                    {enlace.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href={getWhatsAppLink(
                  "¡Hola Timelux! Quiero asesoramiento para elegir una fragancia.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={menuAbierto ? 0 : -1}
                onClick={cerrarMenu}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#fffff4] px-4 py-2.5 text-sm font-semibold text-[#c40a0a] shadow-sm transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Asesoría por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
