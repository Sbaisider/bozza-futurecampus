import type { MetadataRoute } from "next";

/** Web App Manifest: installabilità + theme color coerente con viewport. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Future Campus Fabriano",
    short_name: "Future Campus",
    description:
      "Sei settimane di formazione esperienziale gratuita per i ragazzi delle scuole superiori di Fabriano. Un marchio di Confindustria Ancona.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f5f7",
    theme_color: "#244c90",
    lang: "it",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "any", type: "image/png", purpose: "any" },
    ],
  };
}
