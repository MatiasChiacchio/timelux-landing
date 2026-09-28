# Timelux — Alta Perfumería & Fragancias de Autor

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5_Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Icons-Lucide-F56565?logo=lucide&logoColor=white)](https://lucide.dev/)
[![Vercel](https://img.shields.io/badge/Despliegue-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![Licencia](https://img.shields.io/badge/Licencia-Todos_los_derechos_reservados-c40a0a)](./README.md#9-créditos-y-licencia)

Plataforma de curaduría y vitrina digital de **perfumería árabe y fragancias de diseñador**: catálogo reactivo con 186 referencias, asesoría personalizada y conversión directa por WhatsApp, sin fricción de checkout.

---

## Índice

1. [Demostración y estado](#1-demostración-y-estado)
2. [Características principales](#2-características-principales)
3. [Stack tecnológico](#3-stack-tecnológico)
4. [Estructura del proyecto](#4-estructura-del-proyecto)
5. [Instalación y configuración local](#5-instalación-y-configuración-local)
6. [Variables de entorno](#6-variables-de-entorno)
7. [Estándares de calidad y convenciones](#7-estándares-de-calidad-y-convenciones)
8. [Modelo de datos del catálogo](#8-modelo-de-datos-del-catálogo)
9. [Créditos y licencia](#9-créditos-y-licencia)

---

## 1. Demostración y estado

| Entorno | URL |
|---|---|
| Producción (Vercel) | [https://timelux-perfumes.vercel.app](https://timelux-perfumes.vercel.app) |
| Catálogo completo | [https://timelux-perfumes.vercel.app/perfumes](https://timelux-perfumes.vercel.app/perfumes) |

> La URL canónica se configura con `NEXT_PUBLIC_SITE_URL` y alimenta `metadataBase` para SEO y Open Graph.

Experiencia de usuario:

- Diseño editorial refinado con tipografía serif de lujo y paleta institucional (marfil, rojo vívido, celeste pastel).
- Catálogo reactivo con búsqueda en tiempo real, filtrado por género y selector de marcas.
- Diseño adaptable Mobile-First y accesible (roles ARIA, foco visible, `prefers-reduced-motion`).

---

## 2. Características principales

### Catálogo dinámico e interactivo

- Búsqueda en tiempo real por nombre o marca, con contador de resultados anunciado vía `aria-live`.
- Selector de marcas con combobox animado y accesible (`ComboboxMarcas`): navegación por teclado, cierre con `Escape`, roles `listbox`/`option` y foco itinerante.
- Filtros por género (Todos / Hombre / Mujer / Unisex) y paginación progresiva en tandas de 20 (`Cargar más`).
- Página de inicio con selección de destacados (bestsellers primero) y página dedicada `/perfumes` con el catálogo completo.
- Fuente de datos: Google Sheets publicado como CSV, con revalidación incremental (ISR, `revalidate: 3600`).

### Diseño editorial y UI premium

- Tipografía serif de alto contraste, grillas editoriales asimétricas y microinteracciones suaves (`transition-all duration-300`, `backdrop-blur`).
- Animaciones de entrada con el componente `FadeIn` (IntersectionObserver, revelado único, retardo configurable).
- Respeto estricto a accesibilidad: `prefers-reduced-motion` desactiva traslados, fundidos y animaciones decorativas.

### Favicon adaptativo de alto rendimiento

- `app/icon.svg`: monograma institucional embebido que responde a `prefers-color-scheme` — blanco en modo oscuro, negro en modo claro — sin peticiones adicionales.
- `app/icon.tsx` / `app/apple-icon.tsx`: generación dinámica con `ImageResponse` (PNG 32×32 y 180×180) como respaldo para navegadores sin soporte de favicon SVG e iOS.

### Canal de conversión directo (WhatsApp)

- Sin checkout ni pasarela de pagos: cada tarjeta de producto genera un enlace `wa.me` con mensaje prearmado (nombre, marca y tipo de fragancia) codificado con `encodeURIComponent`.
- Botón flotante global, CTAs de sección y consulta directa, todos centralizados en un único número institucional.

### Pie de página y confianza

- Canales de atención institucional (WhatsApp, Instagram, horario de atención como texto no clicable).
- Columna de garantías: curaduría de autor, autenticidad y asesoría cercana.
- Navegación espejo del menú principal y barra legal con año dinámico.

---

## 3. Stack tecnológico

| Capa | Tecnología | Detalle |
|---|---|---|
| Framework | Next.js 16 (App Router) | React Server Components por defecto; `'use client'` solo donde hay estado o eventos |
| Librería UI | React 19 | Componentes funcionales y hooks |
| Lenguaje | TypeScript 5 (modo estricto) | Prohibido `any`; contratos en `src/types` |
| Estilos | Tailwind CSS 4 | Enfoque Mobile-First, tokens de paleta institucional |
| Iconografía | `lucide-react` | Icono de Instagram como SVG propio (`IconoInstagram`) por compatibilidad |
| Imágenes | `next/image` | Dimensiones y `alt` definidos; `unoptimized` con respaldo local |
| Animaciones y accesibilidad | CSS nativo + ARIA | Microinteracciones, roles `listbox`/`option`/`status`, `prefers-reduced-motion` |
| Datos | Google Sheets → CSV | Fetch en servidor con ISR (`revalidate: 3600`) |
| Compilador | Turbopack | Compilación y empaquetado de Next.js |
| Despliegue y CI | Vercel | Build estático/SSR por cada despliegue |

### Paleta institucional

| Token | Hex | Uso |
|---|---|---|
| Marfil | `#fffff4` | Fondos base |
| Rojo vívido | `#c40a0a` | Marca, CTAs, Navbar, Footer |
| Rojo profundo | `#a30808` | Bordes y estados hover |
| Celeste pastel | `#a6caeb` | Acentos y degradados |
| Celeste medio | `#7bb4e3` | Acentos secundarios |

---

## 4. Estructura del proyecto

```text
timelux-landing/
├── app/                            # Enrutamiento (App Router)
│   ├── layout.tsx                  # Layout raíz, metadata SEO/Open Graph, iconos
│   ├── page.tsx                    # Página principal (Hero, destacados, Nosotros, FAQ)
│   ├── globals.css                 # Estilos globales, animaciones y reduced-motion
│   ├── icon.tsx                    # Favicon PNG 32×32 generado (ImageResponse)
│   ├── icon.svg                    # Favicon SVG adaptativo claro/oscuro
│   ├── apple-icon.tsx              # Apple Touch Icon 180×180 generado
│   └── perfumes/
│       └── page.tsx                # Catálogo completo (Server Component + ISR)
├── src/
│   ├── components/
│   │   ├── layout/                 # Navbar.tsx, Footer.tsx
│   │   ├── sections/               # Hero.tsx, Catalog.tsx, About.tsx, Faq.tsx
│   │   ├── perfumes/               # TarjetaPerfume.tsx, CatalogoCompleto.tsx, ComboboxMarcas.tsx
│   │   ├── common/                 # WhatsAppFloatingButton.tsx
│   │   └── ui/                     # FadeIn.tsx, ImagenPerfume.tsx, Preloader.tsx, IconoInstagram.tsx
│   ├── config/
│   │   └── site.ts                 # Número de WhatsApp, enlaces de navegación, redes
│   ├── data/
│   │   └── perfumes.ts             # Catálogo local de respaldo
│   ├── lib/
│   │   └── perfumes.ts             # Formato de precios, etiquetas y enlaces WhatsApp
│   ├── services/
│   │   └── perfumes.ts             # Obtención y normalización del CSV remoto
│   └── types/
│       └── perfume.ts              # Contrato Perfume (género hombre|mujer|unisex)
├── public/                         # Logos e imágenes estáticas
│   ├── logo.png                    # Monograma sobre rojo (Open Graph)
│   ├── logo-sinFondo.png           # Logo para superficies rojas
│   ├── TimeluxBlanco-sinFondo.png  # Isotipo blanco (favicon)
│   └── Timelux.png                 # Marca completa
├── next.config.ts                  # Patrones remotos de imágenes
├── tsconfig.json                   # TypeScript estricto + alias @/src/*
├── .env.local                      # Variables de entorno locales (no versionado)
└── package.json                    # Dependencias y scripts
```

**Convenciones de arquitectura:**

- Componentes estáticos como **Server Components** (SEO y rendimiento); `'use client'` únicamente con estado o eventos (filtros, menú móvil, combobox).
- Componentes en `src/components/`, páginas y layout en `app/`, importaciones con alias `@/src/*`.
- Todo el código, comentarios, documentación y mensajes de commit se redactan en **español**.

---

## 5. Instalación y configuración local

### Requisitos previos

- Node.js 18 o superior.
- npm, pnpm o yarn (los ejemplos usan npm).
- Acceso de lectura al Google Sheet del catálogo (o uso del catálogo local de respaldo).

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
| Desarrollo | `npm run dev` | Servidor local con recarga en caliente (Turbopack) |
| Compilación | `npm run build` | Compilación de producción + verificación de tipos |
| Producción | `npm run start` | Sirve la compilación de producción |
| Linter | `npm run lint` | Análisis estático con ESLint (`eslint-config-next`) |
| Tipos | `npx tsc --noEmit` | Verificación de tipos sin emitir archivos |

---

## 6. Variables de entorno

Crear un archivo `.env.local` en la raíz (no se versiona):

```bash
# URL pública del catálogo (Google Sheets publicado como CSV).
NEXT_PUBLIC_CATALOG_CSV_URL="https://docs.google.com/spreadsheets/d/e/<ID>/pub?output=csv"

# URL canónica del sitio para SEO y Open Graph (opcional; por defecto timelux-perfumes.vercel.app).
NEXT_PUBLIC_SITE_URL="https://timelux-perfumes.vercel.app"
```

> Si el CSV remoto no responde, el sitio utiliza automáticamente el catálogo local de `src/data/perfumes.ts`.

---

## 7. Estándares de calidad y convenciones

Cada release debe cumplir estrictamente:

- `npx tsc --noEmit` sin errores.
- `npm run lint` (ESLint) limpio.
- `npm run build` exitoso (prerender estático + ISR).

Formato de commits bajo *Conventional Commits* en español:

| Prefijo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad o componente visual |
| `fix:` | Corrección de errores o enlaces caídos |
| `estilo:` | Modificaciones de estilos, espaciados o colores |
| `docs:` | Actualización de documentación técnica |
| `refactor:` | Mejora de arquitectura sin alterar el comportamiento visual |

---

## 8. Modelo de datos del catálogo

```ts
type GeneroPerfume = "hombre" | "mujer" | "unisex";

interface Perfume {
  id: string;
  nombre: string;
  marca: string;
  tipo: string;          // Árabe | Diseñador
  genero: GeneroPerfume; // Columna CSV: genero/género/sexo (por defecto: unisex)
  precio: number;        // Formato es-AR (ARS) vía formatearPrecio()
  bestseller?: boolean;  // Prioridad en la selección de destacados
  imagen?: string;       // Remota (next/image) o respaldo local /logo.png
}
```

---

## 9. Créditos y licencia

**Timelux — Alta Perfumería & Fragancias de Autor.** Marca y contenidos de su exclusiva propiedad. Todos los derechos reservados.

El código fuente de este repositorio se distribuye únicamente con fines de operación y mantenimiento del sitio oficial. Queda prohibida su reproducción, redistribución o uso comercial sin autorización expresa de Timelux.

- WhatsApp: +54 370 4772001 (lunes a sábado, de 9 a 20 h).
- Instagram: [@timelux_](https://www.instagram.com/timelux_).
