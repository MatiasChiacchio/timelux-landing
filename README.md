# ⏳ Timelux — Perfumería de Diseñador & Árabe

Landing page y catálogo interactivo de alta gama para **Timelux**, un emprendimiento dedicado a la comercialización y asesoramiento personalizado de perfumería árabe (alta fijación, oud y especias) y fragancias clásicas de diseñador.

El sitio está diseñado como una vitrina digital moderna orientada a la conversión directa: permite a los usuarios descubrir fragancias, explorar sus notas olfativas y consultar disponibilidad de forma inmediata por WhatsApp con un mensaje preconfigurado que incluye el producto de interés.

---

## ✨ Características Principales

- **Diseño Dark Luxury:** Interfaz oscura, sobria y elegante con acentos refinados, desenfoque de fondo (`backdrop-blur`) y transiciones fluidas.
- **Catálogo Interactivo con Filtros Dinámicos:** Exploración rápida por categorías (*Todos*, *Perfumes Árabes*, *Perfumes de Diseñador*, *Bestsellers*) sin recargar la página.
- **Conversión Directa a WhatsApp:** Botones de compra y consulta que generan automáticamente enlaces dinámicos con el nombre y línea del perfume solicitado.
- **Diseño 100% Responsivo:** Adaptación precisa tanto en dispositivos móviles como en tablets y pantallas de escritorio.
- **Arquitectura Jamstack / SSG:** Carga ultrarrápida, rendimiento optimizado y excelente indexación para motores de búsqueda (SEO).

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Compilador / Bundler:** Turbopack
- **Control de Versiones:** Git & GitHub

---

## 📁 Estructura del Proyecto

```text
timelux-landing/
├── public/                  # Archivos estáticos, logo oficial e imágenes
├── src/
│   ├── app/                 # Enrutamiento y layout base (App Router)
│   │   ├── globals.css      # Directivas de Tailwind CSS y variables de diseño
│   │   ├── layout.tsx       # Layout raíz, metadata SEO y fuentes
│   │   └── page.tsx         # Página principal ensambladora
│   ├── components/          # Componentes modulares
│   │   ├── catalog/         # Grilla, filtros y tarjetas de fragancias
│   │   ├── home/            # Hero section, carrusel de casas y propuesta de valor
│   │   ├── layout/          # Barra de navegación sticky y pie de página
│   │   └── ui/              # Botón flotante de WhatsApp, badges e insignias
│   ├── data/
│   │   └── perfumes.ts      # Catálogo centralizado de productos tipados
│   ├── types/
│   │   └── perfume.ts       # Contratos y tipos en TypeScript
│   └── utils/
│       └── whatsapp.ts      # Generador dinámico de mensajes y enlaces para WhatsApp
├── next.config.ts           # Configuración del entorno Next.js
├── tailwind.config.ts       # Configuración de paleta de colores y tema
└── tsconfig.json            # Configuración de compilación TypeScript