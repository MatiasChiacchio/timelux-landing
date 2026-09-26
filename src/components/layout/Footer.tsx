// Pie de página con contacto y navegación de Timelux.
// Server Component: contenido estático con enlaces y CTA a WhatsApp.

import Image from "next/image";
import { Clock, MessageCircle, Phone, Zap } from "lucide-react";
import {
  getWhatsAppLink,
  mensajePredeterminadoWhatsApp,
  name,
  navLinks,
} from "@/src/config/site";

// Teléfono visible y enlace tel: con el número saneado.
const telefonoVisible: string = "+54 370 4772001";
const telefonoEnlace: string = "tel:+5493704772001";

// Contacto, navegación y cierre institucional de la landing.
export default function Footer(): React.JSX.Element {
  // Año actual para el aviso de derechos.
  const anioActual: number = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="mt-12 scroll-mt-20 border-t border-[#a6caeb]/20 bg-[#141416] px-4 py-14 text-[#fffff4] sm:px-6 md:scroll-mt-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Columna de marca con contacto directo */}
          <div>
            <a href="#hero" aria-label={`${name} - Volver al inicio`}>
              <Image
                src="/logo.png"
                alt={`Logotipo de ${name}`}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            </a>
            <p className="mt-4 text-lg font-bold tracking-tight">{name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#fffff4]/70">
              Curaduría de perfumería árabe y de diseñador. Piezas originales
              con asesoramiento personalizado por WhatsApp.
            </p>
            <a
              href={getWhatsAppLink(mensajePredeterminadoWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar a Timelux por WhatsApp"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#c40a0a] px-5 py-2.5 text-sm font-medium text-[#fffff4] transition-colors duration-200 hover:bg-[#a30808]"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Contactar por WhatsApp
            </a>
          </div>

          {/* Columna de navegación por secciones */}
          <nav aria-label="Navegación del pie de página">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a6caeb]">
              Secciones
            </p>
            <ul className="mt-4 space-y-1">
              {navLinks.map((enlace) => (
                <li key={enlace.href}>
                  <a
                    href={enlace.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-[#fffff4]/80 transition-colors hover:text-[#fffff4]"
                  >
                    {enlace.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna de atención y contacto */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a6caeb]">
              Atención y contacto
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={telefonoEnlace}
                  className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#fffff4] transition-colors hover:text-[#a6caeb]"
                >
                  <Phone size={16} aria-hidden="true" />
                  {telefonoVisible}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#fffff4]/80">
                <Clock
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
                <span>
                  Atención por WhatsApp de lunes a sábado, de 9 a 20 h.
                </span>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a6caeb]/40 bg-[#a6caeb]/15 px-3 py-1 text-xs font-semibold text-[#fffff4]">
                  <Zap size={14} aria-hidden="true" />
                  Respuesta rápida
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior con derechos y créditos */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-[#a6caeb]/20 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[#fffff4]/60">
            © {anioActual} {name} · Perfumería árabe y de diseñador.
          </p>
          <p className="text-xs text-[#fffff4]/40">
            Vitrina digital · Consultas por WhatsApp
          </p>
        </div>
      </div>
    </footer>
  );
}
