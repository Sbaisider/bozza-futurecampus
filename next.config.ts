import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Turbopack picks the nearest lockfile as the workspace root; a `pnpm-lock.yaml`
// in a parent directory (e.g. the user home) can win over this repo. Pin the root.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },

  /**
   * Ottimizzazione immagini: Next genera versioni AVIF/WebP a richiesta,
   * usando i breakpoint qui sotto. Riduce il peso scaricato da JPG enormi
   * di camera (3-15MB) a 30-200KB per il browser.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    // Dimensioni che il sito userà davvero (vs le 8 di default).
    deviceSizes: [360, 640, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 64, 96, 160, 256, 384],
    // Qualità abilitate: 52 per hero column strip, 60 per sfondi blurred, 75 per gallery, 85 per hero.
    qualities: [52, 55, 60, 70, 75, 85],
    // Cache lato CDN/Next: 30 giorni. In dev è ininfluente, in prod aiuta.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
