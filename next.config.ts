import type { NextConfig } from "next";

// Optimización de imágenes externas para la vitrina de Timelux.
// La hoja de cálculo puede incorporar hosts nuevos sin requerir un deploy,
// por eso se mantiene el comodín HTTPS. La lista de hosts observados es:
// cdn.parfumerie.com.ar, imgs.search.brave.com, www.lattafa-usa.com,
// encrypted-tbn0.gstatic.com, armaf.com, afnan.com,
// rougeb2car.vtexassets.com, images.unsplash.com y cdn.batitienda.com.
const nextConfig: NextConfig = {
  images: {
    // AVIF primero y WebP como respaldo para navegadores sin soporte.
    formats: ["image/avif", "image/webp"],
    // Las fotos de producto cambian poco: se cachean una semana.
    minimumCacheTTL: 604800,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
