// Bloque editorial de Conserjería Olfativa y Perfumes por Encargo.
// Server Component: convierte indecisión o búsquedas puntuales directamente en WhatsApp.

import { Compass, MessageCircle, Sparkles } from "lucide-react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { getWhatsAppLink } from "@/src/config/site";

// Banner de asesoramiento personalizado y encargos especiales fuera de lista.
export default function ConserjeriaOlfativa(): React.JSX.Element {
  const enlaceRecomendacion: string = getWhatsAppLink(
    "¡Hola Timelux! Necesito asesoramiento para elegir un perfume. Busco una fragancia según mis gustos y ocasión.",
  );

  const enlaceEncargo: string = getWhatsAppLink(
    "¡Hola Timelux! Estoy buscando un perfume específico a pedido que no vi en el catálogo. ¿Podrían cotizarlo?",
  );

  return (
    <section
      aria-labelledby="titulo-conserjeria"
      className="bg-[#fffff4] py-10 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-[#a6caeb]/45 bg-white/90 p-6 shadow-md shadow-[#1e3a5f]/5 sm:p-10 lg:p-12">
            {/* Resplandor luminoso sutil sobre la tarjeta */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#a6caeb]/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 top-0 w-1.5 bg-[#c40a0a]"
            />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Narrativa principal */}
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
                  <Compass size={14} aria-hidden="true" />
                  Conserjería Olfativa &amp; Encargos
                </p>

                <h2
                  id="titulo-conserjeria"
                  className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#141416] sm:text-4xl"
                >
                  ¿Indeciso o buscás una fragancia{" "}
                  <span className="italic text-[#1e3a5f]">por encargo</span>?
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5e626e] sm:text-base">
                  Contanos 2 aromas que te gusten, la estación o la ocasión y te
                  armamos una terna a medida. Y si buscás un perfume que no está
                  publicado en la vitrina, lo gestionamos especialmente a pedido
                  para vos.
                </p>

                {/* Etiquetas de ocasión rápidas */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Uso diario & oficina",
                    "Salidas nocturnas",
                    "Regalo con impacto",
                    "Encargos especiales",
                  ].map((ocasion: string) => (
                    <li
                      key={ocasion}
                      className="rounded-full border border-[#a6caeb]/40 bg-[#fffff4] px-3 py-1 text-xs font-medium text-[#1e3a5f]"
                    >
                      {ocasion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Acciones de conversión directa */}
              <div className="flex flex-col gap-3 lg:col-span-5">
                <a
                  href={enlaceRecomendacion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-6 py-3.5 text-sm font-semibold text-[#fffff4] shadow-md shadow-[#c40a0a]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Pedir recomendación a medida
                </a>

                <a
                  href={enlaceEncargo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#a6caeb]/70 bg-[#fffff4] px-6 py-3.5 text-sm font-semibold text-[#141416] transition-all duration-300 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
                >
                  <Sparkles
                    size={17}
                    aria-hidden="true"
                    className="text-[#1e3a5f]"
                  />
                  Encargar un perfume a pedido
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
