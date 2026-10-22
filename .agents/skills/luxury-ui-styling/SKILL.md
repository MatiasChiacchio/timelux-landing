---
name: luxury-ui-styling
description: Directrices de diseno visual Dark Luxury y reglas de componentes para Timelux, con fondos oscuros profundos y la paleta oficial (rojo vivido, celeste pastel, marfil).
---

# Timelux UI Styling (Dark Luxury & High Perfumery)

## Atmosfera

La identidad oficial de Timelux es **Dark Luxury**: fondos oscuros profundos, superficies de grafito y acentos de alta perfumeria. La marca debe sentirse nocturna, sobria y sofisticada; nunca luminosa, pastel ni "clean tech".

Esta skill tiene prioridad sobre `tailwind-design-system` en todo lo relativo a paleta, atmosfera y recetas visuales. De `tailwind-design-system` se toma la mecanica de tokens y variantes, no sus colores de ejemplo.

Reglas de atmosfera:

- Lienzo base casi negro, sin llegar a `#000000`.
- Superficies elevadas en grafito con bordes de baja opacidad.
- El marfil se usa como texto principal, no como fondo dominante.
- El rojo se reserva para conversion y acentos puntuales.
- El celeste se usa en detalles, bordes, insignias e iconografia.
- Efectos de cristal esmerilado (`backdrop-blur`) y transiciones suaves (`duration-300 ease-in-out`).
- Prohibido el blanco puro como fondo de pagina o de tarjeta.

## Paleta Oficial

- **Lienzo / Fondo:** `#0b0b0d` (negro profundo).
- **Superficie elevada:** `#141416` (grafito).
- **Superficie de cristal:** `rgba(20, 20, 22, 0.72)` + `backdrop-blur`.
- **Rojo Principal (CTA / acento):** `#c40a0a`.
- **Rojo Hover:** `#a30808`.
- **Celeste Pastel (detalles / insignias):** `#a6caeb`.
- **Marfil (texto principal):** `#fffff4`.
- **Texto secundario sobre oscuro:** `#b8b9c1`.
- **Bordes:** `rgba(255, 255, 244, 0.10)`.

### Contraste

- Texto principal: marfil sobre grafito o negro profundo.
- Texto secundario: `#b8b9c1` sobre `#0b0b0d` o `#141416`.
- El rojo `#c40a0a` no se usa como color de texto pequeno sobre fondo oscuro; se usa como fondo de boton con texto marfil.
- El celeste `#a6caeb` no se usa como texto de parrafo; solo acentos, bordes e iconos.

## Reglas de Componentes

1. **Tarjetas de Producto:**
   - `bg-[#141416]/90 border border-[#a6caeb]/20 rounded-2xl p-5 shadow-sm hover:border-[#c40a0a]/50 hover:shadow-2xl transition-all duration-300`.
   - Titulo en `text-[#fffff4]`; marca y descripcion en `text-[#b8b9c1]`.
   - Imagen sobre `bg-[#fffff4]/5`.

2. **Boton Principal de Conversion (WhatsApp):**
   - `bg-[#c40a0a] text-[#fffff4] hover:bg-[#a30808] px-5 py-2.5 rounded-full font-medium transition-colors duration-200 inline-flex items-center gap-2`.
   - Altura minima tactil: `min-h-[44px]` en mobile.

3. **Boton Secundario:**
   - `border border-[#a6caeb]/40 bg-white/5 text-[#fffff4] hover:bg-[#a6caeb]/10 hover:border-[#a6caeb]/70 rounded-full px-5 py-2.5 transition-colors duration-300`.

4. **Insignias y Filtros de Categoria:**
   - Activo: `bg-[#c40a0a] text-[#fffff4]`.
   - Inactivo: `bg-[#a6caeb]/10 text-[#fffff4] border border-[#a6caeb]/30 hover:bg-[#a6caeb]/20`.
   - Tags de notas olfativas: `bg-[#a6caeb]/10 text-[#fffff4] border border-[#a6caeb]/25 rounded-md px-2 py-0.5 text-xs uppercase tracking-wider`.

5. **Navegacion y Superficies Flotantes:**
   - `bg-[#0b0b0d]/80 backdrop-blur-md border-b border-white/10`.
   - Desplegables: `bg-[#141416] border border-[#a6caeb]/20 shadow-2xl`.

6. **Foco Visible (obligatorio):**
   - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a6caeb] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0d]`.

## Tipografia

- Titulos con serif elegante; cuerpo con sans legible.
- Titulos en marfil; nunca en celeste para bloques largos.
- Tracking amplio solo en etiquetas cortas y mayusculas.

## Estado Actual del Codigo

La implementacion actual usa superficies claras (`bg-[#fffff4]`, `bg-white/90`) en `Hero`, `TarjetaPerfume` y el layout. Esa deuda visual debe resolverse en una tarea de refactor dedicada.

Mientras la migracion no se ejecute:

- Todo componente **nuevo** sigue las reglas Dark Luxury de esta skill.
- No mezclar en un mismo bloque fondos marfil y grafito sin un limite visual claro.
- No cambiar la paleta de un componente existente sin coordinar la migracion de su seccion completa.
