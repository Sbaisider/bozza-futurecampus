import type { Metadata, Viewport } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  weight: "200",
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const montserrat = Montserrat({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.futurecampus.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Future Campus",
    template: "%s · Future Campus",
  },
  description:
    "Future Campus Fabriano: sei settimane di formazione esperienziale gratuita per i ragazzi delle scuole superiori. Un marchio di Confindustria Ancona.",
  openGraph: {
    type: "website",
    siteName: "Future Campus Fabriano",
    locale: "it_IT",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Future Campus Fabriano" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#244c90",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-fc-light font-sans text-fc-dark">
        <a href="#main-content" className="fc-skip-link">
          Salta al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
