'use client';

// Imagen del frasco optimizada por Next.js sobre fondo de estudio blanco.
// Client Component ligero: gestiona fallback editorial SVG sin animaciones infinitas.

import { useState } from "react";
import Image from "next/image";

// Ilustración editorial de respaldo cuando la URL externa falla o no existe.
const IMAGEN_RESPALDO: string = "/placeholder-perfume.svg";

// Propiedades: origen remoto, texto alternativo, tamaño responsivo y clase extra.
interface PropiedadesImagenPerfume {
  src: string;
  alt: string;
  sizes: string;
  prioridad?: boolean;
  classNameContenedor?: string;
}

// Frasco optimizado (WebP/AVIF y srcset responsivo), con transición limpia
// y conmutación automática al placeholder editorial ante errores de red.
export default function ImagenPerfume({
  src,
  alt,
  sizes,
  prioridad = false,
  classNameContenedor = "",
}: PropiedadesImagenPerfume): React.JSX.Element {
  const origenInicial: string = src.trim() || IMAGEN_RESPALDO;
  const [origen, setOrigen] = useState<string>(origenInicial);
  const [cargada, setCargada] = useState<boolean>(false);

  // Conmuta al placeholder editorial SVG una sola vez ante errores de carga.
  function usarRespaldo(): void {
    setOrigen((previo: string) =>
      previo === IMAGEN_RESPALDO ? previo : IMAGEN_RESPALDO,
    );
    setCargada(true);
  }

  return (
    <div
      className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-[#a6caeb]/25 bg-white p-3 sm:p-4 ${classNameContenedor}`}
    >
      {/* Fondo cálido estático mientras llega la imagen (sin animación infinita) */}
      {!cargada ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#fffff4]/60"
        />
      ) : null}

      <Image
        src={origen}
        alt={alt}
        fill
        sizes={sizes}
        priority={prioridad}
        onLoad={(): void => setCargada(true)}
        onError={usarRespaldo}
        className={`object-contain p-2.5 transition-[opacity,transform] duration-300 ease-out group-hover:scale-105 sm:p-3 ${
          cargada ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
