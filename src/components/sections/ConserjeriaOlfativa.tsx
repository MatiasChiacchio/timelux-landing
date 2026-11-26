// Franja concisa de asesoría y perfumes por encargo.
// Server Component: cierre simple y directo hacia WhatsApp.

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// Cierre sobrio para consultas personalizadas o encargos fuera de lista.
export default function ConserjeriaOlfativa(): React.JSX.Element {
  const enlaceWhatsApp: string = getWhatsAppLink(
    "¡Hola Timelux! Quiero asesoramiento para elegir un perfume o consultar por un encargo a pedido.",
  );

  return (
    <section
      aria-labelledby="titulo-conserjeria"
      className="border-t border-[#a6caeb]/30 bg-white/55 py-12 md:py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <h2
            id="titulo-conserjeria"
            className="font-serif text-2xl font-semibold text-[#141416] sm:text-3xl"
          >
            ¿Buscás un perfume en particular?
          </h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#5e626e] sm:text-base">
            Te ayudamos a elegir según tus gustos o conseguimos tu fragancia a
            pedido.
          </p>
        </div>

        <a
          href={enlaceWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-7 py-3 text-sm font-semibold text-[#fffff4] shadow-md shadow-[#c40a0a]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  );
}
