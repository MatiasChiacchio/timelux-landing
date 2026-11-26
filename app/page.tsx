// Página principal de Timelux.
// Server Component: portada clara y concisa en 3 bloques (Hero, 6 destacados y cierre WhatsApp).

import Hero from "@/src/components/sections/Hero";
import Catalog from "@/src/components/sections/Catalog";
import ConserjeriaOlfativa from "@/src/components/sections/ConserjeriaOlfativa";
import { obtenerPerfumes } from "@/src/services/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Portada enfocada con Hero, 6 destacados y acceso directo a WhatsApp.
export default async function Home(): Promise<React.JSX.Element> {
  // Catálogo remoto con respaldo estático ante fallos de red.
  const perfumes: Perfume[] = await obtenerPerfumes();

  // Solo se serializan los 6 destacados hacia el componente cliente de la portada.
  const destacados: Perfume[] = [...perfumes]
    .sort(
      (a: Perfume, b: Perfume) =>
        Number(b.bestseller === true) - Number(a.bestseller === true),
    )
    .slice(0, 6);

  return (
    <main className="flex-1 bg-[#fffff4]">
      {/* Portada limpia y directa */}
      <Hero totalPerfumes={perfumes.length} />

      {/* Vitrina curada de 6 bestsellers con accesos rápidos a Árabes y Diseñador */}
      <Catalog
        perfumesIniciales={destacados}
        totalCatalogo={perfumes.length}
        mostrarBuscador={false}
        mostrarAccesosTipo
        mostrarEnlaceCatalogo
      />

      {/* Cierre simple de asesoramiento y encargos a pedido */}
      <ConserjeriaOlfativa />
    </main>
  );
}
