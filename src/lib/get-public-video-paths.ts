import fs from "node:fs";
import path from "node:path";

const VIDEO_EXT = /\.(mp4|webm|mov|mts|m2t)$/i;

/**
 * Percorsi pubblici dei file in `public/video`, ordinati per nome.
 */
export function getPublicVideoPaths(): string[] {
  const dir = path.join(process.cwd(), "public", "video");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((name) => VIDEO_EXT.test(name) && !name.startsWith("."));
  return files.sort().map((name) => `/video/${encodeURIComponent(name)}`);
}
