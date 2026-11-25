// Apartado "Preguntas Frecuentes" de Timelux.
// Server Component estático con guía rápida, acordeón completo y enlace a Contacto.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CreditCard, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CabeceraSeccion from "@/src/components/layout/CabeceraSeccion";
import ConserjeriaOlfativa from "@/src/components/sections/ConserjeriaOlfativa";
import Faq from "@/src/components/sections/Faq";
import JsonLd from "@/src/components/seo/JsonLd";
import { baseUrl } from "@/src/config/site";
import { crearBreadcrumbSchema, crearGrafo } from "@/src/lib/schema";

// Metadatos SEO propios para /preguntas.
export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Resolvé tus dudas sobre pedidos por WhatsApp, medios de pago en pesos o USDT, modalidad con seña en Formosa y envíos a todo el país por Correo Argentino.",
  alternates: {
    canonical: "/preguntas",
  },
  openGraph: {
    url: "/preguntas",
    title: "Preguntas Frecuentes | Timelux",
    description:
      "Información clara sobre pedidos, formas de pago, encargos especiales y envíos protegidos a toda la Argentina.",
  },
};

// Tarjeta resumen de consulta rápida.
interface TarjetaResumenFaq {
  titulo: string;
  detalle: string;
  icono: LucideIcon;
}

const resumenRapido: TarjetaResumenFaq[] = [
  {
    titulo: "Medios de pago",
    detalle:
      "Aceptamos pesos argentinos y USDT mediante transferencia, Mercado Pago o efectivo.",
    icono: CreditCard,
  },
  {
    titulo: "Modalidades de pedido",
    detalle:
      "Pago total anticipado (100%) o seña del 70% al encargar y 30% al llegar (exclusivo Formosa).",
    icono: CalendarCheck,
  },
  {
    titulo: "Envíos a todo el país",
    detalle:
      "Despachos con empaque protegido vía Correo Argentino con demora estimada de 1 a 2 semanas.",
    icono: Truck,
  },
];

// Grafo de migas de pan de /preguntas (sin FAQPage para evitar rich results retirados).
const datosEstructurales = crearGrafo([
  crearBreadcrumbSchema(
    [
      { nombre: "Inicio", url: baseUrl },
      { nombre: "Preguntas Frecuentes", url: `${baseUrl}/preguntas` },
    ],
    `${baseUrl}/preguntas#breadcrumb`,
  ),
]);

// Página dedicada de ayuda, pagos y envíos.
export default function PaginaPreguntas(): React.JSX.Element {
  return (
    <main className="flex-1 bg-[#fffff4]">
      <CabeceraSeccion
        etiquetaBreadcrumb="Preguntas Frecuentes"
        eyebrow="Ayuda & Envíos"
        titulo="Todo lo que"
        tituloCursiva="querés saber"
        descripcion="Información transparente sobre cómo encargar tu fragancia, las opciones de pago disponibles y los tiempos de envío a todo el país."
      />

      {/* Resumen visual rápido sobre pagos y envíos */}
      <section
        aria-label="Resumen rápido de compra y envíos"
        className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8"
      >
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {resumenRapido.map((item: TarjetaResumenFaq) => (
            <li
              key={item.titulo}
              className="rounded-2xl border border-[#a6caeb]/35 bg-white/90 p-5 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#a6caeb]/40 bg-[#a6caeb]/15 text-[#1e3a5f]">
                  <item.icono size={18} aria-hidden="true" />
                </span>
                <h2 className="font-serif text-xl font-semibold text-[#141416]">
                  {item.titulo}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#5e626e]">
                {item.detalle}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Acordeón detallado de preguntas frecuentes */}
      <Faq mostrarEncabezado={false} />

      {/* Acceso directo al apartado de Contacto */}
      <div className="mx-auto max-w-4xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#a6caeb]/35 bg-white/75 px-6 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-[#5e626e]">
            ¿Preferís ver todos nuestros canales de atención y armar tu consulta
            guiada?
          </p>
          <Link
            href="/contacto"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-[#a6caeb]/65 bg-white px-5 py-2 text-sm font-semibold text-[#1e3a5f] transition-colors duration-200 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]"
          >
            Ir a Contacto
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Bloque de conserjería y perfumes a pedido */}
      <ConserjeriaOlfativa />

      {/* Datos estructurados BreadcrumbList */}
      <JsonLd datos={datosEstructurales} />
    </main>
  );
}
