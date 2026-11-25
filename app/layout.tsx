import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import WhatsAppFloatingButton from "@/src/components/common/WhatsAppFloatingButton";
import JsonLd from "@/src/components/seo/JsonLd";
import { baseUrl } from "@/src/config/site";
import {
  crearGrafo,
  crearOrganizationSchema,
  crearWebSiteSchema,
} from "@/src/lib/schema";
import "./globals.css";

// Tipografía serif editorial de alta perfumería (armoniza con el trazo del logo).
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Tipografía sans limpia y contemporánea para cuerpo, precios e interfaz.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Datos estructurados institucionales compartidos por todas las rutas.
const datosEstructurales = crearGrafo([
  crearOrganizationSchema(),
  crearWebSiteSchema(),
]);

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Timelux | Perfumería Árabe & Diseñador",
    template: "%s | Timelux",
  },
  description:
    "Descubrí fragancias árabes y de diseñador 100% originales. Curaduría exclusiva de dupes icónicos y perfumes de autor con fijación duradera y envíos a todo el país.",
  keywords: [
    "perfumes árabes",
    "alta perfumería",
    "Lattafa",
    "Afnan",
    "Armaf",
    "dupes de perfumes",
    "fragancias originales",
    "perfumería de autor",
    "Timelux",
    "Argentina",
  ],
  authors: [{ name: "Timelux Perfumes" }],
  creator: "Timelux",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "qGfM7SnqQXd5gn86wZJdQywMKQerXBTElA_lk37N6Vg",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Timelux Perfumería",
    title: "Timelux | Perfumería Árabe & Diseñador",
    description:
      "Fragancias árabes y de diseñador 100% originales. Fijación duradera y asesoría personalizada para encontrar tu firma olfativa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timelux | Perfumería Árabe & Diseñador",
    description:
      "Fragancias árabes y de diseñador 100% originales con fijación duradera y envíos a todo el país.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${cormorantGaramond.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-[#fffff4] font-sans text-[#141416] selection:bg-[#a6caeb]/40 selection:text-[#141416]">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloatingButton />
        <JsonLd datos={datosEstructurales} />
      </body>
    </html>
  );
}
