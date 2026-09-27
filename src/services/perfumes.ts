// Servicio del catálogo dinámico de Timelux.
// Obtiene las fragancias desde Google Sheets (CSV) con ISR y usa
// el catálogo estático como respaldo resiliente ante fallos de red.

import { perfumes as perfumesRespaldo } from "@/src/data/perfumes";
import type { GeneroPerfume, NotasOlfativas, Perfume } from "@/src/types/perfume";

// URL directa al CSV publicado (respaldo si la variable de entorno falta).
const URL_CSV_RESPALDO: string =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDnpBnoWRHFMRPuWzx_6PAkQHsaQ5C84mGPFIrV41Zj6IjVMHIaDTECMpApBIcQRIPPDcTin9T7vps/pub?output=csv";

// Imagen de respaldo cuando la fila no trae URL.
const IMAGEN_REPALDO: string = "/logo.png";

// Limpia espacios y comillas residuales de una celda del CSV.
function limpiarCelda(valor: string): string {
  return valor.trim().replace(/^"+|"+$/g, "").trim();
}

// Divide un texto de notas por comas y descarta fragmentos vacíos.
function dividirNotas(valor: string): string[] {
  return limpiarCelda(valor)
    .split(",")
    .map((nota: string) => nota.trim())
    .filter((nota: string) => nota.length > 0);
}

// Sanea un precio con formato monetario ("$ 68.000", "68.000,50") a número.
function sanearPrecio(valor: string): number {
  const limpio: string = limpiarCelda(valor).replace(/[^0-9.,-]/g, "");

  if (!limpio) {
    return 0;
  }

  let normalizado: string = limpio;

  if (limpio.includes(".") && limpio.includes(",")) {
    // Formato "68.000,50": puntos de miles y coma decimal.
    normalizado = limpio.replace(/\./g, "").replace(",", ".");
  } else if (limpio.includes(",")) {
    // Solo coma: se interpreta como separador decimal.
    normalizado = limpio.replace(",", ".");
  } else if (limpio.includes(".")) {
    // Solo puntos: se interpretan como separadores de miles.
    normalizado = limpio.replace(/\./g, "");
  }

  const numero: number = Number(normalizado);

  return Number.isFinite(numero) ? numero : 0;
}

