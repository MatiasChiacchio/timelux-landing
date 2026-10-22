'use client';

// Imagen del frasco optimizada por Next.js con respaldo local.
// Client Component porque gestiona el fallback ante errores de carga.

import { useState } from "react";
import Image from "next/image";

// Placeholder local cuando la URL externa falla o no existe.
const IMAGEN_RESPALDO: string = "/logo.png";

// Propiedades: origen remoto, texto alternativo y tamaño responsivo real.
interface PropiedadesImagenPerfume {
  src: string;
  alt: string;
  sizes: string;
  prioridad?: boolean;
}

// Frasco optimizado por el servidor (WebP/AVIF y srcset responsivo), con
// conmutación a placeholder local ante errores del origen o del optimizador.
export default function ImagenPerfume({
  src,
  alt,
  sizes,
  prioridad = false,
}: PropiedadesImagenPerfume): React.JSX.Element {
  // Origen actual: remoto primero, respaldo local si falla la carga.
  const [origen, setOrigen] = useState<string>(src);

  // Conmuta al placeholder local una sola vez ante errores de carga.
  function usarRespaldo(): void {
    setOrigen((previo: string) =>
      previo === IMAGEN_RESPALDO ? previo : IMAGEN_RESPALDO,
    );
  }

  return (
    <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#fffff4]/60 p-4">
      <Image
        src={origen}
        alt={alt}
        fill
        sizes={sizes}
        priority={prioridad}
        onError={usarRespaldo}
        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
}
