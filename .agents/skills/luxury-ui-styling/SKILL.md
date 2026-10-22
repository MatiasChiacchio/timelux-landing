---
name: luxury-ui-styling
description: Directrices del tema claro Warm Ivory / Light Luxury de Timelux, con la paleta oficial, recetas de componentes y reglas de contraste accesible.
---

# Timelux UI Styling (Warm Ivory / Light Luxury)

## Atmósfera

La identidad oficial de Timelux es **Warm Ivory / Light Luxury**: una interfaz clara, cálida y luminosa, con superficies de cristal, bordes celestes sutiles y acentos de alta perfumería. La marca debe sentirse sobria, sofisticada y artesanal; no nocturna ni grafítica.

Esta skill tiene prioridad sobre `tailwind-design-system` en todo lo relativo a paleta, atmósfera y recetas visuales. De `tailwind-design-system` se toma la mecánica de tokens y variantes, no sus colores de ejemplo.

Reglas de atmósfera:

- Lienzo base marfil cálido `#fffff4`; nunca negro o grafito como fondo dominante.
- Superficies y tarjetas en `bg-white/90` con bordes sutiles `#a6caeb/30` y sombras suaves.
- El rojo se reserva para conversión y acentos puntuales.
- El celeste se usa en bordes, fondos translúcidos, insignias e iconografía decorativa.
- El texto de acento se resuelve con azul tinta `#1e3a5f`, no con celeste pastel.
- Efectos de cristal esmerilado (`backdrop-blur`) y transiciones suaves (`duration-300 ease-in-out`).
- No se implementa ni se migra a modo oscuro. La interfaz clara es la única variante oficial.

## Paleta Oficial

| Rol | Valor | Uso |
|---|---|---|
| Lienzo / Fondo | `#fffff4` | Fondo base de páginas y secciones |
| Superficie / Tarjeta | `bg-white/90` | Tarjetas, paneles y campos |
| Superficie flotante | `bg-white/95` + `backdrop-blur` | Menús, desplegables y tooltips |
| Rojo principal | `#c40a0a` | CTA, navbar y footer institucionales |
| Rojo hover | `#a30808` | Estados hover y bordes de énfasis |
| Celeste pastel | `#a6caeb` | Bordes, fondos translúcidos, insignias e iconos decorativos |
| Celeste medio | `#7bb4e3` | Solo detalles decorativos; nunca texto pequeño |
| Texto principal | `#141416` | Títulos, precios y contenido primario |
| Texto secundario | `#5e626e` | Descripciones, metadatos y placeholders |
| Azul tinta | `#1e3a5f` | Eyebrows, enlaces y texto de acento accesible |
| Bordes | `#a6caeb` al 30–60% | Separadores y contornos sutiles |

### Reglas de contraste

- Texto normal: mínimo **4,5:1**. Texto grande y elementos gráficos: mínimo **3:1**.
- Texto principal `#141416` sobre marfil: **18,28:1**.
- Texto secundario `#5e626e` sobre marfil: **6,05:1**.
- Azul tinta `#1e3a5f` sobre marfil: **11,43:1**.
- Rojo `#c40a0a` sobre marfil: **6,15:1**.
- Marfil `#fffff4` sobre rojo: **6,15:1**.
- Celeste `#a6caeb` sobre marfil: **1,70:1**. Prohibido como texto o icono con significado.
- Celeste medio `#7bb4e3` sobre marfil: **2,20:1**. Solo decoración de gran tamaño.
- Celeste `#a6caeb` sobre blanco: **1,71:1**. Prohibido como texto o icono informativo.
- Los placeholders usan `#5e626e`; nunca celeste.
- No usar `text-[#a6caeb]` ni `text-[#7bb4e3]` en etiquetas, eyebrows, enlaces o párrafos.
- El estado activo de un filtro no depende solo del color: conserva `aria-selected` y una diferencia de superficie.

## Reglas de Componentes

1. **Lienzo y secciones:**
   - Fondo base `bg-[#fffff4]`.
   - Contenedor `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
   - Separación vertical `py-16 md:py-24`.
   - Los bloques institucionales de navbar y footer pueden usar rojo `#c40a0a` con texto marfil.

2. **Tarjetas de Producto:**
   - `border border-[#a6caeb]/30 bg-white/90 rounded-2xl p-5 shadow-sm hover:border-[#c40a0a]/40 hover:shadow-xl transition-all duration-300`.
   - Título y precio en `text-[#141416]`; marca y descripción en `text-[#5e626e]`.
   - Insignias: `bg-[#a6caeb]/30 text-[#141416]`.
   - Notas olfativas: `bg-[#a6caeb]/15 border border-[#a6caeb]/30 text-[#141416]`.
   - Imagen sobre superficie blanca o marfil, con `next/image` y `sizes` según la grilla.

