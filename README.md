# Timelux — Perfumería Árabe & Diseñador

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5_Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Icons-Lucide-F56565?logo=lucide&logoColor=white)](https://lucide.dev/)
[![Vercel](https://img.shields.io/badge/Despliegue-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![Licencia](https://img.shields.io/badge/Licencia-Todos_los_derechos_reservados-c40a0a)](./README.md#10-créditos-y-licencia)

Vitrina digital y plataforma de curaduría de **perfumería árabe y fragancias de diseñador 100% originales**: catálogo dinámico alimentado desde Google Sheets, ficha olfativa en vista rápida, asesoría personalizada y conversión directa por WhatsApp, sin fricción de checkout.

---

## Índice

1. [Demostración y rutas del sitio](#1-demostración-y-rutas-del-sitio)
2. [Características principales](#2-características-principales)
3. [SEO, datos estructurados y rendimiento](#3-seo-datos-estructurados-y-rendimiento)
4. [Stack tecnológico y sistema visual](#4-stack-tecnológico-y-sistema-visual)
5. [Estructura del proyecto](#5-estructura-del-proyecto)
6. [Instalación y configuración local](#6-instalación-y-configuración-local)
7. [Variables de entorno](#7-variables-de-entorno)
8. [Modelo de datos y formato del CSV](#8-modelo-de-datos-y-formato-del-csv)
9. [Estándares de calidad y convenciones](#9-estándares-de-calidad-y-convenciones)
10. [Créditos y licencia](#10-créditos-y-licencia)

---

## 1. Demostración y rutas del sitio

| Ruta | Descripción | URL en producción |
|---|---|---|
| `/` | Portada editorial: Hero split, vitrina de 6 destacados (bestsellers) y cierre de asesoría/encargos | [timelux-perfumes.vercel.app](https://timelux-perfumes.vercel.app) |
| `/perfumes` | Catálogo completo con búsqueda, filtros combinados, ordenamiento y vista rápida olfativa | [timelux-perfumes.vercel.app/perfumes](https://timelux-perfumes.vercel.app/perfumes) |
| `/nosotros` | Historia de marca y pilares de confianza (curaduría, autenticidad y asesoría) | [timelux-perfumes.vercel.app/nosotros](https://timelux-perfumes.vercel.app/nosotros) |
| `/preguntas` | Preguntas frecuentes en acordeón y bloque unificado de medios de contacto | [timelux-perfumes.vercel.app/preguntas](https://timelux-perfumes.vercel.app/preguntas) |

> **Redirecciones y utilidades:** `/contacto` redirige permanentemente a `/preguntas` (definido en `next.config.ts`). Las rutas inexistentes muestran una página 404 personalizada (`app/not-found.tsx`) con estética Warm Ivory y `noindex, nofollow`.

---

## 2. Características principales

### Arquitectura boutique en 4 apartados

- **Portada concisa (`/`):** compuesta por `Hero` con contador real de fragancias, `Catalog` con los 6 bestsellers destacados y accesos rápidos a las colecciones Árabes y Diseñador, más `ConserjeriaOlfativa` para asesoramiento y encargos a pedido.
- **Cabeceras editoriales consistentes (`CabeceraSeccion`):** compartidas en `/perfumes`, `/nosotros` y `/preguntas` con migas de pan accesibles sincronizadas con `BreadcrumbList`.
- **Navegación institucional (`Navbar` y `Footer`):** barra fija sobre rojo insignia con detección de ruta activa, menú móvil con cierre por `Escape` y clic exterior, y pie de página compacto en 3 columnas.

### Catálogo dinámico e interactivo (`/perfumes`)

- **Fuente de datos resiliente:** consulta a Google Sheets publicado como CSV mediante `obtenerPerfumes()` con revalidación incremental horaria (ISR, `revalidate: 3600`), parser RFC 4180 propio y respaldo local automático en `src/data/perfumes.ts`.
- **Búsqueda y filtros combinados:** búsqueda en tiempo real tolerante a tildes (`useDeferredValue`) por nombre, marca y notas; filtros por origen (`Todos` / `Árabes` / `Diseñador`) y género (`Todos` / `Hombre` / `Mujer` / `Unisex`).
- **Controles accesibles a medida:** selector de casas perfumistas (`ComboboxMarcas`) y selector de ordenamiento (`SelectorOrden`: destacados primero, menor precio, mayor precio, nombre A–Z) con soporte de teclado, cierre por `Escape` y roles ARIA.
- **Filtros por URL y carga progresiva:** sincronización opcional de parámetros (`?tipo=`, `?genero=`, `?marca=`, `?orden=`, `?q=`) envuelta en `Suspense` sin perder prerenderizado estático/ISR, y paginación en tandas de 20 (`TANDA_CARGA_CATALOGO`).
- **Vista Rápida y Ficha Olfativa (`ModalDetallePerfume`):** modal editorial accesible (bloqueo de scroll, cierre con `Escape` y restauración de foco) con imagen ampliada, pirámide olfativa (salida, corazón y fondo), descripción y consulta directa o por fragancias similares.

### Conversión directa por WhatsApp

- **Sin checkout ni pasarela de pagos:** todos los enlaces se generan con `getWhatsAppLink()` (`src/config/site.ts`) y `enlaceWhatsAppPerfume()` (`src/lib/perfumes.ts`), codificando nombre, marca y precio en ARS con `encodeURIComponent`.
- **Puntos de contacto unificados:** cada tarjeta y modal de perfume, CTAs de portada, bloque de contacto en `/preguntas`, pie de página y botón flotante global (`WhatsAppFloatingButton`).

---

## 3. SEO, datos estructurados y rendimiento

- **Datos estructurados JSON-LD (`src/lib/schema.ts` y `JsonLd.tsx`):**
  - Globales en `app/layout.tsx`: `Organization` y `WebSite`.
  - Por ruta: `BreadcrumbList` en `/perfumes`, `/nosotros` y `/preguntas`.
  - En `/perfumes`: `ItemList` + nodos `Product` con `Offer` en `ARS` para la primera tanda visible (`TANDA_CARGA_CATALOGO`), con serialización segura frente a XSS.
- **Indexación y metadatos:** `app/robots.ts`, `app/sitemap.ts` con las 4 rutas indexables, URLs canónicas por página, `metadataBase` basado en `NEXT_PUBLIC_SITE_URL` y verificación de Google Search Console.
- **Open Graph e iconos dinámicos:**
  - `app/opengraph-image.tsx`: tarjeta panorámica `1200×630` generada con `ImageResponse` en estética Warm Ivory.
  - `app/icon.svg`: favicon SVG adaptativo (`prefers-color-scheme`) más `app/icon.tsx` (`32×32`) y `app/apple-icon.tsx` (`180×180`).
- **Optimización de medios y fluidez:** `next/image` con formatos `AVIF` y `WebP`, `minimumCacheTTL: 604800` (7 días), `sizes` calibrados por grilla (`src/config/catalogo.ts`), eliminación de preloaders y animaciones costosas en scroll, y soporte estricto de `prefers-reduced-motion`.

---

## 4. Stack tecnológico y sistema visual

| Capa | Tecnología | Detalle |
|---|---|---|
| Framework | Next.js 16 (App Router) | React Server Components por defecto; `'use client'` solo para estado/eventos |
| Librería UI | React 19 | Componentes funcionales, `Suspense` y `useDeferredValue` |
| Lenguaje | TypeScript 5 (estricto) | Sin `any`; contratos tipados en `src/types/` |
| Estilos | Tailwind CSS 4 | Enfoque Mobile-First y tokens `@theme inline` en `app/globals.css` |
| Tipografía | `next/font/google` | `Cormorant Garamond` (serif editorial) y `Plus Jakarta Sans` (interfaz y cuerpo) |
| Iconografía | `lucide-react` | Icono de Instagram como SVG propio (`IconoInstagram`) |
| Imágenes | `next/image` | AVIF/WebP, `sizes` por grilla y respaldo local `/placeholder-perfume.svg` |
| Datos | Google Sheets → CSV | Fetch en servidor con ISR (`revalidate: 3600`) y respaldo estático |
| Despliegue | Vercel | Build estático + ISR |

### Paleta institucional (Warm Ivory / Light Luxury)

| Token CSS | Hex | Uso |
|---|---|---|
| `--color-timelux-bg` | `#fffff4` | Fondo base marfil cálido y texto sobre rojo |
| `--color-timelux-red` | `#c40a0a` | Marca, CTAs de conversión, Navbar y Footer |
| `--color-timelux-red-hover` | `#a30808` | Estados hover sobre rojo |
| `--color-timelux-sky` | `#a6caeb` | Bordes, superficies translúcidas e insignias (no se usa como texto) |
| `--color-timelux-sky-mid` | `#7bb4e3` | Detalles decorativos |
| `--color-timelux-dark` | `#141416` | Títulos, precios y texto principal |
| `--color-timelux-muted` | `#5e626e` | Descripciones, metadatos y placeholders |
| `--color-timelux-accent` | `#1e3a5f` | Eyebrows, enlaces y texto de acento accesible |

> La interfaz oficial es exclusivamente clara (**Warm Ivory / Light Luxury**). Todo texto normal respeta contraste mínimo `4,5:1` y todo control interactivo mantiene foco visible y objetivo táctil mínimo de `44 × 44 px`.

---

## 5. Estructura del proyecto

```text
timelux-landing/
├── app/                                # Rutas y metadatos (Next.js App Router)
│   ├── layout.tsx                      # Layout raíz, fuentes Google, SEO y JSON-LD global
│   ├── page.tsx                        # Portada (Hero, 6 destacados y ConserjeriaOlfativa)
│   ├── globals.css                     # Tokens Tailwind v4, animaciones y reduced-motion
│   ├── not-found.tsx                   # Página 404 Warm Ivory (noindex, nofollow)
│   ├── opengraph-image.tsx             # Tarjeta Open Graph dinámica 1200×630
│   ├── icon.svg                        # Favicon SVG adaptativo claro/oscuro
│   ├── icon.tsx                        # Favicon PNG 32×32 (ImageResponse)
│   ├── apple-icon.tsx                  # Apple Touch Icon 180×180
│   ├── robots.ts                       # Reglas de rastreo y referencia al sitemap
│   ├── sitemap.ts                      # Sitemap dinámico con los 4 apartados
│   ├── perfumes/
│   │   └── page.tsx                    # Catálogo completo (Server Component + ISR + JSON-LD)
│   ├── nosotros/
│   │   └── page.tsx                    # Apartado institucional Nosotros
│   └── preguntas/
│       └── page.tsx                    # Apartado unificado Preguntas frecuentes y Contacto
├── src/
│   ├── components/
│   │   ├── common/                     # WhatsAppFloatingButton.tsx
│   │   ├── layout/                     # Navbar.tsx, Footer.tsx, CabeceraSeccion.tsx
│   │   ├── perfumes/                   # CatalogoCompleto.tsx, TarjetaPerfume.tsx,
│   │   │                               # ModalDetallePerfume.tsx, ComboboxMarcas.tsx,
│   │   │                               # SelectorOrden.tsx
│   │   ├── sections/                   # Hero.tsx, Catalog.tsx, ConserjeriaOlfativa.tsx,
│   │   │                               # About.tsx, Faq.tsx
│   │   ├── seo/                        # JsonLd.tsx
│   │   └── ui/                         # ImagenPerfume.tsx, IconoInstagram.tsx
│   ├── config/
│   │   ├── site.ts                     # Marca, URL canónica, WhatsApp, Instagram y navegación
│   │   └── catalogo.ts                 # Tanda de paginación (20) y sizes por grilla
│   ├── data/
│   │   └── perfumes.ts                 # Catálogo local de respaldo (6 fragancias)
│   ├── lib/
│   │   ├── perfumes.ts                 # Formato ARS, etiquetas, anclas y enlaces WhatsApp
│   │   └── schema.ts                   # Constructores JSON-LD (Organization, Product, etc.)
│   ├── services/
│   │   └── perfumes.ts                 # Fetch CSV con ISR, parser RFC 4180 y normalización
│   └── types/
│       └── perfume.ts                  # Tipos CategoriaPerfume, GeneroPerfume, NotasOlfativas y Perfume
├── public/                             # Logotipos, fotografía hero y placeholder
│   ├── hero-perfumeria.jpg             # Fotografía editorial de portada
│   ├── logo-timelux-blanco.png         # Logotipo blanco para Navbar, Footer y Open Graph
│   ├── logo.png                        # Monograma institucional (respaldo schema.org)
│   └── placeholder-perfume.svg         # Imagen de respaldo para productos sin foto
├── next.config.ts                      # AVIF/WebP, remotePatterns HTTPS y redirect /contacto
├── tsconfig.json                       # TypeScript estricto y alias @/src/*
├── AGENTS.md                           # Directrices del proyecto y skills locales
└── package.json                        # Dependencias y scripts
```

---

## 6. Instalación y configuración local

### Requisitos previos

- Node.js 20 o superior.
- npm (o gestor compatible).
- Acceso de lectura al Google Sheet publicado como CSV (opcional: si no responde, se usa automáticamente `src/data/perfumes.ts`).

### Paso a paso

```bash
git clone <url-del-repositorio>
cd timelux-landing
npm install
npm run dev
```

La aplicación queda disponible en [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| Desarrollo | `npm run dev` | Servidor local con recarga en caliente |
| Compilación | `npm run build` | Build de producción y verificación de tipos |
| Producción | `npm run start` | Sirve la compilación generada |
| Linter | `npm run lint` | Análisis estático con ESLint (`eslint-config-next`) |
| Tipos | `npx tsc --noEmit` | Verificación estricta de TypeScript sin emitir archivos |

---

## 7. Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto (no versionado):

```bash
# URL pública del catálogo (Google Sheets publicado como CSV).
NEXT_PUBLIC_CATALOG_CSV_URL="https://docs.google.com/spreadsheets/d/e/<ID>/pub?output=csv"

# URL canónica del sitio para SEO, Open Graph, sitemap y JSON-LD
# (opcional; por defecto https://timelux-perfumes.vercel.app).
NEXT_PUBLIC_SITE_URL="https://timelux-perfumes.vercel.app"
```

---

## 8. Modelo de datos y formato del CSV

Contrato tipado definido en `src/types/perfume.ts`:

```ts
export type CategoriaPerfume = "todos" | "arabe" | "disenador";
export type GeneroPerfume = "hombre" | "mujer" | "unisex";

export interface NotasOlfativas {
  salida: string[];
  corazon: string[];
  fondo: string[];
}

export interface Perfume {
  id: string;
  nombre: string;
  marca: string;
  tipo: "arabe" | "disenador";
  genero: GeneroPerfume;
  mililitros: number;
  precio: number;
  bestseller?: boolean;
  descripcionCorta: string;
  notas: NotasOlfativas;
  imagenUrl: string;
}
```

### Columnas admitidas en Google Sheets (`src/services/perfumes.ts`)

- **Publicación:** solo se incluyen filas con `disponible` igual a `TRUE` y con `id` y `nombre` completos.
- **Identificación y catálogo:** `id`, `nombre`, `marca`, `tipo` (`arabe` o `disenador`), `mililitros` (por defecto `100`), `precio` (saneado automáticamente desde formatos como `$ 68.000` o `68.000,50`), `bestseller` (`TRUE`).
- **Género:** acepta `genero`, `género` o `sexo` y normaliza variantes (`hombre`/`masculino`, `mujer`/`femenino`, por defecto `unisex`).
- **Descripción e imagen:** `descripcion` o `descripcioncorta`; `imagenurl`, `imagen` o `imagen_url` (respaldo `/placeholder-perfume.svg`).
- **Notas olfativas:** columna unificada `notas` (separadas por coma) o tríada separada `notas_salida`, `notas_corazon` y `notas_fondo`.

---

## 9. Estándares de calidad y convenciones

- Todo el código, comentarios, documentación y mensajes de commit se redactan estrictamente en **español**.
- Antes de publicar cambios se valida:
  - `npx tsc --noEmit` sin errores.
  - `npm run lint` sin advertencias ni errores.
  - `npm run build` exitoso.
- Commits bajo *Conventional Commits* en español:

| Prefijo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad o componente visual |
| `fix:` | Corrección de errores o enlaces caídos |
| `estilo:` | Modificaciones de estilos, espaciados o colores |
| `docs:` | Actualización de documentación técnica |
| `refactor:` | Mejora de arquitectura sin alterar el comportamiento visual |

---

## 10. Créditos y licencia

**Timelux — Perfumería Árabe & Diseñador.** Marca y contenidos de su exclusiva propiedad. Todos los derechos reservados.

El código fuente de este repositorio se distribuye únicamente con fines de operación y mantenimiento del sitio oficial. Queda prohibida su reproducción, redistribución o uso comercial sin autorización expresa de Timelux.

- **WhatsApp:** +54 370 4772001 (lunes a sábado, de 9 a 20 h).
- **Instagram:** [@timelux.perfumes](https://www.instagram.com/timelux.perfumes/).
