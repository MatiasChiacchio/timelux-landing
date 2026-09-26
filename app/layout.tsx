import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/src/components/layout/Navbar";
import WhatsAppFloatingButton from "@/src/components/common/WhatsAppFloatingButton";
import Preloader from "@/src/components/ui/Preloader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timelux | Perfumería árabe y de diseñador",
  description:
    "Timelux: vitrina digital de perfumería árabe y fragancias de diseñador. Consulta por WhatsApp.",
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
      </body>
    </html>
  );
}
