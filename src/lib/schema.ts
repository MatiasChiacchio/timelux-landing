// Datos estructurados JSON-LD de Timelux.
// Centraliza la construcción de Organization, WebSite, Product, Offer y
// BreadcrumbList para reutilizarlos en el layout y en las páginas.

import {
  baseUrl,
  instagramUrl,
  name as nombreSitio,
  whatsappNumber,
} from "@/src/config/site";
import { anclaPerfume } from "@/src/lib/perfumes";
import type { Perfume } from "@/src/types/perfume";

// Nodo genérico de schema.org. El índice permite propiedades opcionales
// (brand, offers, description) sin recurrir a `any`.
export interface JsonLdNodo {
  "@type": string;
  "@id"?: string;
  [clave: string]: unknown;
}

// Grafo JSON-LD con el contexto compartido y todos los nodos de la página.
export interface JsonLdGrafo {
  "@context": "https://schema.org";
  "@graph": JsonLdNodo[];
}

// Elemento de migas de pan con nombre visible y URL absoluta.
export interface ElementoBreadcrumb {
  nombre: string;
  url: string;
}

const DESCRIPCION_SITIO: string =
  "Perfumería árabe y de diseñador 100% original. Curaduría exclusiva de fragancias con fijación duradera y envíos a todo el país.";

// Agrupa varios nodos en un único bloque @graph.
export function crearGrafo(nodos: JsonLdNodo[]): JsonLdGrafo {
  return {
    "@context": "https://schema.org",
    "@graph": nodos,
  };
}

// Serializa el grafo y neutraliza caracteres que podrían cerrar el <script>
// o romper el parser (XSS por `</script>` y separadores de línea Unicode).
export function serializarJsonLd(grafo: JsonLdGrafo): string {
  return JSON.stringify(grafo)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

// Convierte una ruta o URL en absoluta para cumplir con schema.org.
function urlAbsoluta(ruta: string): string {
  const limpia: string = ruta.trim();

  if (!limpia) {
    return `${baseUrl}/logo.png`;
  }

  if (/^https?:\/\//i.test(limpia)) {
    return limpia;
  }

  return `${baseUrl}/${limpia.replace(/^\/+/, "")}`;
}

// URL pública de un perfume: ancla estable dentro del catálogo.
function urlPerfume(perfume: Perfume): string {
  return `${baseUrl}/perfumes#${anclaPerfume(perfume)}`;
}

// Organización: identidad, logo, Instagram y canal de contacto institucional.
export function crearOrganizationSchema(): JsonLdNodo {
  return {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: nombreSitio,
    alternateName: "Timelux Perfumería",
    url: baseUrl,
    description: DESCRIPCION_SITIO,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 500,
      height: 500,
    },
    sameAs: [instagramUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${whatsappNumber}`,
        contactType: "customer service",
        areaServed: { "@type": "Country", name: "Argentina" },
        availableLanguage: ["es"],
      },
    ],
  };
}

// WebSite: identidad del sitio y vínculo con la organización.
// No se declara SearchAction porque el catálogo no expone una URL de
// búsqueda con parámetros; la URL canónica se define en los metadatos.
export function crearWebSiteSchema(): JsonLdNodo {
  return {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: nombreSitio,
    description: DESCRIPCION_SITIO,
    inLanguage: "es-AR",
    publisher: { "@id": `${baseUrl}/#organization` },
  };
}

// Migas de pan de una ruta interna.
export function crearBreadcrumbSchema(
  elementos: ElementoBreadcrumb[],
  id?: string,
): JsonLdNodo {
  const nodo: JsonLdNodo = {
    "@type": "BreadcrumbList",
    itemListElement: elementos.map((elemento: ElementoBreadcrumb, indice: number) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: elemento.nombre,
      item: elemento.url,
    })),
  };

  if (id) {
    nodo["@id"] = id;
  }

  return nodo;
}

// Producto del catálogo con su oferta en pesos argentinos.
// Solo se declara `offers` cuando hay un precio válido: un precio 0 sería
// información incorrecta y Google lo rechazaría.
export function crearProductoSchema(perfume: Perfume): JsonLdNodo {
  const url: string = urlPerfume(perfume);
  const marca: string = perfume.marca.trim();

  const producto: JsonLdNodo = {
    "@type": "Product",
    "@id": url,
    name: perfume.nombre,
    url,
    sku: perfume.id,
    category: perfume.tipo === "arabe" ? "Perfume árabe" : "Perfume de diseñador",
    size: `${perfume.mililitros} ml`,
    image: urlAbsoluta(perfume.imagenUrl || "/logo.png"),
  };

  if (marca.length > 0) {
    producto.brand = { "@type": "Brand", name: marca };
  }

  const descripcion: string = perfume.descripcionCorta.trim();
  if (descripcion.length > 0) {
    producto.description = descripcion;
  }

  if (perfume.precio > 0) {
    producto.offers = {
      "@type": "Offer",
      url,
      price: perfume.precio,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${baseUrl}/#organization` },
    };
  }

  return producto;
}

// Lista ordenada del catálogo. Cada ListItem referencia al Product del grafo.
export function crearItemListSchema(perfumes: Perfume[]): JsonLdNodo {
  return {
    "@type": "ItemList",
    "@id": `${baseUrl}/perfumes#catalogo`,
    name: "Catálogo de fragancias Timelux",
    numberOfItems: perfumes.length,
    itemListElement: perfumes.map((perfume: Perfume, indice: number) => ({
      "@type": "ListItem",
      position: indice + 1,
      item: { "@id": urlPerfume(perfume) },
    })),
  };
}
