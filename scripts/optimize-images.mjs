#!/usr/bin/env node
/**
 * Pre-ottimizzazione foto sorgenti.
 *
 * Cosa fa:
 *   - Legge tutti i JPG/JPEG/PNG in `public/foto/`
 *   - Per ognuno: ridimensiona a max 1920px lato lungo, salva JPEG q=78
 *   - Salva l'output in `public/foto/` (sovrascrive)
 *   - Sposta gli originali in `public/foto-originali/` (backup)
 *
 * Risultato tipico: JPG da camera 4-12 MB → 150-450 KB. Riduce il tempo di
 * compilazione di Next.js in dev e velocizza tantissimo il primo caricamento.
 *
 * Uso:
 *   npm install --save-dev sharp
 *   node scripts/optimize-images.mjs
 *
 * Re-esegui ogni volta che aggiungi nuove foto in public/foto/.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(PROJECT_ROOT, "public", "foto");
const BACKUP_DIR = path.join(PROJECT_ROOT, "public", "foto-originali");

const MAX_SIDE_PX = 1920;
const JPEG_QUALITY = 78;
const SUPPORTED = /\.(jpe?g|png)$/i;

async function main() {
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    console.error(
      "❌ Manca la dipendenza 'sharp'. Installala con:\n   npm install --save-dev sharp",
    );
    process.exit(1);
  }

  const files = (await fs.readdir(SRC_DIR)).filter((f) => SUPPORTED.test(f));
  if (files.length === 0) {
    console.log("Nessuna foto trovata in public/foto/. Niente da fare.");
    return;
  }

  await fs.mkdir(BACKUP_DIR, { recursive: true });
  console.log(`📷 Ottimizzazione di ${files.length} foto…`);
  console.log(`   Sorgente:    ${SRC_DIR}`);
  console.log(`   Backup orig: ${BACKUP_DIR}`);
  console.log(`   Max lato:    ${MAX_SIDE_PX}px · qualità JPEG: ${JPEG_QUALITY}\n`);

  let savedBytes = 0;
  let okCount = 0;
  let skipCount = 0;

  for (const file of files) {
    const src = path.join(SRC_DIR, file);
    const backup = path.join(BACKUP_DIR, file);

    // Salta se backup esiste già (foto già processata in passato)
    try {
      await fs.access(backup);
      skipCount++;
      continue;
    } catch {
      /* non esiste backup → procedi */
    }

    try {
      const origStat = await fs.stat(src);
      const origSize = origStat.size;

      const buf = await fs.readFile(src);
      const optimized = await sharp(buf)
        .rotate() // raddrizza secondo EXIF
        .resize({
          width: MAX_SIDE_PX,
          height: MAX_SIDE_PX,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toBuffer();

      // Sposta originale → backup
      await fs.rename(src, backup);

      // Scrivi versione ottimizzata, con estensione .JPG (uniforme col resto del progetto)
      const outName = file.replace(/\.(jpe?g|png)$/i, ".JPG");
      const outPath = path.join(SRC_DIR, outName);
      await fs.writeFile(outPath, optimized);

      const newSize = optimized.length;
      const saved = origSize - newSize;
      savedBytes += saved;
      okCount++;

      const fmt = (n) =>
        n > 1024 * 1024
          ? `${(n / 1024 / 1024).toFixed(1)}MB`
          : `${Math.round(n / 1024)}KB`;
      console.log(
        `   ✓ ${file.padEnd(28)} ${fmt(origSize).padStart(8)} → ${fmt(newSize).padStart(8)}  (-${fmt(saved)})`,
      );
    } catch (e) {
      console.error(`   ✗ ${file}: ${e.message ?? e}`);
    }
  }

  console.log("");
  console.log(`✅ Ottimizzate: ${okCount}`);
  if (skipCount > 0) {
    console.log(`⏭  Saltate (già in backup): ${skipCount}`);
  }
  if (savedBytes > 0) {
    console.log(
      `💾 Spazio risparmiato: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`,
    );
  }
  console.log("");
  console.log(
    "Gli originali sono in /public/foto-originali (non versionata, vedi .gitignore).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
