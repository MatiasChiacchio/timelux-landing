// Pie de página institucional de Timelux sobre rojo insignia.
// Server Component compacto en 3 columnas con navegación y medios de contacto.

import Image from "next/image";
import Link from "next/link";
import { Clock, MessageCircle } from "lucide-react";
import IconoInstagram from "@/src/components/ui/IconoInstagram";
import {
  getWhatsAppLink,
  instagramHandle,
  instagramUrl,
  mensajePredeterminadoWhatsApp,
  name,
  navLinks,
} from "@/src/config/site";

// Teléfono visible en la línea principal de WhatsApp.
const telefonoVisible: string = "+54 370 4772001";

// Contacto, navegación y cierre institucional.
export default function Footer(): React.JSX.Element {
  const anioActual: number = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="scroll-mt-20 border-t border-[#a30808] bg-[#c40a0a] px-4 pb-24 pt-12 text-[#fffff4] sm:px-6 sm:py-12 md:scroll-mt-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Columna 1: marca */}
          <div>
            <Link
              href="/"
              aria-label={`${name} - Volver al inicio`}
              className="inline-flex min-h-[44px] items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a]"
            >
              <Image
                src="/logo-timelux-blanco.png"
                alt={`Logotipo de ${name}`}
                width={261}
                height={107}
                className="mb-3 h-11 w-auto object-contain"
              />
            </Link>
            <p className="font-serif text-lg font-medium italic text-[#fffff4]">
              Más que una fragancia, tu esencia.
            </p>
          </div>

          {/* Columna 2: navegación rápida */}
          <nav aria-label="Navegación del pie de página">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fffff4]/90">
              Explorar
            </p>
            <ul className="mt-3 space-y-0.5">
              {navLinks.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    className="inline-flex min-h-[44px] items-center rounded-md px-1 text-sm text-[#fffff4] transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a]"
                  >
                    {enlace.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna 3: contacto y atención */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fffff4]/90">
              Contacto
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={getWhatsAppLink(mensajePredeterminadoWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar a Timelux por WhatsApp"
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-md px-1 font-semibold leading-snug text-[#fffff4] transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a]"
                >
                  <MessageCircle
                    size={16}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                  WhatsApp: {telefonoVisible}
                </a>
              </li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Timelux en Instagram"
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-md px-1 leading-snug text-[#fffff4]/90 transition-opacity duration-200 hover:text-[#fffff4] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c40a0a]"
                >
                  <IconoInstagram size={16} className="shrink-0" />
                  {instagramHandle}
                </a>
              </li>
              <li className="flex items-start gap-2.5 px-1 pt-1 leading-snug text-[#fffff4]/90">
                <Clock
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
                <p>Lunes a sábado, de 9 a 20 h.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior con derechos y resguardo para el botón flotante */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[#fffff4]/20 pt-6 text-center text-xs text-[#fffff4]/80 sm:flex-row sm:pr-20 sm:text-left">
          <p>© {anioActual} Timelux. Todos los derechos reservados.</p>
          <p>Perfumería Árabe &amp; Diseñador</p>
        </div>
      </div>
    </footer>
  );
}
