// Endpoint dei comandi `.octa` (OCTAGENCY). Generato da `octa kit install`.
// Il lavoro sta in .octa/kit/kit.mjs: qui c'è solo la configurazione del progetto.
// Spento finché OCTA_PROJECT_TOKEN non è nell'ambiente di deploy (risponde 503).
import { createOctaCommandRoute } from "../../../../../.octa/kit/kit.mjs";
import manifest from "../../../../../.octa/octa.config.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const route = createOctaCommandRoute({
  manifest,
  repo: { owner: "Sbaisider", name: "bozza-futurecampus", branch: "main", rootDir: "scaffold" },
  // Mai modificabili in questo progetto, oltre a ciò che il kit blocca sempre.
  deny: [
    "src/app/studio/**",
  ],
  // File di soli testi e dati: lì sono testo anche le frasi in elenchi e costanti.
  content: [
    "src/content/**",
  ],
});

export async function POST(request: Request): Promise<Response> {
  return route.POST(request);
}
