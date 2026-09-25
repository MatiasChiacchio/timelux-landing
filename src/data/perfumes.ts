// Catálogo inicial de fragancias Timelux.
// Tres creaciones árabes y tres de diseñador con pirámide olfativa.

import type { Perfume } from "@/src/types/perfume";

// Lista base de perfumes para la vitrina del catálogo.
export const perfumes: Perfume[] = [
  {
    id: "khamrah-lattafa",
    nombre: "Khamrah",
    marca: "Lattafa",
    tipo: "arabe",
    mililitros: 100,
    bestseller: true,
    descripcionCorta:
      "Cálido y especiado con dátiles y vainilla, ideal para noches memorables.",
    notas: {
      salida: ["canela", "nuez moscada", "bergamota"],
      corazon: ["dátiles", "praliné", "nardo"],
      fondo: ["vainilla", "haba tonka", "mirra"],
    },
    imagenUrl: "/perfumes/khamrah-lattafa.png",
  },
  {
    id: "club-de-nuit-intense-armaf",
    nombre: "Club de Nuit Intense Man",
    marca: "Armaf",
    tipo: "arabe",
    mililitros: 105,
    bestseller: true,
    descripcionCorta:
      "Ahumado y magnético con piña y abedul, estela intensa de larga duración.",
    notas: {
      salida: ["limón", "piña", "bergamota"],
      corazon: ["abedul", "jazmín", "rosa"],
      fondo: ["almizcle", "vainilla", "ámbar gris"],
    },
    imagenUrl: "/perfumes/club-de-nuit-intense-armaf.png",
  },
  {
    id: "9pm-afnan",
    nombre: "9PM",
    marca: "Afnan",
    tipo: "arabe",
    mililitros: 100,
    descripcionCorta:
      "Dulce nocturno de manzana y vainilla, perfecto para salidas y eventos.",
    notas: {
      salida: ["manzana", "canela", "lavanda"],
      corazon: ["flor de azahar", "lirio"],
      fondo: ["vainilla", "haba tonka", "pachulí"],
    },
    imagenUrl: "/perfumes/9pm-afnan.png",
  },
  {
    id: "sauvage-dior",
    nombre: "Sauvage",
    marca: "Dior",
    tipo: "disenador",
    mililitros: 100,
    bestseller: true,
    descripcionCorta:
      "Fresco y salvaje con bergamota y ambroxan, el clásico versátil de diario.",
    notas: {
      salida: ["bergamota", "pimienta"],
      corazon: ["lavanda", "geranio", "pimienta de Sichuán"],
      fondo: ["ambroxan", "cedro", "ládano"],
    },
    imagenUrl: "/perfumes/sauvage-dior.png",
  },
  {
    id: "tobacco-vanille-tom-ford",
    nombre: "Tobacco Vanille",
    marca: "Tom Ford",
    tipo: "disenador",
    mililitros: 100,
    descripcionCorta:
      "Opulento tabaco con vainilla y maderas, lujo cálido para climas frescos.",
    notas: {
      salida: ["hojas de tabaco", "especias"],
      corazon: ["vainilla", "haba tonka", "flor de tabaco"],
      fondo: ["maderas secas", "cuero"],
    },
    imagenUrl: "/perfumes/tobacco-vanille-tom-ford.png",
  },
  {
    id: "bleu-de-chanel",
    nombre: "Bleu de Chanel",
    marca: "Chanel",
    tipo: "disenador",
    mililitros: 100,
    descripcionCorta:
      "Elegante cítrico amaderado con incienso, sofisticación para todo el día.",
    notas: {
      salida: ["toronja", "limón", "menta"],
      corazon: ["jengibre", "nuez moscada", "jazmín"],
      fondo: ["incienso", "cedro", "sándalo"],
    },
    imagenUrl: "/perfumes/bleu-de-chanel.png",
  },
];
