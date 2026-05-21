import fs from "node:fs";
import path from "node:path";

/** Solo MP4: usati nella sezione Esperienza (altri formati ignorati). */
const VIDEO_EXT = /\.mp4$/i;

/**
 * Percorsi pubblici dei file `.mp4` in `public/video`, ordinati per nome.
 */
export function getPublicVideoPaths(): string[] {
  const dir = path.join(process.cwd(), "public", "video");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((name) => VIDEO_EXT.test(name) && !name.startsWith("."));
  return files.sort().map((name) => `/video/${encodeURIComponent(name)}`);
}
