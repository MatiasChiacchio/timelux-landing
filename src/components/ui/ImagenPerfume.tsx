'use client';

// Imagen del frasco con carga directa y respaldo local.
// Client Component porque gestiona el fallback ante errores de carga.

import { useState } from "react";
import Image from "next/image";

// Placeholder local cuando la URL externa falla o no existe.
const IMAGEN_RESPALDO: string = "/logo.png";

// Propiedades: origen remoto y texto alternativo del perfume.
interface PropiedadesImagenPerfume {
  src: string;
  alt: string;
}

// Frasco sin pasar por el optimizador del servidor (unoptimized) para
// evitar bloqueos de host, con conmutación a placeholder local ante 404/403.
export default function ImagenPerfume({
  src,
  alt,
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
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        unoptimized
        onError={usarRespaldo}
        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
}
