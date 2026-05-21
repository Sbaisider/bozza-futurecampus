#!/usr/bin/env node
/**
 * Pre-ottimizzazione video sorgenti.
 *
 * Cosa fa:
 *   - Legge tutti i .mp4 in `public/video/`
 *   - Per ognuno: ricodifica H.264 + AAC, ridimensiona a max 1280×720,
 *     cap bitrate ~1.8 Mbps. Risultato: file 5-15x più leggeri,
 *     decodifica più veloce, autoplay fluido.
 *   - Salva l'output in `public/video/`, sposta gli originali in
 *     `public/video-originali/`.
 *
 * Requisito ffmpeg — lo script cerca in quest'ordine:
 *   1. variabile d'ambiente `FFMPEG_PATH` (path completo all'eseguibile)
 *   2. pacchetto npm `ffmpeg-static` (consigliato — `npm i -D ffmpeg-static`)
 *   3. comando `ffmpeg` dal PATH di sistema
 *
 * Setup più rapido (Windows):
 *   npm install --save-dev ffmpeg-static
 *   node scripts/optimize-videos.mjs
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(PROJECT_ROOT, "public", "video");
const BACKUP_DIR = path.join(PROJECT_ROOT, "public", "video-originali");

const MAX_HEIGHT = 720;
const VIDEO_BITRATE = "1800k";
const AUDIO_BITRATE = "96k";

/**
 * Trova un eseguibile ffmpeg utilizzabile in ordine di preferenza.
 * Ritorna { path, source } o null.
 */
async function resolveFfmpeg() {
  // 1. Variabile d'ambiente esplicita (utile se ffmpeg non è nel PATH)
  const envPath = process.env.FFMPEG_PATH?.trim();
  if (envPath) {
    if (await testFfmpeg(envPath)) {
      return { path: envPath, source: `env FFMPEG_PATH (${envPath})` };
    }
    console.warn(
      `   ⚠ FFMPEG_PATH=${envPath} ma l'eseguibile non risponde. Provo altre opzioni…`,
    );
  }

  // 2. Pacchetto npm ffmpeg-static (binario pre-scaricato in node_modules)
  try {
    const mod = await import("ffmpeg-static");
    const staticPath = mod.default ?? mod;
    if (typeof staticPath === "string" && (await testFfmpeg(staticPath))) {
      return { path: staticPath, source: "ffmpeg-static (npm)" };
    }
  } catch {
    /* pacchetto non installato → continua */
  }

  // 3. ffmpeg dal PATH di sistema
  if (await testFfmpeg("ffmpeg")) {
    return { path: "ffmpeg", source: "PATH di sistema" };
  }

  return null;
}

function testFfmpeg(bin) {
  return new Promise((resolve) => {
    const p = spawn(bin, ["-version"], { stdio: "ignore" });
    p.on("error", () => resolve(false));
    p.on("close", (code) => resolve(code === 0));
  });
}

function runFfmpegFactory(bin) {
  return function runFfmpeg(args) {
    return new Promise((resolve, reject) => {
      const p = spawn(bin, args, { stdio: ["ignore", "ignore", "pipe"] });
      let stderr = "";
      p.stderr.on("data", (d) => (stderr += d.toString()));
      p.on("error", reject);
      p.on("close", (code) =>
        code === 0
          ? resolve()
          : reject(new Error(`ffmpeg exit ${code}\n${stderr.slice(-400)}`)),
      );
    });
  };
}

async function main() {
  const ff = await resolveFfmpeg();
  if (!ff) {
    console.error(
      "❌ ffmpeg non disponibile.\n\n" +
        "Soluzione più rapida (consigliata):\n" +
        "   npm install --save-dev ffmpeg-static\n\n" +
        "Alternativa: installa ffmpeg di sistema da https://ffmpeg.org/download.html\n" +
        "e assicurati che `ffmpeg -version` risponda dal terminale.\n\n" +
        "Oppure punta a un eseguibile specifico:\n" +
        "   set FFMPEG_PATH=C:\\Users\\chris\\Downloads\\ffmpeg\\bin\\ffmpeg.exe\n" +
        "   node scripts/optimize-videos.mjs",
    );
    process.exit(1);
  }
  console.log(`✔ ffmpeg trovato: ${ff.source}\n`);
  const runFfmpeg = runFfmpegFactory(ff.path);

  let files = [];
  try {
    files = (await fs.readdir(SRC_DIR)).filter((f) => /\.mp4$/i.test(f));
  } catch {
    console.log("Cartella public/video/ assente. Niente da fare.");
    return;
  }

  if (files.length === 0) {
    console.log("Nessun video trovato in public/video/.");
    return;
  }

  await fs.mkdir(BACKUP_DIR, { recursive: true });
  console.log(`🎬 Ottimizzazione di ${files.length} video…`);
  console.log(`   Sorgente:    ${SRC_DIR}`);
  console.log(`   Backup orig: ${BACKUP_DIR}`);
  console.log(`   Max altezza: ${MAX_HEIGHT}px · bitrate video: ${VIDEO_BITRATE}\n`);

  let savedBytes = 0;
  let okCount = 0;
  let skipCount = 0;

  for (const file of files) {
    const src = path.join(SRC_DIR, file);
    const backup = path.join(BACKUP_DIR, file);

    try {
      await fs.access(backup);
      skipCount++;
      continue;
    } catch {
      /* non esiste → procedi */
    }

    const origStat = await fs.stat(src);
    const origSize = origStat.size;

    // Sposta in backup prima di iniziare (evita conflitti se ffmpeg scrive su src)
    await fs.rename(src, backup);

    // Codifica web-friendly: H.264 baseline+main, AAC, faststart per autoplay
    const args = [
      "-y",
      "-i",
      backup,
      "-vf",
      `scale='min(iw,trunc(oh*a/2)*2)':'min(${MAX_HEIGHT},ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-profile:v",
      "main",
      "-pix_fmt",
      "yuv420p",
      "-b:v",
      VIDEO_BITRATE,
      "-maxrate",
      "2200k",
      "-bufsize",
      "3600k",
      "-c:a",
      "aac",
      "-b:a",
      AUDIO_BITRATE,
      "-movflags",
      "+faststart",
      src,
    ];

    try {
      console.log(`   ⏳ ${file}…`);
      await runFfmpeg(args);
      const newSize = (await fs.stat(src)).size;
      const saved = origSize - newSize;
      savedBytes += saved;
      okCount++;
      const fmt = (n) =>
        n > 1024 * 1024
          ? `${(n / 1024 / 1024).toFixed(1)}MB`
          : `${Math.round(n / 1024)}KB`;
      console.log(
        `   ✓ ${file.padEnd(34)} ${fmt(origSize).padStart(8)} → ${fmt(newSize).padStart(8)}  (-${fmt(saved)})`,
      );
    } catch (e) {
      console.error(`   ✗ ${file}: ${e.message ?? e}`);
      // Ripristina originale se ffmpeg fallisce
      try {
        await fs.rename(backup, src);
      } catch {}
    }
  }

  console.log("");
  console.log(`✅ Ottimizzati: ${okCount}`);
  if (skipCount > 0) console.log(`⏭  Saltati (già in backup): ${skipCount}`);
  if (savedBytes > 0) {
    console.log(`💾 Spazio risparmiato: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
