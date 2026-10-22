## 📌 Contexto del Proyecto y Negocio

- **Marca:** Timelux (emprendimiento de perfumería árabe y de diseñador).
- **Objetivo Principal:** Landing page y vitrina digital interactiva. **No cuenta con checkout ni pasarela de pagos integrada.**
- **Mecanismo de Conversión:** Todos los botones de llamada a la acción (CTA) y consultas de producto deben redirigir a **WhatsApp** mediante enlaces codificados dinámicamente (`wa.me/NUMERO?text=MENSAJE`).
- **Idioma del Entorno:** Todo el código fuente, componentes, comentarios, documentación (`README.md`) y mensajes de commit en Git deben redactarse estrictamente en **español**.

---

## 🛠️ Stack Tecnológico y Reglas del Framework

1. **Framework:** Next.js (App Router, React Server Components por defecto).
2. **Lenguaje:** TypeScript con tipado estricto (no utilizar `any`).
3. **Estilos:** Tailwind CSS (diseño responsivo Mobile-First).
4. **Iconos:** `lucide-react`.
5. **División de Componentes:**
   - Mantener componentes estáticos como **Server Components** para optimizar el rendimiento y el SEO.
   - Declarar `'use client'` únicamente en componentes que gestionen estado (`useState`, `useEffect`) o eventos del usuario (filtros interactivos, menú móvil desplegable).

---

## 🎨 Principios de Diseño Visual (Warm Ivory / Light Luxury)

- **Atmósfera:** Interfaz clara, cálida y luminosa, con estética sobria y sofisticada inspirada en perfumería de alta gama. No se implementa ni se migra a modo oscuro.
- **Lienzo y superficies:** Fondo base marfil cálido `#fffff4`; tarjetas y paneles en `bg-white/90` con bordes sutiles `#a6caeb`/30 y sombras suaves.
- **Textos:** Tono principal `#141416`; texto secundario `#5e626e`; acentos textuales en azul tinta `#1e3a5f`. El celeste pastel `#a6caeb` no se usa como color de texto.
- **Acentos:** Rojo vívido `#c40a0a` para CTA y conversión; celeste pastel `#a6caeb` para bordes, fondos translúcidos, insignias e iconografía decorativa.
- **Contraste y foco:** Todo texto normal debe alcanzar 4,5:1 y todo control interactivo debe conservar un foco visible y un objetivo táctil mínimo de 44 × 44 px.
- **Microinteracciones:** Uso de efectos de cristal esmerilado (`backdrop-blur`), bordes sutiles con opacidad y transiciones suaves (`duration-300 ease-in-out`).
- **Optimización de Medios:** Utilizar siempre el componente `<Image />` de Next.js (`next/image`) con dimensiones y atributos de accesibilidad definidos.

---

## 📋 Estándar de Commits (Conventional Commits en Español)

Todo commit generado debe seguir esta estructura:
- `feat:` Nueva funcionalidad o componente visual.
- `fix:` Corrección de errores o enlaces caídos.
- `estilo:` Modificaciones de estilos, espaciados o colores.
- `docs:` Actualización de documentación técnica.
- `refactor:` Mejoras en la arquitectura de código sin alterar su comportamiento visual.

## 🧠 Uso Obligatorio de Skills

Antes de escribir código o proponer cambios, consulta y respeta las pautas definidas en el directorio `.agents/skills/`:
- **`nextjs-app-router-patterns`**: Seguir la estructura estricta de carpetas de Next.js App Router, división de Server/Client Components y renderizado con `next/image`.
- **`vercel-react-best-practices`**: Aplicar las reglas de rendimiento de Vercel para React/Next (waterfalls, bundle, serialización RSC, imágenes).
- **`tailwind-design-system`**: Aplicar convenciones de Tailwind CSS 4 con enfoque Mobile-First estricto y touch targets adecuados para celulares.
- **`core-web-vitals`**: Medir y optimizar LCP, INP y CLS con evidencia de laboratorio y de campo.
- **`schema`**: Implementar datos estructurados JSON-LD (`Product`, `Offer`, `BreadcrumbList`, `Organization`) validados con Rich Results Test.
- **`luxury-ui-styling`**: Respetar la estética Warm Ivory / Light Luxury, la paleta oficial, las reglas de contraste y las recetas de componentes.
- **`whatsapp-conversion`**: Generar los enlaces de conversión con `getWhatsAppLink()` de `src/config/site.ts`.
- **Directrices de marca**: Respetar siempre la paleta oficial de Timelux (marfil `#fffff4`, rojo vívido `#c40a0a`, celeste pastel `#a6caeb`) y usar azul tinta `#1e3a5f` para texto de acento accesible.
- **Precedencia**: Ante conflicto entre skills, prevalece la skill específica de marca (`luxury-ui-styling`) sobre las genéricas de framework o diseño.