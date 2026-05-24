/**
 * Import dei 4 articoli iniziali dentro Sanity.
 *
 * Esegui (dalla cartella `scaffold/`):
 *
 *   node --env-file=.env.local scripts/import-articoli.mjs
 *
 * Lo script:
 *  1. Carica le 4 foto di copertina come Sanity asset (CDN).
 *  2. Crea 4 document "articolo" coi dati riportati sotto.
 *
 * Se rilanci lo script più volte, gli articoli vengono RICREATI (slug duplicati
 * vengono evitati da Sanity con un suffisso). Quindi lancialo UNA SOLA VOLTA.
 */

import { createClient } from "next-sanity";
import fs from "node:fs/promises";
import path from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-05-24";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("❌ Manca NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("❌ Manca SANITY_API_WRITE_TOKEN in .env.local (genera un Editor token su sanity.io/manage)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/**
 * I 4 articoli da importare. Ricalcati dai contenuti che erano in
 * `src/content/articoli.ts`.
 */
const ARTICOLI = [
  {
    titolo: "Sono aperte le iscrizioni alla quinta edizione",
    slug: "future-campus-2026-iscrizioni-aperte",
    sommario:
      "Dal 10 giugno parte il Future Campus 2026. Sei settimane, tre classi, una comunità che cresce ogni anno.",
    data: "2026-04-15",
    categoria: "Aggiornamenti",
    copertina: "public/foto/8505.JPG",
    paragrafi: [
      "Anche quest'anno il Campus torna dalla metà di giugno fino a fine luglio, con sei settimane di attività gratuite dedicate ai ragazzi delle scuole superiori del territorio di Fabriano.",
      "Le tre classi — Beginner, Master e Advanced — riprendono insieme: chi è alla prima esperienza scopre il Campus dall'inizio, chi torna prosegue il percorso con attività più avanzate e responsabilità maggiori.",
      "Per partecipare basta scriverci dalla pagina Contatti con i propri dati e una breve motivazione: vi rispondiamo entro pochi giorni.",
    ],
  },
  {
    titolo: "Attestati ai 150 ragazzi del Future Campus 2025",
    slug: "edizione-2025-consegna-attestati",
    sommario:
      "Si è chiusa il 23 luglio l'edizione 2025 con la consegna degli attestati a tutti i partecipanti delle tre classi.",
    data: "2025-07-23",
    categoria: "Aggiornamenti",
    copertina: "public/foto/7578.JPG",
    paragrafi: [
      "Una platea di famiglie, istituzioni, imprenditori e coach ha accompagnato i 150 ragazzi del Campus 2025 nella consegna ufficiale degli attestati.",
      "Una stagione che ha visto seminari sull'intelligenza artificiale, simulazioni di colloqui di lavoro, visite in azienda, public speaking, problem solving e — per la prima volta — gli ex-Advanced trasformati in coach dei più giovani.",
    ],
  },
  {
    titolo: "Perché un campus diverso, e perché qui",
    slug: "perche-un-campus-diverso",
    sommario:
      "Dietro Future Campus c'è un'indagine sui giovani del territorio. E un'idea: ridare ai ragazzi fiducia nel futuro che hanno qui.",
    data: "2025-03-10",
    categoria: "Territorio",
    copertina: "public/foto/3495.JPG",
    paragrafi: [
      "Un'indagine condotta tra i giovani del territorio ha restituito una fotografia spaccata in due: l'amore per la propria terra da una parte, la convinzione di doverla lasciare per realizzarsi dall'altra.",
      "Da quella riflessione è nato il Campus. Una sei settimane in cui i ragazzi entrano in contatto diretto con imprese, istituzioni e mestieri del territorio, per scoprire che le opportunità ci sono — e sono più vicine di quanto pensassero.",
      "Non si tratta di insegnare cose nuove: si tratta di farle vivere. È la differenza tra leggere un mestiere e vederlo, tra ascoltare un imprenditore e provarci.",
    ],
  },
  {
    titolo: "Future Campus premiato a 'Finanza e Territorio Marche'",
    slug: "premio-finanza-territorio-marche",
    sommario:
      "Primo premio nella sezione Cultura del concorso regionale: un riconoscimento al modello esperienziale del Campus.",
    data: "2024-10-12",
    categoria: "Aggiornamenti",
    copertina: "public/foto/3400.JPG",
    paragrafi: [
      "Future Campus Fabriano ha conquistato il primo premio nella sezione Cultura del concorso Finanza e Territorio Marche.",
      "Un riconoscimento al lavoro di Confindustria Ancona, Fondazione Merloni, partner e coach che hanno costruito un modello esperienziale unico nel suo genere a livello regionale.",
    ],
  },
];

/** Carica un file locale come Sanity image asset. Ritorna l'asset reference. */
async function uploadImage(relPath) {
  const fullPath = path.resolve(relPath);
  const buf = await fs.readFile(fullPath);
  const filename = path.basename(fullPath);
  console.log(`  ⤴  upload ${filename} (${(buf.length / 1024).toFixed(0)} KB)…`);
  const asset = await client.assets.upload("image", buf, { filename });
  return asset._id;
}

/** Converte un array di stringhe in un array di blocchi PortableText. */
function paragrafiAblocks(paragrafi) {
  return paragrafi.map((testo, i) => ({
    _type: "block",
    _key: `block-${i}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${i}`,
        text: testo,
        marks: [],
      },
    ],
  }));
}

async function importOne(item) {
  console.log(`\n→ ${item.titolo}`);
  const assetId = await uploadImage(item.copertina);
  const doc = {
    _type: "articolo",
    titolo: item.titolo,
    slug: { _type: "slug", current: item.slug },
    sommario: item.sommario,
    data: item.data,
    categoria: item.categoria,
    copertina: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    },
    corpo: paragrafiAblocks(item.paragrafi),
  };
  const created = await client.create(doc);
  console.log(`  ✓ creato: ${created._id}`);
  return created._id;
}

async function main() {
  console.log(`📦 Import ${ARTICOLI.length} articoli in Sanity (project: ${projectId}, dataset: ${dataset})`);
  for (const item of ARTICOLI) {
    try {
      await importOne(item);
    } catch (err) {
      console.error(`  ❌ Errore su "${item.titolo}":`, err.message);
    }
  }
  console.log("\n✅ Import completato.");
}

main().catch((e) => {
  console.error("Errore fatale:", e);
  process.exit(1);
});
