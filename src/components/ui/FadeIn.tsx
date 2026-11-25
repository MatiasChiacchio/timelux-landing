"use client";

// Entrada suave al hacer scroll mediante IntersectionObserver.
// Optimizado para no frenar ni provocar saltos visuales al deslizar rápido.

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Propiedades: contenido, clases extra y retardo escalonado en milisegundos.
interface PropiedadesFadeIn {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Envoltorio reutilizable con fundido ligero pre-disparado antes de entrar al viewport.
export function FadeIn({
  children,
  className = "",
  delay = 0,
}: PropiedadesFadeIn): React.JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const referencia = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const actual: HTMLDivElement | null = referencia.current;

    if (!actual) {
      return;
    }

    // Si ya está visible o arriba del fold al hidratar, revelar de inmediato.
    const rect: DOMRect = actual.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 80) {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas: IntersectionObserverEntry[]) => {
        const entrada: IntersectionObserverEntry | undefined = entradas[0];

        if (entrada && entrada.isIntersecting) {
          setVisible(true);
          observador.unobserve(entrada.target);
        }
      },
      { threshold: 0, rootMargin: "100px 0px 80px 0px" },
    );

    observador.observe(actual);

    return (): void => {
      observador.unobserve(actual);
    };
  }, []);

  return (
    <div
      ref={referencia}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
