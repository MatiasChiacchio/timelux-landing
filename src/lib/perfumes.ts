// Utilidades de presentación del catálogo de fragancias.
// Formato de precios y mensajes de consulta por WhatsApp.

import { getWhatsAppLink } from "@/src/config/site";
import type { GeneroPerfume, Perfume } from "@/src/types/perfume";

// Formatea el precio en pesos argentinos sin decimales (ej.: $ 68.000).
export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}

// Etiqueta legible del tipo de perfume.
export function etiquetaTipo(tipo: Perfume["tipo"]): string {
  return tipo === "arabe" ? "Árabe" : "Diseñador";
}

// Etiqueta legible del género olfativo.
export function etiquetaGenero(genero: GeneroPerfume): string {
  if (genero === "hombre") {
    return "Hombre";
  }
  if (genero === "mujer") {
    return "Mujer";
  }
  return "Unisex";
}

// Enlace de WhatsApp con el mensaje predeterminado para un perfume específico.
export function enlaceWhatsAppPerfume(perfume: Perfume): string {
  return getWhatsAppLink(
    `¡Hola Timelux! Me interesa el perfume ${perfume.nombre} de ${perfume.marca} (${formatearPrecio(perfume.precio)}). ¿Sigue vigente el precio y tienen disponibilidad?`,
  );
}
