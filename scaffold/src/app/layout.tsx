import type { Metadata, Viewport } from "next";
import { Graduate, Manrope, Montserrat } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  weight: "200",
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const graduate = Graduate({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-graduate",
  display: "swap",
});

const montserrat = Montserrat({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Future Campus",
    template: "%s · Future Campus",
  },
  description: "Sito web Future Campus",
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
      className={`${manrope.variable} ${graduate.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-fc-light font-sans text-fc-dark">
        {children}
      </body>
    </html>
  );
}
