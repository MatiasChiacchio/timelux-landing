'use client';

// Barra de navegación institucional de Timelux sobre rojo insignia.
// Client Component porque gestiona el menú móvil, cierre con Escape y ruta activa.

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/src/config/site";

// Navegación principal limpia con los 4 apartados del sitio.
export default function Navbar(): React.JSX.Element {
  const rutaActual: string = usePathname();
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
  const encabezadoRef = useRef<HTMLElement>(null);

  function alternarMenu(): void {
    setMenuAbierto((previo: boolean) => !previo);
  }

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
      className="sticky top-0 z-50 w-full border-b border-[#a30808] bg-[#c40a0a] shadow-md"
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8"
      >
        {/* Logotipo recortado a su proporción real (261×107) */}
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

        {/* Navegación horizontal para escritorio */}
        <ul className="hidden items-center gap-7 text-sm font-medium tracking-wide text-[#fffff4] md:flex lg:gap-9">
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
                  className={`relative inline-flex min-h-[44px] items-center rounded-md px-1 transition-opacity duration-200 after:absolute after:bottom-2.5 after:left-0 after:h-[1.5px] after:w-full after:origin-center after:bg-[#fffff4] after:transition-transform after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a] ${
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

        {/* Botón hamburguesa para celulares */}
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

      {/* Menú desplegable móvil */}
      <div
        id="menu-movil-navegacion"
        aria-hidden={!menuAbierto}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          menuAbierto
            ? "grid-rows-[1fr] border-t border-[#a30808] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
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
          </ul>
        </div>
      </div>
    </header>
  );
}
