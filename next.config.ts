import type { NextConfig } from "next";

// Optimización de imágenes externas para la vitrina de Timelux.
// Se autoriza cualquier origen HTTPS genérico (carga directa desde
// hojas de cálculo o bancos de imágenes) más CDNs habituales.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
