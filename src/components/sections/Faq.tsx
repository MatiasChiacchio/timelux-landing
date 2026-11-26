'use client';

// Preguntas frecuentes de Timelux.
// Client Component porque gestiona el acordeón animado por CSS Grid con apertura múltiple.

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// Punto destacado dentro de una respuesta (etiqueta con énfasis + descripción).
interface PuntoFaq {
  titulo: string;
  descripcion: string;
}

// Pregunta con introducción, detalle en lista y aclaración opcional.
interface PreguntaFrecuente {
  pregunta: string;
  introduccion: string;
  puntos: PuntoFaq[];
  aclaracion?: string;
}

// Preguntas y respuestas sobre pedidos, pagos y envíos.
const preguntas: PreguntaFrecuente[] = [
  {
    pregunta: "¿Cómo se realizan los pedidos?",
    introduccion:
      "Una vez seleccionado el perfume, gestionamos tu pedido de forma directa y personalizada por WhatsApp.",
    puntos: [
      {
        titulo: "Asesoramiento personalizado",
        descripcion:
          "Si necesitás ayuda para elegir, escribinos por WhatsApp y te acompañamos en todo el proceso.",
      },
      {
        titulo: "Perfumes a pedido",
        descripcion:
          "Si buscás un perfume que no está en el catálogo, podemos conseguirlo especialmente para vos.",
      },
    ],
  },
  {
    pregunta: "¿Qué métodos y monedas de pago aceptan?",
    introduccion:
      "Trabajamos con opciones flexibles para que puedas comprar con comodidad.",
    puntos: [
      {
        titulo: "Monedas",
        descripcion: "Pesos argentinos y USDT.",
      },
      {
        titulo: "Medios",
        descripcion: "Transferencia, Mercado Pago y efectivo.",
      },
    ],
  },
  {
    pregunta: "¿Cuáles son las formas de pago disponibles?",
    introduccion:
      "Podés elegir la modalidad que te resulte más cómoda al confirmar tu pedido:",
    puntos: [
      {
        titulo: "Pago total anticipado",
        descripcion: "100% al momento del pedido.",
      },
      {
        titulo: "Pago con seña",
        descripcion:
          "70% al encargar y el 30% restante al llegar el producto (Exclusivamente en Formosa, Formosa).",
      },
    ],
    aclaracion:
      "El cliente cuenta con 15 días tras ser notificado para retirar o coordinar el envío; caso contrario, la seña no es reembolsable.",
  },
  {
    pregunta: "¿Cuáles son los tiempos y modalidades de envío?",
    introduccion:
      "Realizamos envíos a todo el país con empaque protegido para que tu fragancia llegue en perfectas condiciones.",
    puntos: [
      {
        titulo: "Correo Argentino",
        descripcion: "Envíos a todo el país vía Correo Argentino.",
      },
      {
        titulo: "Demora estimada",
        descripcion: "Entre 1 y 2 semanas.",
      },
    ],
  },
];

// Propiedades opcionales: permite ocultar encabezado o cierre dentro de /preguntas.
interface PropiedadesFaq {
  mostrarEncabezado?: boolean;
  mostrarCierre?: boolean;
}

// Acordeón de preguntas frecuentes visible de inmediato sin retrasos de animación.
export default function Faq({
  mostrarEncabezado = true,
  mostrarCierre = true,
}: PropiedadesFaq): React.JSX.Element {
  const [abiertas, setAbiertas] = useState<number[]>([]);

  function alternarPregunta(indice: number): void {
    setAbiertas((previas: number[]) =>
      previas.includes(indice)
        ? previas.filter((abierta: number) => abierta !== indice)
        : [...previas, indice],
    );
  }

  return (
    <section
      id="faq"
      className={`scroll-mt-20 bg-[#fffff4] md:scroll-mt-24 ${
        mostrarEncabezado
          ? "border-t border-[#a6caeb]/30 py-16 md:py-24"
          : "pb-8 pt-10 md:pb-10 md:pt-12"
      }`}
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado centrado opcional */}
        {mostrarEncabezado ? (
          <>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
              Preguntas frecuentes
            </p>
            <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-[#141416] sm:text-4xl lg:text-5xl">
              Todo lo que querés saber
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[#5e626e] sm:text-base">
              Resolvemos las dudas más comunes sobre pedidos, pagos y envíos. Si
              te queda alguna consulta, escribinos directo por WhatsApp.
            </p>
          </>
        ) : null}

        {/* Acordeón de preguntas */}
        <div className={mostrarEncabezado ? "mt-10 space-y-3.5" : "space-y-3.5"}>
          {preguntas.map((item: PreguntaFrecuente, indice: number) => {
            const abierta: boolean = abiertas.includes(indice);
            return (
              <div
                key={item.pregunta}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  abierta
                    ? "border-[#c40a0a]/35 bg-white shadow-sm"
                    : "border-[#a6caeb]/40 bg-white/85 hover:border-[#a6caeb]/80"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={(): void => alternarPregunta(indice)}
                    aria-expanded={abierta}
                    aria-controls={`faq-respuesta-${indice}`}
                    className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e3a5f]"
                  >
                    <span className="text-sm font-semibold text-[#141416] sm:text-base">
                      {item.pregunta}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                        abierta
                          ? "bg-[#c40a0a]/10 text-[#c40a0a]"
                          : "bg-[#a6caeb]/20 text-[#1e3a5f]"
                      }`}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 motion-reduce:transition-none ${
                          abierta ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-respuesta-${indice}`}
                  role="region"
                  aria-hidden={!abierta}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    abierta
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#a6caeb]/25 px-5 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-[#5e626e]">
                        {item.introduccion}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {item.puntos.map((punto: PuntoFaq) => (
                          <li
                            key={punto.titulo}
                            className="flex gap-2.5 text-sm leading-relaxed text-[#5e626e]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c40a0a]/75"
                            />
                            <span>
                              <strong className="font-semibold text-[#141416]">
                                {`${punto.titulo}: `}
                              </strong>
                              {punto.descripcion}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {item.aclaracion ? (
                        <p className="mt-4 rounded-xl border border-[#c40a0a]/20 bg-[#c40a0a]/5 px-4 py-3 text-sm leading-relaxed text-[#5e626e]">
                          <strong className="font-semibold text-[#c40a0a]">
                            Importante:{" "}
                          </strong>
                          {item.aclaracion}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cierre de asistencia directa opcional */}
        {mostrarCierre ? (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#a6caeb]/35 bg-white/85 px-6 py-5 text-center shadow-xs sm:flex-row sm:text-left">
            <div>
              <p className="font-serif text-xl font-semibold text-[#141416]">
                ¿Te quedó alguna otra pregunta?
              </p>
              <p className="mt-0.5 text-xs text-[#5e626e] sm:text-sm">
                Respondemos personalmente de lunes a sábado, de 9 a 20 h.
              </p>
            </div>
            <a
              href={getWhatsAppLink(
                "¡Hola Timelux! Tengo una consulta sobre pedidos y envíos.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#c40a0a] px-6 py-2.5 text-sm font-semibold text-[#fffff4] shadow-sm transition-colors duration-200 hover:bg-[#a30808] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
