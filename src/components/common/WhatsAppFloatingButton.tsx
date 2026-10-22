// Botón flotante permanente de WhatsApp para conversión global.
// Server Component: solo renderiza un enlace, sin estado ni eventos.

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// CTA circular fijo en la esquina inferior derecha, visible en toda la app.
export default function WhatsAppFloatingButton(): React.JSX.Element {
  // Mensaje de consulta general codificado hacia WhatsApp.
  const enlaceWhatsApp: string = getWhatsAppLink(
    "¡Hola Timelux! Quiero consultar sobre sus fragancias y catálogo.",
  );

  return (
    <a
      href={enlaceWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Timelux por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#c40a0a] text-[#fffff4] shadow-2xl shadow-[#c40a0a]/30 ring-4 ring-[#a6caeb]/30 transition-all duration-300 hover:scale-105 hover:bg-[#a30808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
      {/* Tooltip sutil solo en desktop */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-[#a6caeb]/40 bg-white/95 px-2.5 py-1 text-xs text-[#141416] shadow-md backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        ¿Hablamos?
      </span>
    </a>
  );
}
