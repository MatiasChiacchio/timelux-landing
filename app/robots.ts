import type { MetadataRoute } from "next";

// URL base canónica: variable de entorno en producción,
// dominio de Vercel como respaldo para desarrollo y vistas previas.
const baseUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://timelux-perfumes.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
