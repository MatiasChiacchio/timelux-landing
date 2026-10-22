'use client';

// Preguntas frecuentes de Timelux.
// Client Component porque gestiona la apertura del acordeón con estado.

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/src/components/ui/FadeIn";

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
        descripcion:
          "Transferencia, Mercado Pago y efectivo.",
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
          "70% al encargar y el 30% restante al llegar el producto (Exclusivamente en Formosa, Formosa). ",
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

// Acordeón de preguntas frecuentes con apertura múltiple.
export default function Faq(): React.JSX.Element {
  // Índices de las preguntas actualmente abiertas (inicia todo cerrado).
  const [abiertas, setAbiertas] = useState<number[]>([]);

  // Alterna la visibilidad de una respuesta sin cerrar las demás.
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
      className="flex min-h-[calc(100vh-5rem)] scroll-mt-20 items-center bg-[#fffff4] py-16 md:scroll-mt-24 md:py-24"
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado centrado */}
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#1e3a5f]">
          Preguntas frecuentes
        </p>
        <h2 className="mt-2 text-center font-serif text-3xl text-[#141416] sm:text-4xl">
          Todo lo que querés saber
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#5e626e] sm:text-base">
          Resolvemos las dudas más comunes sobre pedidos, pagos y envíos.
          Si te queda alguna pregunta, escribinos por WhatsApp.
        </p>

        {/* Acordeón de preguntas */}
        <div className="mt-10">
          {preguntas.map((item: PreguntaFrecuente, indice: number) => {
            const abierta: boolean = abiertas.includes(indice);
            return (
              <FadeIn
                key={item.pregunta}
                delay={indice * 70}
                className="mb-4"
              >
                <div className="overflow-hidden rounded-2xl border border-[#a6caeb]/40 bg-white/70">
                <h3>
                  <button
                    type="button"
                    onClick={(): void => alternarPregunta(indice)}
                    aria-expanded={abierta}
                    aria-controls={`faq-respuesta-${indice}`}
                    className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c40a0a]"
                  >
                    <span className="text-sm font-bold text-[#141416] sm:text-base">
                      {item.pregunta}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      className={`shrink-0 text-[#c40a0a] transition-transform duration-300 ${
                        abierta ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </h3>
                {abierta && (
                  <div id={`faq-respuesta-${indice}`} role="region">
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed text-[#5e626e]">
                        {item.introduccion}
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {item.puntos.map((punto: PuntoFaq) => (
                          <li
                            key={punto.titulo}
                            className="flex gap-2 text-sm leading-relaxed text-[#5e626e]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c40a0a]/70"
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
                      {item.aclaracion && (
                        <p className="mt-3 rounded-xl border border-[#c40a0a]/20 bg-[#c40a0a]/5 px-4 py-3 text-sm leading-relaxed text-[#5e626e]">
                          <strong className="font-semibold text-[#c40a0a]">
                            Importante:{` `}
                          </strong>
                          {item.aclaracion}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
