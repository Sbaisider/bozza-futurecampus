import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Percorsi pubblici delle immagini in `public/foto`, ordinati per nome.
 * Restituisce array vuoto se la cartella non esiste o non contiene file immagine.
 */
export function getHeroFotoPaths(): string[] {
  const dir = path.join(process.cwd(), "public", "foto");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXT.test(name) && !name.startsWith("."));
  return files.sort().map((name) => `/foto/${encodeURIComponent(name)}`);
}
