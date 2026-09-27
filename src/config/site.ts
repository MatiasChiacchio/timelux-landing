// Configuración central del sitio Timelux.
// Centraliza nombre, contacto y navegación para reutilizar en Navbar, Hero y catálogo.

// Nombre oficial de la marca.
export const name: string = "Timelux";

// Número de WhatsApp saneado, listo para la API de wa.me (sin espacios ni signos).
export const whatsappNumber: string = "5493704772001";

// Tipo estricto para los enlaces de navegación por anclas.
export interface EnlaceNavegacion {
  label: string;
  href: string;
}

// Lista de navegación principal: combina la ruta del catálogo completo
// con anclas absolutas para funcionar desde la Home y desde /perfumes.
export const navLinks: EnlaceNavegacion[] = [
  { label: "Inicio", href: "/#hero" },
  { label: "Perfumes", href: "/perfumes" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Preguntas", href: "/#faq" },
  { label: "Contacto", href: "/#contacto" },
];

// Mensaje genérico de asesoramiento para el CTA principal.
export const mensajePredeterminadoWhatsApp: string =
  "Hola Timelux, quiero asesoramiento sobre perfumes";

// Genera un enlace seguro hacia WhatsApp con mensaje codificado.
// Usa encodeURIComponent para preservar acentos, espacios y signos.
export function getWhatsAppLink(message?: string): string {
  const numeroSaneado: string = whatsappNumber.replace(/\D/g, "");
  const texto: string = message ?? mensajePredeterminadoWhatsApp;

  if (!texto.trim()) {
    return `https://wa.me/${numeroSaneado}`;
  }

  return `https://wa.me/${numeroSaneado}?text=${encodeURIComponent(texto)}`;
}
