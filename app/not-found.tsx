import type { Metadata } from "next";
import Link from "next/link";

// Título específico que se combina con el template "%s | Timelux".
export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La fragancia que buscás no está disponible. Volvé al catálogo de Timelux y encontrá tu esencia.",
  robots: {
    index: false,
    follow: false,
  },
};

// Página 404: Server Component sin interactividad, identidad Warm Ivory.
export default function PaginaNoEncontrada(): React.JSX.Element {
  return (
    <main
      aria-labelledby="titulo-404"
      className="flex flex-1 items-center justify-center bg-[#fffff4] px-6 py-20 text-center sm:py-28"
    >
      <div className="max-w-xl">
        <p className="text-sm font-medium tracking-[0.3em] text-[#1e3a5f] uppercase">
          Error 404
        </p>
        <h1
          id="titulo-404"
          className="mt-4 font-serif text-5xl leading-tight text-[#141416] sm:text-6xl"
        >
          Fragancia no encontrada
        </h1>
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-px w-24 bg-[#c40a0a]"
        />
        <p className="mt-6 text-base leading-relaxed text-[#5e626e] sm:text-lg">
          La página que buscás se evaporó como una salida cítrica: ya no está
          disponible o la dirección cambió. Te invitamos a volver al catálogo y
          descubrir tu próxima firma olfativa.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#c40a0a] px-8 py-3 text-base font-semibold text-[#fffff4] transition-all duration-300 ease-in-out hover:bg-[#a30808] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95 sm:w-auto"
          >
            Volver al inicio
          </Link>
          <Link
            href="/perfumes"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-[#a6caeb]/60 bg-white/90 px-8 py-3 text-base font-semibold text-[#141416] transition-all duration-300 ease-in-out hover:border-[#a6caeb] hover:bg-[#a6caeb]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4] active:scale-95 sm:w-auto"
          >
            Explorar el catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
