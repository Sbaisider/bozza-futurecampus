import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Turbopack picks the nearest lockfile as the workspace root; a `pnpm-lock.yaml`
// in a parent directory (e.g. the user home) can win over this repo. Pin the root.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV !== "production";

/** Serializza un set di direttive CSP in stringa header. */
function csp(directives: Record<string, string[]>): string {
  return Object.entries(directives)
    .map(([key, values]) => (values.length ? `${key} ${values.join(" ")}` : key))
    .join("; ");
}

/**
 * CSP del sito pubblico: tutto self-hosted (font inclusi via next/font), unica
 * origine esterna = il CDN immagini di Sanity. In dev servono `unsafe-eval` e il
 * websocket per l'HMR di Turbopack.
 */
const SITE_CSP = csp({
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "frame-ancestors": ["'self'"],
  "form-action": ["'self'"],
  "img-src": ["'self'", "data:", "blob:", "https://cdn.sanity.io"],
  "font-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "script-src": ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
  "connect-src": ["'self'", ...(isDev ? ["ws:"] : [])],
  "media-src": ["'self'", "blob:"],
  "frame-src": ["'self'"],
  "worker-src": ["'self'", "blob:"],
  ...(isDev ? {} : { "upgrade-insecure-requests": [] }),
});

/**
 * CSP dello Studio Sanity (/studio): più permissiva perché lo Studio è una SPA
 * di terze parti che usa eval, web worker da blob:, e parla con le API Sanity
 * (REST + websocket realtime su *.sanity.io).
 */
const STUDIO_CSP = csp({
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "frame-ancestors": ["'self'"],
  "form-action": ["'self'"],
  "img-src": ["'self'", "data:", "blob:", "https://cdn.sanity.io", "https://*.sanity.io"],
  "font-src": ["'self'", "data:"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"],
  "connect-src": ["'self'", "https://*.sanity.io", "wss://*.sanity.io", ...(isDev ? ["ws:"] : [])],
  "media-src": ["'self'", "blob:", "data:"],
  "frame-src": ["'self'", "https://*.sanity.io"],
  "worker-src": ["'self'", "blob:"],
  "child-src": ["'self'", "blob:"],
  ...(isDev ? {} : { "upgrade-insecure-requests": [] }),
});

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
    // Qualità abilitate: 52 hero column strip, 60 sfondi blurred, 70/72 gallery/card, 75 gallery, 85 hero.
    qualities: [52, 55, 60, 70, 72, 75, 85],
    // Cache lato CDN/Next: 30 giorni. In dev è ininfluente, in prod aiuta.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Sanity CDN per le immagini caricate da Studio.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // Non rivelare lo stack tecnologico nell'header `X-Powered-By`.
  poweredByHeader: false,

  /**
   * Header di sicurezza applicati a tutte le risposte. La CSP del sito vale
   * ovunque; per /studio viene sovrascritta con la variante più permissiva
   * (l'ultima regola che matcha vince, per la stessa chiave header).
   */
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      // HSTS solo in produzione: servirlo su http://localhost "avvelena" il
      // browser forzando https su tutte le porte di localhost.
      ...(isDev
        ? []
        : [
            {
              key: "Strict-Transport-Security",
              value: "max-age=63072000; includeSubDomains",
            },
          ]),
    ];

    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          { key: "Content-Security-Policy", value: SITE_CSP },
        ],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: STUDIO_CSP }],
      },
    ];
  },
};

export default nextConfig;
