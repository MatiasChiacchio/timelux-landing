import type { MetadataRoute } from "next";
import { baseUrl } from "@/src/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const ultimaModificacion: Date = new Date();

  // Rutas indexables de Timelux (sin fragmentos #).
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
    {
      url: `${baseUrl}/nosotros`,
      lastModified: ultimaModificacion,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/preguntas`,
      lastModified: ultimaModificacion,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: ultimaModificacion,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
