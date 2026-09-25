// Modelo de datos del catálogo de fragancias Timelux.
// Tipos estrictos para categorías, notas olfativas y perfumes.

// Filtro de categoría usado por las pestañas del catálogo.
export type CategoriaPerfume = "todos" | "arabe" | "disenador";

// Pirámide olfativa de cada fragancia.
export interface NotasOlfativas {
  salida: string[];
  corazon: string[];
  fondo: string[];
}

// Fragancia del catálogo con datos de conversión a WhatsApp.
export interface Perfume {
  id: string;
  nombre: string;
  marca: string;
  tipo: "arabe" | "disenador";
  mililitros: number;
  precio: number;
  bestseller?: boolean;
  descripcionCorta: string;
  notas: NotasOlfativas;
  imagenUrl: string;
}
