import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/src/components/layout/Navbar";
import WhatsAppFloatingButton from "@/src/components/common/WhatsAppFloatingButton";
import JsonLd from "@/src/components/seo/JsonLd";
import Preloader from "@/src/components/ui/Preloader";
import { baseUrl } from "@/src/config/site";
import {
  crearGrafo,
  crearOrganizationSchema,
  crearWebSiteSchema,
} from "@/src/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "Timelux Perfumería - El arte de dejar una huella inolvidable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timelux | Perfumería Árabe & Diseñador",
    description:
      "Fragancias árabes y de diseñador 100% originales con fijación duradera y envíos a todo el país.",
    images: ["/logo.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Navbar />
        {children}
        <WhatsAppFloatingButton />
        <JsonLd datos={datosEstructurales} />
      </body>
    </html>
  );
}
