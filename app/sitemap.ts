import type { MetadataRoute } from "next";

// URL base canónica saneada (igual que en robots.ts y layout):
// recorta espacios, garantiza protocolo https y evita barras finales duplicadas.
const siteUrl: string = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://timelux-perfumes.vercel.app"
).replace(/\/+$/, "");
const baseUrl: string = siteUrl.startsWith("http")
  ? siteUrl
  : `https://${siteUrl}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const ultimaModificacion: Date = new Date();

  // Solo rutas navegables: los fragmentos (#) no son URLs válidas
  // en un sitemap y los motores de búsqueda los ignoran.
  return [
    {
      url: `${baseUrl}/`,
      lastModified: ultimaModificacion,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/perfumes`,
      lastModified: ultimaModificacion,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}
