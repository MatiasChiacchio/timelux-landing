// Portada principal de Timelux en composición editorial Split limpia.
// Server Component: narrativa clara, acciones directas y fotografía de estudio sin ruido.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// Propiedades opcionales: cantidad real de fragancias del catálogo.
interface PropiedadesHero {
  totalPerfumes?: number;
}

// Hero luminoso Warm Ivory con foco directo en el catálogo y consulta por WhatsApp.
export default function Hero({
  totalPerfumes = 180,
}: PropiedadesHero): React.JSX.Element {
  return (
    <section
      id="hero"
      className="scroll-mt-20 bg-[#fffff4] md:scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12 md:pb-16 md:pt-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Columna izquierda: narrativa concisa y acciones principales */}
          <div className="text-center lg:col-span-7 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e3a5f]">
              Perfumería Árabe &amp; Diseñador
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-[#141416] sm:text-5xl lg:text-[4rem]">
              Más que una fragancia,{" "}
              <span className="inline-block whitespace-nowrap font-medium italic text-[#1e3a5f]">
                tu esencia
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#5e626e] sm:text-lg lg:mx-0">
              {totalPerfumes} fragancias 100% originales con fijación duradera y
              envíos a todo el país.
            </p>

            {/* Acciones principales */}
            <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
              <Link
                href="/perfumes"
                aria-label="Explorar el catálogo completo de fragancias"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-7 py-3.5 text-sm font-semibold text-[#fffff4] shadow-md shadow-[#c40a0a]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95 sm:w-auto"
              >
                Explorar catálogo
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href={getWhatsAppLink(
                  "¡Hola Timelux! Quiero conocer sus fragancias disponibles y recibir asesoramiento.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar por WhatsApp"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#a6caeb]/70 bg-white/90 px-7 py-3.5 text-sm font-semibold text-[#141416] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95 sm:w-auto"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            </div>

            {/* Línea discreta de confianza */}
            <p className="mt-6 text-xs font-medium text-[#5e626e] sm:text-sm">
              Originales sellados · Envíos a todo el país · Atención directa
            </p>
          </div>

          {/* Columna derecha: fotografía editorial limpia sin stickers ni doble marco */}
          <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#a6caeb]/35 bg-white shadow-lg">
              <Image
                src="/hero-perfumeria.jpg"
                alt="Frascos esculturales de alta perfumería árabe y de diseñador sobre piedra travertino marfil"
                fill
                priority
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 448px, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
