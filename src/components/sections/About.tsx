// Sección institucional de Timelux.
// Server Component: contenido estático sin estado ni eventos.

import { Gem, HeartHandshake, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Pilar de valor con icono, título y descripción.
interface PilarTimelux {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
}

// Tres pilares que sostienen la propuesta de Timelux.
const pilares: PilarTimelux[] = [
  {
    icono: Gem,
    titulo: "Curaduría Exclusiva",
    descripcion:
      "Selección de piezas icónicas con proyección y estela destacadas.",
  },
  {
    icono: ShieldCheck,
    titulo: "100% Autenticidad",
    descripcion: "Fragancias originales y presentaciones selladas.",
  },
  {
    icono: HeartHandshake,
    titulo: "Atención Cercana",
    descripcion: "Asesoramiento honesto adaptado a gustos y ocasiones.",
  },
];

// Notas destacadas que visten la vitrina editorial.
const notasDestacadas: string[] = [
  "Oud",
  "Ámbar",
  "Vainilla",
  "Bergamota",
  "Cuero",
];

// Historia, propuesta de valor y vitrina editorial de la marca.
export default function About(): React.JSX.Element {
  return (
    <section id="nosotros" className="bg-[#fffff4]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* Columna editorial: relato y pilares */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#a6caeb]">
            Nosotros · Timelux
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#141416] sm:text-4xl">
            El arte de encontrar tu firma olfativa
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5e626e] sm:text-base">
            En Timelux creemos que un perfume no se elige apurado: se descubre.
            Por eso hacemos una curaduría minuciosa de cada fragancia que
            ofrecemos, desde los dupes árabes más celebrados hasta los perfumes
            de autor que marcaron época.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#5e626e] sm:text-base">
            Trabajamos únicamente con piezas originales y presentaciones
            selladas, y te acompañamos con asesoría personalizada para que
            encuentres esa estela que habla de vos antes de que digas una
            palabra.
          </p>

          {/* Pilares de confianza */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {pilares.map((pilar: PilarTimelux) => (
              <li
                key={pilar.titulo}
                className="rounded-xl border border-[#a6caeb]/30 bg-white/80 p-4"
              >
                <pilar.icono
                  size={22}
                  aria-hidden="true"
                  className="text-[#c40a0a]"
                />
                <h3 className="mt-3 text-sm font-bold text-[#141416]">
                  {pilar.titulo}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#5e626e]">
                  {pilar.descripcion}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna visual: vitrina con estética de revista de lujo */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2rem] bg-[#a6caeb]/20 blur-2xl"
          />
          <article className="relative overflow-hidden rounded-3xl border border-[#a6caeb]/30 bg-white/90 p-8 shadow-sm sm:p-10">
            {/* Cenefa superior editorial */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5e626e]">
                Edición Timelux
              </p>
              <span
                aria-hidden="true"
                className="h-px w-16 bg-[#c40a0a]/40"
              />
            </div>

            <h3 className="mt-6 font-serif text-2xl leading-snug text-[#141416] sm:text-3xl">
              “La estela que te anuncia antes de llegar.”
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#5e626e]">
              Cada pieza de nuestra vitrina se elige por su carácter: salida
              vibrante, corazón con presencia y un fondo que perdura en la piel
              y en la memoria.
            </p>

            {/* Notas destacadas */}
            <ul
              aria-label="Notas destacadas de la curaduría Timelux"
              className="mt-6 flex flex-wrap gap-1.5"
            >
              {notasDestacadas.map((nota: string) => (
                <li
                  key={nota}
                  className="rounded-md border border-[#a6caeb]/30 bg-[#a6caeb]/15 px-2 py-0.5 text-xs uppercase tracking-wider text-[#141416]"
                >
                  {nota}
                </li>
              ))}
            </ul>

            {/* Sello de autenticidad */}
            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c40a0a]/60 text-center text-[10px] font-bold uppercase leading-tight tracking-widest text-[#c40a0a]">
                100% Original
              </span>
              <p className="text-xs leading-relaxed text-[#5e626e]">
                Piezas originales,
                <br />
                presentaciones selladas.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
