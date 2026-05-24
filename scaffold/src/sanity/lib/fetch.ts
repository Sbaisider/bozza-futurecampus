import { client } from "./client";
import {
  ARTICOLI_QUERY,
  ARTICOLI_SLUGS_QUERY,
  ARTICOLO_QUERY,
  type ArticoloSanity,
} from "./queries";

/**
 * Helper di fetch tipizzati. ISR di 60s: dopo "Publish" da Studio il sito
 * mostra il nuovo contenuto entro 1 minuto al massimo (su Vercel, con webhook,
 * istantaneo). Nessuna variabile interna usa Date.now() → safe per SSR.
 */
const REVALIDATE_SEC = 60;

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