// Parser CSV compatible con RFC 4180: respeta campos entrecomillados
// que contienen comas, saltos de línea y comillas escapadas ("").
function parsearCsv(contenido: string): string[][] {
  const filas: string[][] = [];
  let fila: string[] = [];
  let campo = "";
  let entreComillas = false;

  for (let i = 0; i < contenido.length; i++) {
    const caracter: string = contenido[i];

    if (entreComillas) {
      if (caracter === '"') {
        if (contenido[i + 1] === '"') {
          campo += '"';
          i++;
        } else {
          entreComillas = false;
        }
      } else {
        campo += caracter;
      }
      continue;
    }

    if (caracter === '"') {
      entreComillas = true;
    } else if (caracter === ",") {
      fila.push(campo);
      campo = "";
    } else if (caracter === "\n") {
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else if (caracter === "\r") {
      // Se ignora: el salto se procesa con "\n".
      continue;
    } else {
      campo += caracter;
    }
  }

  // Conserva la última fila aunque no termine en salto de línea.
  if (fila.length > 0 || campo.length > 0) {
    fila.push(campo);
    filas.push(fila);
  }

  // Descarta filas completamente vacías.
  return filas.filter((linea: string[]) =>
    linea.some((celda: string) => celda.trim().length > 0),
  );
}

// Normaliza el encabezado para buscar columnas sin importar mayúsculas.
function normalizarEncabezado(valor: string): string {
  return limpiarCelda(valor).toLowerCase();
}

// Lee una columna por nombre con posibles alias.
function leerColumna(
  fila: Record<string, string>,
  ...nombres: string[]
): string {
  for (const nombre of nombres) {
    const valor: string | undefined = fila[nombre];
    if (valor !== undefined && limpiarCelda(valor).length > 0) {
      return limpiarCelda(valor);
    }
  }
  return "";
}

// Resuelve la pirámide olfativa desde la columna unificada `notas`
// (ej.: "Canela, Nuez moscada, Bergamota") con fallback a la tríada
// `notas_salida` / `notas_corazon` / `notas_fondo`.
// La lista unificada puebla `salida` para que el buscador reactivo y las
// etiquetas de notas del catálogo funcionen transparentemente.
function resolverNotas(fila: Record<string, string>): NotasOlfativas {
  const unificadas: string = leerColumna(fila, "notas");

  if (unificadas.length > 0) {
    return { salida: dividirNotas(unificadas), corazon: [], fondo: [] };
  }

  return {
    salida: dividirNotas(fila["notas_salida"] ?? ""),
    corazon: dividirNotas(fila["notas_corazon"] ?? ""),
    fondo: dividirNotas(fila["notas_fondo"] ?? ""),
  };
}
// Resuelve el género desde la columna `genero` (acepta alias con tilde).
// Normaliza variantes ("masculino", "femenino") y usa "unisex" por defecto.
function resolverGenero(fila: Record<string, string>): GeneroPerfume {
  const crudo: string = leerColumna(fila, "genero", "género", "sexo")
    .toLowerCase()
    .trim();

  if (
    crudo === "hombre" ||
    crudo === "masculino" ||
    crudo === "caballero" ||
    crudo === "para hombre"
  ) {
    return "hombre";
  }

  if (
    crudo === "mujer" ||
    crudo === "femenino" ||
    crudo === "dama" ||
    crudo === "para mujer"
  ) {
    return "mujer";
  }

  return "unisex";
}

// Convierte el CSV en la lista de perfumes disponibles.
function mapearCsvAPerfumes(contenido: string): Perfume[] {
  const filas: string[][] = parsearCsv(contenido);

  if (filas.length < 2) {
    return [];
  }

  const encabezados: string[] = filas[0].map(normalizarEncabezado);
  const resultado: Perfume[] = [];

  for (const celdas of filas.slice(1)) {
    const fila: Record<string, string> = {};
    encabezados.forEach((encabezado: string, indice: number) => {
      fila[encabezado] = limpiarCelda(celdas[indice] ?? "");
    });

    // Solo se publican las filas marcadas como disponibles.
    if ((fila["disponible"] ?? "").toUpperCase() !== "TRUE") {
      continue;
    }

    const id: string = limpiarCelda(fila["id"] ?? "");
    const nombre: string = limpiarCelda(fila["nombre"] ?? "");

    if (!id || !nombre) {
      continue;
    }

    const tipoCrudo: string = limpiarCelda(fila["tipo"] ?? "").toLowerCase();
    const tipo: Perfume["tipo"] =
      tipoCrudo === "disenador" ? "disenador" : "arabe";

    resultado.push({
      id,
      nombre,
      marca: limpiarCelda(fila["marca"] ?? ""),
      tipo,
      genero: resolverGenero(fila),
      mililitros: Number(fila["mililitros"]) || 100,
      precio: sanearPrecio(fila["precio"] ?? ""),
      bestseller: (fila["bestseller"] ?? "").toUpperCase() === "TRUE",
      descripcionCorta: leerColumna(fila, "descripcion", "descripcioncorta"),
      notas: resolverNotas(fila),
      imagenUrl: leerColumna(fila, "imagenurl", "imagen", "imagen_url") || IMAGEN_REPALDO,
    });
  }

  return resultado;
}

// Obtiene el catálogo remoto con revalidación horaria (ISR).
// Ante cualquier fallo retorna el catálogo estático de respaldo.
export async function obtenerPerfumes(): Promise<Perfume[]> {
  const url: string =
    process.env.NEXT_PUBLIC_CATALOG_CSV_URL ?? URL_CSV_RESPALDO;

  try {
    const respuesta: Response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!respuesta.ok) {
      console.error(
        `Catálogo remoto no disponible (HTTP ${respuesta.status}). Se usa el respaldo estático.`,
      );
      return perfumesRespaldo;
    }

    const contenido: string = await respuesta.text();
    const remoto: Perfume[] = mapearCsvAPerfumes(contenido);

    if (remoto.length === 0) {
      console.error(
        "El CSV remoto no aportó fragancias disponibles. Se usa el respaldo estático.",
      );
      return perfumesRespaldo;
    }

    return remoto;
  } catch (error) {
    console.error("Error al obtener el catálogo remoto.", error);
    return perfumesRespaldo;
  }
}
