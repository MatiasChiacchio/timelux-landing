// Apartado unificado "Preguntas y Contacto" de Timelux.
// Server Component estático: acordeón claro + bloque directo con los medios de contacto.

import type { Metadata } from "next";
import { Clock, MessageCircle } from "lucide-react";
import CabeceraSeccion from "@/src/components/layout/CabeceraSeccion";
import Faq from "@/src/components/sections/Faq";
import JsonLd from "@/src/components/seo/JsonLd";
import IconoInstagram from "@/src/components/ui/IconoInstagram";
import {
  baseUrl,
  getWhatsAppLink,
  instagramHandle,
  instagramUrl,
  mensajePredeterminadoWhatsApp,
} from "@/src/config/site";
import { crearBreadcrumbSchema, crearGrafo } from "@/src/lib/schema";

// Teléfono visible institucional.
const telefonoVisible: string = "+54 370 4772001";

// Metadatos SEO propios para /preguntas.
export const metadata: Metadata = {
  title: "Preguntas y Contacto",
  description:
    "Resolvé tus dudas sobre pedidos, medios de pago y envíos por Correo Argentino. Si te queda alguna consulta, contactanos por WhatsApp o Instagram.",
  alternates: {
    canonical: "/preguntas",
  },
  openGraph: {
    url: "/preguntas",
    title: "Preguntas y Contacto | Timelux",
    description:
      "Información clara sobre pedidos, formas de pago, envíos y canales directos de contacto por WhatsApp e Instagram.",
  },
};

// Grafo de migas de pan de /preguntas (sin FAQPage para evitar rich results retirados).
const datosEstructurales = crearGrafo([
  crearBreadcrumbSchema(
    [
      { nombre: "Inicio", url: baseUrl },
      { nombre: "Preguntas y Contacto", url: `${baseUrl}/preguntas` },
    ],
    `${baseUrl}/preguntas#breadcrumb`,
  ),
]);

// Página unificada de preguntas frecuentes y medios de contacto.
export default function PaginaPreguntas(): React.JSX.Element {
  return (
    <main className="flex-1 bg-[#fffff4]">
      <CabeceraSeccion
        etiquetaBreadcrumb="Preguntas"
        eyebrow="Ayuda & Contacto"
        titulo="Preguntas frecuentes"
        descripcion="Todo sobre pedidos, pagos y envíos. Si te queda alguna duda, escribinos por cualquiera de nuestros medios."
      />

      {/* Acordeón limpio con las 4 preguntas frecuentes */}
      <Faq mostrarEncabezado={false} mostrarCierre={false} />

      {/* Bloque unificado de medios de contacto */}
      <section
        aria-labelledby="titulo-medios-contacto"
        className="mx-auto max-w-4xl px-4 pb-16 pt-2 sm:px-6 md:pb-20 lg:px-8"
      >
        <div className="rounded-2xl border border-[#a6caeb]/35 bg-white p-6 shadow-xs sm:p-8">
          <h2
            id="titulo-medios-contacto"
            className="font-serif text-2xl font-semibold text-[#141416] sm:text-3xl"
          >
            ¿Te quedó alguna duda?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[#5e626e] sm:text-base">
            Contactanos por el medio que te resulte más cómodo y te respondemos
            a la brevedad.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* WhatsApp directo */}
            <a
              href={getWhatsAppLink(mensajePredeterminadoWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar a Timelux por WhatsApp"
              className="group flex min-h-[44px] flex-col justify-between rounded-xl border border-[#a6caeb]/35 bg-[#fffff4] p-4 transition-colors duration-200 hover:border-[#c40a0a]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                <MessageCircle
                  size={16}
                  aria-hidden="true"
                  className="text-[#c40a0a]"
                />
                WhatsApp
              </div>
              <p className="mt-3 text-sm font-bold text-[#141416] transition-colors group-hover:text-[#c40a0a]">
                {telefonoVisible}
              </p>
              <p className="mt-1 text-xs text-[#5e626e]">
                Pedidos, stock y asesoramiento
              </p>
            </a>

            {/* Instagram oficial */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir o escribir a Timelux en Instagram"
              className="group flex min-h-[44px] flex-col justify-between rounded-xl border border-[#a6caeb]/35 bg-[#fffff4] p-4 transition-colors duration-200 hover:border-[#c40a0a]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                <IconoInstagram size={16} />
                Instagram
              </div>
              <p className="mt-3 text-sm font-bold text-[#141416] transition-colors group-hover:text-[#c40a0a]">
                {instagramHandle}
              </p>
              <p className="mt-1 text-xs text-[#5e626e]">
                Novedades y consultas por mensaje
              </p>
            </a>

            {/* Horario y cobertura */}
            <div className="flex flex-col justify-between rounded-xl border border-[#a6caeb]/35 bg-[#fffff4] p-4">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                <Clock size={16} aria-hidden="true" />
                Horarios
              </div>
              <p className="mt-3 text-sm font-bold text-[#141416]">
                Lun a sáb, 9 a 20 h
              </p>
              <p className="mt-1 text-xs text-[#5e626e]">
                Envíos a todo el país
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Datos estructurados BreadcrumbList */}
      <JsonLd datos={datosEstructurales} />
    </main>
  );
}
