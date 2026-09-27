"use client";

// Entrada suave al hacer scroll mediante IntersectionObserver.
// Client Component ligero: revela el contenido una sola vez al entrar en vista.

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Propiedades: contenido, clases extra y retardo escalonado en milisegundos.
interface PropiedadesFadeIn {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Envoltorio reutilizable con fundido y desplazamiento vertical sutil.
export function FadeIn({
  children,
  className = "",
  delay = 0,
}: PropiedadesFadeIn): React.JSX.Element {
  // Visibilidad del contenido según su intersección con la vista.
  const [visible, setVisible] = useState<boolean>(false);
  const referencia = useRef<HTMLDivElement>(null);

  // Observa la entrada en vista y libera el observador al revelarse.
  useEffect(() => {
    const actual: HTMLDivElement | null = referencia.current;

    if (!actual) {
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
      { threshold: 0.1 },
    );

    observador.observe(actual);

    return (): void => {
      observador.unobserve(actual);
    };
  }, []);

  return (
    <div
      ref={referencia}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
