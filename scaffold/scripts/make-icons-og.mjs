#!/usr/bin/env node
/**
 * One-off: genera favicon leggere + immagine OpenGraph social.
 *
 *   - src/app/icon.png       500x512 225KB → 64x64   (favicon)
 *   - src/app/apple-icon.png 500x512 225KB → 180x180 (Apple touch icon)
 *   - public/og.jpg          NUOVA 1200x630: foto hero + velo navy + emblema
 *
 * Idempotente per le icone (riduce sempre dalla sorgente brand, non dal file
 * già ridotto): rilegge da public/brand/fcf-emblem.png come master.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...x) => path.join(ROOT, ...x);
const fmt = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)}MB` : `${Math.round(n / 1024)}KB`);

async function size(f) {
  try { return (await fs.stat(f)).size; } catch { return 0; }
}

async function makeIcons() {
  // Master = il file icona attuale (500x512, brand emblem su fondo pieno).
  const master = await fs.readFile(p("src/app/icon.png"));

  const favicon = await sharp(master)
    .resize(64, 64, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const apple = await sharp(master)
    .resize(180, 180, { fit: "cover", position: "centre" })
    .flatten({ background: "#ffffff" }) // Apple non rispetta l'alpha → fondo bianco
    .png({ compressionLevel: 9 })
    .toBuffer();

  const beforeIcon = await size(p("src/app/icon.png"));
  const beforeApple = await size(p("src/app/apple-icon.png"));
  await fs.writeFile(p("src/app/icon.png"), favicon);
  await fs.writeFile(p("src/app/apple-icon.png"), apple);
  console.log(`icon.png       ${fmt(beforeIcon)} → ${fmt(favicon.length)} (64x64)`);
  console.log(`apple-icon.png ${fmt(beforeApple)} → ${fmt(apple.length)} (180x180)`);
}

async function pickLandscapePhoto() {
  const dir = p("public/foto");
  const files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  for (const f of files) {
    try {
      const m = await sharp(path.join(dir, f)).metadata();
      if (m.width && m.height && m.width / m.height >= 1.4) return path.join(dir, f);
    } catch { /* skip */ }
  }
  // fallback: prima foto disponibile
  return files.length ? path.join(dir, files[0]) : null;
}

async function makeOg() {
  const photoPath = await pickLandscapePhoto();
  if (!photoPath) { console.log("og.jpg: nessuna foto sorgente, salto"); return; }

  const W = 1200, H = 630;

  const base = await sharp(photoPath)
    .resize(W, H, { fit: "cover", position: "centre" })
    .toBuffer();

  // Velo navy semi-trasparente per leggibilità/brand.
  const veil = await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 13, g: 30, b: 64, alpha: 0.5 } },
  }).png().toBuffer();

  // Emblema brand, centrato in alto.
  const emblem = await sharp(p("public/brand/fcf-emblem.png"))
    .resize(280, 280, { fit: "inside", withoutEnlargement: false })
    .toBuffer();
  const em = await sharp(emblem).metadata();

  const og = await sharp(base)
    .composite([
      { input: veil, blend: "over" },
      { input: emblem, top: Math.round(H / 2 - (em.height ?? 280) / 2), left: Math.round(W / 2 - (em.width ?? 280) / 2) },
    ])
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toBuffer();

  await fs.writeFile(p("public/og.jpg"), og);
  console.log(`og.jpg         creata ${fmt(og.length)} (1200x630) da ${path.basename(photoPath)}`);
}

await makeIcons();
await makeOg();
console.log("✅ fatto");
