// Botón flotante permanente de WhatsApp para conversión global.
// Server Component: solo renderiza un enlace accesible, sin estado ni eventos.

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// CTA circular fijo en la esquina inferior derecha, visible en toda la app.
export default function WhatsAppFloatingButton(): React.JSX.Element {
  const enlaceWhatsApp: string = getWhatsAppLink(
    "¡Hola Timelux! Quiero consultar sobre sus fragancias y catálogo.",
  );

  return (
    <a
      href={enlaceWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Timelux por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#fffff4]/40 bg-[#c40a0a] text-[#fffff4] shadow-xl shadow-[#141416]/25 ring-4 ring-white/80 transition-all duration-300 hover:scale-105 hover:bg-[#a30808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      {/* Tooltip sutil solo en escritorio */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-[#a6caeb]/50 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-[#141416] opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 md:block">
        ¿Te asesoramos?
      </span>
    </a>
  );
}
