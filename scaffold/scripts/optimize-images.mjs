#!/usr/bin/env node
/**
 * Pre-ottimizzazione delle foto sorgenti (public/foto e public/edizioni).
 *
 * Cosa fa:
 *   - Scansiona RICORSIVAMENTE le cartelle elencate in TARGETS
 *   - Per ogni JPG/JPEG/PNG: ridimensiona a max 1920px sul lato lungo
 *       · JPG/JPEG → JPEG q78 (mozjpeg, progressive)
 *       · PNG      → PNG ricompresso
 *   - Sovrascrive il file IN PLACE mantenendo nome ed estensione invariati
 *     (essenziale: /edizioni è referenziata da path fissi nel codice)
 *   - Sposta l'originale nel mirror di backup (es. public/edizioni-originali/),
 *     preservando la struttura delle sottocartelle
 *   - È idempotente: se il backup di un file esiste già, lo salta
 *
 * Risultato tipico: JPG da camera 1-4 MB → 150-450 KB. Velocizza enormemente
 * lo sviluppo (Next ottimizza on-demand) e il primo caricamento / i costi di
 * Image Optimization in produzione.
 *
 * Uso:
 *   pnpm add -D sharp        # se non già presente
 *   node scripts/optimize-images.mjs
 *
 * Re-eseguibile in sicurezza ogni volta che aggiungi nuove foto.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

const MAX_SIDE_PX = 1920;
const JPEG_QUALITY = 78;
const SUPPORTED = /\.(jpe?g|png)$/i;

/** Cartelle (sotto /public) da ottimizzare, con la rispettiva cartella di backup. */
const TARGETS = [
  { dir: "foto", backup: "foto-originali" },
  { dir: "edizioni", backup: "edizioni-originali" },
];

async function* walkImages(root) {
  let entries;
  try {
    entries = await fs.readdir(root, { withFileTypes: true });
  } catch {
    return; // cartella inesistente → niente da fare
  }
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      yield* walkImages(full);
    } else if (entry.isFile() && SUPPORTED.test(entry.name)) {
      yield full;
    }
  }
}

const fmt = (n) =>
  n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)}MB` : `${Math.round(n / 1024)}KB`;

async function main() {
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    console.error("❌ Manca la dipendenza 'sharp'. Installala con:\n   pnpm add -D sharp");
    process.exit(1);
  }

  let okCount = 0;
  let skipCount = 0;
  let errCount = 0;
  let savedBytes = 0;

  for (const target of TARGETS) {
    const srcRoot = path.join(PUBLIC_DIR, target.dir);
    const backupRoot = path.join(PUBLIC_DIR, target.backup);

    try {
      await fs.access(srcRoot);
    } catch {
      continue; // target assente
    }

    console.log(`\n📁 ${target.dir}/  (backup → ${target.backup}/)`);

    for await (const src of walkImages(srcRoot)) {
      const rel = path.relative(srcRoot, src);
      const backup = path.join(backupRoot, rel);

      // Idempotente: se il backup esiste, la foto è già stata ottimizzata.
      try {
        await fs.access(backup);
        skipCount++;
        continue;
      } catch {
        /* nessun backup → procedi */
      }

      try {
        const origSize = (await fs.stat(src)).size;
        const buf = await fs.readFile(src);
        const isPng = /\.png$/i.test(src);

        const pipeline = sharp(buf)
          .rotate() // raddrizza secondo EXIF
          .resize({
            width: MAX_SIDE_PX,
            height: MAX_SIDE_PX,
            fit: "inside",
            withoutEnlargement: true,
          });

        const optimized = isPng
          ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
          : await pipeline
              .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
              .toBuffer();

        // Backup dell'originale, preservando la struttura delle cartelle.
        await fs.mkdir(path.dirname(backup), { recursive: true });
        await fs.rename(src, backup);

        // Scrive l'ottimizzata allo STESSO percorso (nome ed estensione invariati).
        await fs.writeFile(src, optimized);

        savedBytes += origSize - optimized.length;
        okCount++;
        if (okCount % 25 === 0) console.log(`   …${okCount} ottimizzate`);
      } catch (e) {
        errCount++;
        console.error(`   ✗ ${rel}: ${e?.message ?? e}`);
      }
    }
  }

  console.log(`\n✅ Ottimizzate: ${okCount}`);
  if (skipCount) console.log(`⏭  Saltate (già in backup): ${skipCount}`);
  if (errCount) console.log(`⚠️  Errori: ${errCount}`);
  if (savedBytes > 0) console.log(`💾 Spazio risparmiato: ${fmt(savedBytes)}`);
  console.log("\nGli originali sono in /public/*-originali (non versionati, vedi .gitignore).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
