// Apartado "Contacto & Asesoría" de Timelux.
// Server Component estático con canales oficiales y asistente interactivo hacia WhatsApp.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, MessageCircle, Truck } from "lucide-react";
import AsistenteWhatsApp from "@/src/components/contacto/AsistenteWhatsApp";
import CabeceraSeccion from "@/src/components/layout/CabeceraSeccion";
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

// Metadatos SEO propios para /contacto.
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Comunicate con Timelux por WhatsApp o Instagram. Asesoramiento personalizado de lunes a sábado, de 9 a 20 h, y envíos a toda la Argentina.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    url: "/contacto",
    title: "Contacto | Timelux",
    description:
      "Atención personalizada por WhatsApp para elegir tu fragancia, encargar perfumes a pedido o coordinar envíos a todo el país.",
  },
};

// Grafo de migas de pan de /contacto.
const datosEstructurales = crearGrafo([
  crearBreadcrumbSchema(
    [
      { nombre: "Inicio", url: baseUrl },
      { nombre: "Contacto", url: `${baseUrl}/contacto` },
    ],
    `${baseUrl}/contacto#breadcrumb`,
  ),
]);

// Página dedicada de canales oficiales y consulta guiada.
export default function PaginaContacto(): React.JSX.Element {
  return (
    <main className="flex-1 bg-[#fffff4]">
      <CabeceraSeccion
        etiquetaBreadcrumb="Contacto"
        eyebrow="Atención Personalizada"
        titulo="Hablemos de tu"
        tituloCursiva="próxima fragancia"
        descripcion="Te asesoramos de manera directa por WhatsApp para ayudarte a elegir según tus notas favoritas, confirmar disponibilidad o encargar una fragancia puntual."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Columna izquierda: canales directos, horarios y cobertura */}
          <div className="space-y-4 lg:col-span-5">
            {/* Tarjeta WhatsApp directo */}
            <a
              href={getWhatsAppLink(mensajePredeterminadoWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir a Timelux por WhatsApp"
              className="group flex min-h-[44px] items-start gap-4 rounded-2xl border border-[#a6caeb]/40 bg-white/90 p-5 shadow-xs transition-all duration-300 hover:border-[#c40a0a]/45 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c40a0a]/10 text-[#c40a0a]">
                <MessageCircle size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                  WhatsApp Directo
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-[#141416] transition-colors group-hover:text-[#c40a0a]">
                  {telefonoVisible}
                </p>
                <p className="mt-1 text-xs text-[#5e626e]">
                  Canal principal de consultas, pedidos y asesoramiento.
                </p>
              </div>
            </a>

            {/* Tarjeta Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir a Timelux en Instagram"
              className="group flex min-h-[44px] items-start gap-4 rounded-2xl border border-[#a6caeb]/40 bg-white/90 p-5 shadow-xs transition-all duration-300 hover:border-[#c40a0a]/45 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#a6caeb]/40 bg-[#a6caeb]/15 text-[#1e3a5f]">
                <IconoInstagram size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                  Instagram Oficial
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-[#141416] transition-colors group-hover:text-[#c40a0a]">
                  {instagramHandle}
                </p>
                <p className="mt-1 text-xs text-[#5e626e]">
                  Novedades, ingresos recientes y reseñas de fragancias.
                </p>
              </div>
            </a>

            {/* Tarjeta Horario */}
            <div className="flex items-start gap-4 rounded-2xl border border-[#a6caeb]/35 bg-white/90 p-5 shadow-xs">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#a6caeb]/40 bg-[#a6caeb]/15 text-[#1e3a5f]">
                <Clock size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                  Horario de Atención
                </p>
                <p className="mt-1 text-base font-bold text-[#141416]">
                  Lunes a sábado, de 9 a 20 h
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#5e626e]">
                  Respondemos tus consultas por orden de llegada durante toda la
                  jornada.
                </p>
              </div>
            </div>

            {/* Tarjeta Cobertura */}
            <div className="flex items-start gap-4 rounded-2xl border border-[#a6caeb]/35 bg-white/90 p-5 shadow-xs">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#a6caeb]/40 bg-[#a6caeb]/15 text-[#1e3a5f]">
                <Truck size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                  Envíos y Entregas
                </p>
                <p className="mt-1 text-base font-bold text-[#141416]">
                  Toda la Argentina · Correo Argentino
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#5e626e]">
                  Despachos con empaque protegido (1 a 2 semanas). Modalidad
                  con seña del 70% disponible exclusivamente en Formosa capital.
                </p>
              </div>
            </div>

            {/* Enlace rápido a Preguntas Frecuentes */}
            <Link
              href="/preguntas"
              className="inline-flex min-h-[44px] items-center gap-1.5 px-1 text-sm font-semibold text-[#1e3a5f] transition-colors hover:text-[#c40a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
            >
              ¿Tenés dudas sobre pagos o demoras? Revisá las Preguntas
              Frecuentes
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* Columna derecha: asistente interactivo hacia WhatsApp */}
          <div className="lg:col-span-7">
            <AsistenteWhatsApp />
          </div>
        </div>
      </section>

      {/* Datos estructurados BreadcrumbList */}
      <JsonLd datos={datosEstructurales} />
    </main>
  );
}
