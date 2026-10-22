// Configuración compartida del catálogo de Timelux.
// La primera tanda visible se reutiliza para los datos estructurados:
// el schema debe describir el contenido realmente renderizado.

export const TANDA_CARGA_CATALOGO: number = 20;

// Tamaño real de las tarjetas de la Home: 1, 2 y 3 columnas.
// Se descuentan el padding de página y el de cada tarjeta para que el
// navegador elija la variante optimizada más chica que siga viéndose nítida.
export const SIZES_TARJETA_DESTACADOS: string =
  "(max-width: 639px) calc(100vw - 72px), " +
  "(max-width: 767px) calc(50vw - 76px), " +
  "(max-width: 1023px) calc(50vw - 80px), " +
  "calc(33.33vw - 83px)";

// Tamaño real de las tarjetas de /perfumes: 2, 3 y 4 columnas.
export const SIZES_TARJETA_CATALOGO: string =
  "(max-width: 639px) calc(50vw - 64px), " +
  "(max-width: 767px) calc(50vw - 76px), " +
  "(max-width: 1023px) calc(33.33vw - 72px), " +
  "calc(25vw - 74px)";
