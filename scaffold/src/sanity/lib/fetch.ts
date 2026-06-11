import { client } from "./client";
import {
  ARTICOLI_QUERY,
  ARTICOLI_SLUGS_QUERY,
  ARTICOLO_QUERY,
  type ArticoloSanity,
} from "./queries";

/**
 * Helper di fetch tipizzati per il contenuto Sanity.
 *
 * STRATEGIA DI CACHE
 * ------------------
 * - `revalidate: 30` = safety net: se il webhook di revalidazione non scatta
 *   (rete, errore Sanity, env mancante) il sito si aggiorna comunque entro 30s.
 * - `tags: ["articoli"]` / `tags: ["articolo:<slug>"]` = invalidazione mirata:
 *   il webhook in /api/revalidate chiama `revalidateTag(...)` ad ogni Publish
 *   in Sanity Studio → la nuova versione compare immediatamente (senza
 *   aspettare i 30s).
 *
 * Nessuna variabile interna usa Date.now() → safe per render statico/ISR.
 */
const REVALIDATE_SEC = 30;

export async function fetchArticoli(): Promise<ArticoloSanity[]> {
  return client.fetch<ArticoloSanity[]>(
    ARTICOLI_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SEC, tags: ["articoli"] } },
  );
}

export async function fetchArticolo(slug: string): Promise<ArticoloSanity | null> {
  const result = await client.fetch<ArticoloSanity | null>(
    ARTICOLO_QUERY,
    { slug },
    { next: { revalidate: REVALIDATE_SEC, tags: [`articolo:${slug}`] } },
  );
  return result ?? null;
}

export async function fetchArticoliSlugs(): Promise<string[]> {
  return client.fetch<string[]>(
    ARTICOLI_SLUGS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SEC, tags: ["articoli"] } },
  );
}
