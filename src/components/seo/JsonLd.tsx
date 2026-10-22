// Inyector de datos estructurados JSON-LD.
// Server Component: el script se renderiza en el HTML inicial, sin hidratación.

import { serializarJsonLd, type JsonLdGrafo } from "@/src/lib/schema";

interface PropiedadesJsonLd {
  datos: JsonLdGrafo;
}

export default function JsonLd({
  datos,
}: PropiedadesJsonLd): React.JSX.Element {
  // La serialización escapa "<" y separadores Unicode para evitar XSS.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializarJsonLd(datos) }}
    />
  );
}
