'use client';

// Preguntas frecuentes de Timelux.
// Client Component porque gestiona la apertura del acordeón con estado.

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Pregunta con su respuesta explicativa.
interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

// Preguntas y respuestas sobre autenticidad, pedidos, pagos y envíos.
const preguntas: PreguntaFrecuente[] = [
  {
    pregunta: "¿Son fragancias originales y dupes de alta calidad?",
    respuesta:
      "Sí. Trabajamos con casas consagradas como Lattafa, Afnan y Armaf, además de perfumería de diseñador. Todas las piezas son originales, con presentación sellada y la calidad de fijación que caracteriza a la alta perfumería árabe.",
  },
  {
    pregunta: "¿Cómo realizo un pedido o consulta?",
    respuesta:
      "Todo el proceso es directo por WhatsApp: elegís tu fragancia en el catálogo, tocás Consultar y te atendemos al momento con asesoramiento inmediato, disponibilidad y precio actualizado.",
  },
  {
    pregunta: "¿Cuáles son los medios de pago disponibles?",
    respuesta:
      "Aceptamos transferencias, efectivo y medios digitales que se convienen por chat al momento de confirmar tu pedido. Siempre coordinamos la opción más cómoda para vos antes de cerrar la compra.",
  },
  {
    pregunta: "¿Hacen envíos a todo el país?",
    respuesta:
      "Sí, realizamos envíos a todo el país con empaques protegidos para que tu fragancia llegue en perfectas condiciones. Escribinos por WhatsApp con tu localidad y te detallamos tiempos y costos de la logística.",
  },
  {
    pregunta: "¿Cómo elijo si no conozco las notas olfativas?",
    respuesta:
      "No necesitás saber de notas: contanos por WhatsApp qué perfumes usaste antes o cuáles te gustan, y te recomendamos opciones según tus gustos y la ocasión en la que querés usarlos.",
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
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#a6caeb]">
          Preguntas frecuentes
        </p>
        <h2 className="mt-2 text-center font-serif text-3xl text-[#141416] sm:text-4xl">
          Todo lo que querés saber
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#5e626e] sm:text-base">
          Resolvemos las dudas más comunes sobre autenticidad, pedidos, pagos y
          envíos. Si te queda alguna pregunta, escribinos por WhatsApp.
        </p>

        {/* Acordeón de preguntas */}
        <div className="mt-10">
          {preguntas.map((item: PreguntaFrecuente, indice: number) => {
            const abierta: boolean = abiertas.includes(indice);
            return (
              <div
                key={item.pregunta}
                className="mb-4 overflow-hidden rounded-2xl border border-[#a6caeb]/40 bg-white/70"
              >
                <h3>
                  <button
                    type="button"
                    onClick={(): void => alternarPregunta(indice)}
                    aria-expanded={abierta}
                    aria-controls={`faq-respuesta-${indice}`}
                    className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e626e]">
                      {item.respuesta}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
