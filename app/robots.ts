import type { MetadataRoute } from "next";

// URL base canónica saneada: recorta espacios, garantiza protocolo https
// y evita barras finales duplicadas al concatenar rutas.
const siteUrl: string = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://timelux-perfumes.vercel.app"
).replace(/\/+$/, "");
const baseUrl: string = siteUrl.startsWith("http")
  ? siteUrl
  : `https://${siteUrl}`;

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