3. **Botón Principal de Conversión (WhatsApp):**
   - `bg-[#c40a0a] text-[#fffff4] hover:bg-[#a30808] px-5 py-2.5 rounded-full font-medium transition-colors duration-200 inline-flex items-center gap-2`.
   - Altura mínima táctil: `min-h-[44px]` en mobile.
   - Foco visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]`.

4. **Botón Secundario:**
   - `border border-[#a6caeb]/60 bg-white/90 text-[#141416] hover:bg-[#a6caeb]/15 hover:border-[#a6caeb] rounded-full px-5 py-2.5 transition-colors duration-300`.
   - Para acciones de texto sobre marfil, el color de acento es `#1e3a5f` o `#c40a0a`, nunca celeste.

5. **Buscador e Inputs:**
   - `min-h-[44px] w-full rounded-full border border-[#a6caeb]/40 bg-white/90 py-3 pl-11 pr-4 text-sm text-[#141416] placeholder:text-[#5e626e]`.
   - Icono de búsqueda `text-[#5e626e]`.
   - Foco: `focus:border-[#c40a0a] focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/60`.
   - El anillo al 60% alcanza 3,29:1 sobre blanco; no bajar de esa opacidad.

6. **Filtros y Píldoras de Categoría:**
   - Activo: `bg-[#c40a0a] text-[#fffff4]`.
   - Inactivo: `bg-[#a6caeb]/20 border border-[#a6caeb]/40 text-[#141416] hover:bg-[#a6caeb]/40`.
   - Foco visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]`.
   - Objetivo táctil mínimo `min-h-[44px]`.

7. **Combobox y Desplegables:**
   - Disparador: `border border-[#a6caeb]/40 bg-white/90 text-[#141416] shadow-sm`.
   - Menú: `bg-white border border-[#a6caeb]/30 shadow-xl`.
   - Opción normal: `text-[#141416] hover:bg-[#a6caeb]/10`.
   - Opción seleccionada: `bg-[#c40a0a]/5 text-[#c40a0a]`.
   - Foco de opción: `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c40a0a]`.
   - Mantener navegación por teclado, roles `listbox`/`option` y cierre con `Escape`.

8. **Estados Vacíos:**
   - Contenedor: `border border-[#a6caeb]/30 bg-white/90 rounded-2xl`.
   - Icono decorativo en `#1e3a5f` o `#5e626e`; nunca celeste pastel.
   - Título `#141416`; descripción `#5e626e`; CTA rojo con texto marfil.

9. **Navegación y Superficies Flotantes:**
   - Navbar y footer institucionales: `bg-[#c40a0a]` con texto marfil.
   - Menús flotantes claros: `bg-white/95 backdrop-blur-md border border-[#a6caeb]/30 shadow-xl`.
   - No introducir superficies oscuras como base de secciones o tarjetas.

10. **Eyebrows y Enlaces de Acento:**
    - Eyebrow: `text-sm font-semibold uppercase tracking-widest text-[#1e3a5f]`.
    - Enlace de acento: `text-[#c40a0a] hover:text-[#a30808]`.
    - Nunca usar celeste como color de texto.

11. **Foco Visible (obligatorio):**
    - Botones y enlaces sobre marfil: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff4]`.
    - Campos de texto: `focus:border-[#c40a0a] focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/60`.
    - Opciones dentro de desplegables: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c40a0a]`.

## Tipografía

- Títulos con serif elegante y color `#141416`.
- Cuerpo con sans legible y color `#5e626e`.
- Eyebrows y etiquetas cortas en `#1e3a5f`; tracking amplio solo en mayúsculas breves.
- El celeste no se usa para bloques de texto ni titulares.

## Accesibilidad

- Todos los controles interactivos deben tener foco visible y objetivo táctil mínimo de 44 × 44 px.
- Mantener los roles ARIA existentes (`tablist`, `tab`, `listbox`, `option`) y el estado `aria-selected`.
- Respetar `prefers-reduced-motion` para animaciones y desplazamientos.
- Las imágenes informativas necesitan `alt` descriptivo; los iconos decorativos, `aria-hidden="true"`.
- El contraste se verifica con los valores de esta skill antes de introducir un color nuevo.

## Estado Actual del Código

La interfaz clara es la implementación oficial en todas las páginas: layout, Hero, catálogo, filtros, tarjetas, FAQ, footer y página 404. Los tokens base viven en `app/globals.css` y las recetas de esta skill describen el código vigente.

- No queda una migración pendiente a modo oscuro.
- Todo componente nuevo debe nacer con esta paleta y estas recetas.
- Si aparece una superficie oscura heredada, se migra al tema Warm Ivory en la misma tarea.
