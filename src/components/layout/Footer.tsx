// Pie de página institucional de Timelux sobre rojo insignia.
// Server Component: contenido estático con enlaces y contacto.

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import IconoInstagram from "@/src/components/ui/IconoInstagram";
import {
  getWhatsAppLink,
  mensajePredeterminadoWhatsApp,
  name,
  navLinks,
} from "@/src/config/site";

// Teléfono visible en la línea principal de WhatsApp.
const telefonoVisible: string = "+54 370 4772001";

// Contacto, navegación y cierre institucional de la landing.
export default function Footer(): React.JSX.Element {
  // Año actual para el aviso de derechos.
  const anioActual: number = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="scroll-mt-20 border-t border-[#a30808] bg-[#c40a0a] px-4 py-14 text-white sm:px-6 sm:py-16 md:scroll-mt-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: marca con logo blanco */}
          <div>
            <Link href="/#hero" aria-label={`${name} - Volver al inicio`}>
              <Image
                src="/logo-sinFondo.png"
                alt={`Logotipo de ${name}`}
                width={400}
                height={120}
                className="mb-4 h-auto w-36 object-contain md:w-40"
              />
            </Link>
            <p className="text-base font-semibold italic">
              Más que una fragancia, tu esencia.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
              Curaduría exclusiva de fragancias árabes y perfumes de autor 100%
              originales.
            </p>
          </div>

          {/* Columna 2: navegación rápida */}
          <nav aria-label="Navegación del pie de página">
            <p className="text-sm font-semibold uppercase tracking-widest">
              Explorar
            </p>
            <ul className="mt-4 space-y-1">
              {navLinks
                .filter((enlace) => enlace.href !== "/#contacto")
                .map((enlace) => (
                  <li key={enlace.href}>
                    <a
                      href={enlace.href}
                      className="inline-flex min-h-[44px] items-center text-sm text-white transition-opacity hover:opacity-75"
                    >
                      {enlace.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Columna 3: contacto y atención */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest">
              Atención &amp; Ventas
            </p>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a
                  href={getWhatsAppLink(mensajePredeterminadoWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar a Timelux por WhatsApp"
                  className="inline-flex min-h-[44px] items-center gap-3 font-semibold leading-snug text-white transition-opacity hover:opacity-75"
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
                  href="https://www.instagram.com/timelux.perfumes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Timelux en Instagram"
                  className="inline-flex min-h-[44px] items-center gap-3 leading-snug text-white/90 transition-opacity hover:opacity-75"
                >
                  <IconoInstagram size={16} className="shrink-0" />
                  @timelux.perfumes
                </a>
              </li>
              <li className="flex items-start gap-3 leading-snug text-white/90">
                <Clock
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
                <p>
                  Atención por WhatsApp de lunes a sábado, de 9 a 20 h.
                </p>
              </li>
            </ul>
          </div>

          {/* Columna 4: envíos y garantía */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest">
              Compromiso Timelux
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <Truck
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
                <span>Envíos a toda la Argentina.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
                <span>
                  Piezas selladas en origen con garantía de autenticidad.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior con derechos */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-8 text-center text-xs text-white/70 sm:flex-row sm:text-left">
          <p>© {anioActual} Timelux. Todos los derechos reservados.</p>
          <p>Perfumería Árabe &amp; Diseñador</p>
        </div>
      </div>
    </footer>
  );
}
