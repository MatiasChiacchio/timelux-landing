"use client";

// Pantalla de bienvenida de Timelux sobre rojo institucional.
// Client Component porque orquesta el ciclo de salida con temporizadores.

import { useEffect, useState } from "react";
import Image from "next/image";

// Preloader a pantalla completa con salida garantizada en tres fases.
export default function Preloader(): React.JSX.Element | null {
  // Presencia total del componente en el DOM.
  const [mounted, setMounted] = useState<boolean>(true);
  // Fase de desvanecido suave antes de desmontar.
  const [isFading, setIsFading] = useState<boolean>(false);
  // Avance visible de la barra de progreso (nace vacía y llega al 100%).
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // 1. Simular carga de progreso rápida.
    const timerProgress: number = window.setTimeout(() => {
      setProgress(100);
    }, 400);

    // 2. Iniciar desvanecimiento (fade-out) tras completarse.
    const timerFade: number = window.setTimeout(() => {
      setIsFading(true);
    }, 1100);

    // 3. Desmontar completamente del DOM para liberar clics y scroll.
    const timerUnmount: number = window.setTimeout(() => {
      setMounted(false);
    }, 1700);

    return () => {
      window.clearTimeout(timerProgress);
      window.clearTimeout(timerFade);
      window.clearTimeout(timerUnmount);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Cargando Timelux"
      className={`fixed inset-0 z-[9999] flex select-none flex-col items-center justify-center bg-[#c40a0a] transition-opacity duration-600 ease-out ${
        isFading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Contenedor central */}
      <div className="flex flex-col items-center px-6">
        {/* Logo Timelux blanco en gran formato */}
        <div className="relative mb-6 h-auto w-64 scale-100 transform transition-transform duration-700 ease-out sm:w-80 md:w-96">
          <Image
            src="/logo-sinFondo.png"
            alt="Timelux Perfumes"
            width={400}
            height={120}
            priority
            className="h-auto w-full object-contain drop-shadow-sm"
          />
        </div>

        {/* Subtexto en blanco */}
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/90 sm:text-sm">
          Alta Perfumería
        </p>

        {/* Barra de progreso en blanco */}
        <div className="h-[3px] w-48 overflow-hidden rounded-full bg-white/20 sm:w-56">
          <div
            className="h-full rounded-full bg-white transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
