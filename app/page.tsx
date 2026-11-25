// Página principal de Timelux.
// Server Component: portada editorial liviana centrada en colecciones, 6 destacados y conserjería.

import Hero from "@/src/components/sections/Hero";
import MundosOlfativos from "@/src/components/sections/MundosOlfativos";
import Catalog from "@/src/components/sections/Catalog";
import ConserjeriaOlfativa from "@/src/components/sections/ConserjeriaOlfativa";
import { obtenerPerfumes } from "@/src/services/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Portada con Hero, mundos olfativos, 6 bestsellers curados y conserjería olfativa.
export default async function Home(): Promise<React.JSX.Element> {
  // Catálogo remoto con respaldo estático ante fallos de red.
  const perfumes: Perfume[] = await obtenerPerfumes();

  // Conteos calculados en el servidor para enriquecer Hero y MundosOlfativos.
  const totalArabes: number = perfumes.filter(
    (p: Perfume) => p.tipo === "arabe",
  ).length;
  const totalDisenador: number = perfumes.length - totalArabes;
  const totalBestsellers: number = perfumes.filter(
    (p: Perfume) => p.bestseller === true,
  ).length;

  // Solo se serializan los 6 destacados hacia el componente cliente de la portada.
  const destacados: Perfume[] = [...perfumes]
    .sort(
      (a: Perfume, b: Perfume) =>
        Number(b.bestseller === true) - Number(a.bestseller === true),
    )
    .slice(0, 6);

  return (
    <main className="flex-1 bg-[#fffff4]">
      {/* Portada principal en composición Split editorial */}
      <Hero totalPerfumes={perfumes.length} />

      {/* Puertas editoriales a las colecciones del catálogo */}
      <MundosOlfativos
        totalArabes={totalArabes}
        totalDisenador={totalDisenador}
        totalBestsellers={totalBestsellers}
      />

      {/* Vitrina curada de 6 bestsellers con Vista Rápida y enlace al catálogo */}
      <Catalog
        perfumesIniciales={destacados}
        totalCatalogo={perfumes.length}
        mostrarBuscador={false}
        mostrarEnlaceCatalogo
      />

      {/* Conserjería olfativa y gestión de perfumes por encargo */}
      <ConserjeriaOlfativa />
    </main>
  );
}
