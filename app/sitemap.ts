import type { MetadataRoute } from "next";
import { baseUrl } from "@/src/config/site";

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
