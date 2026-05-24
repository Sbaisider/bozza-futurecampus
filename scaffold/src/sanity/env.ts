/**
 * Variabili d'ambiente per Sanity.
 * Sono lette sia dal client (browser) sia dal Server Component.
 * Configurate in `.env.local` (vedi `.env.local.example`).
 */

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Manca NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local",
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  "Manca NEXT_PUBLIC_SANITY_DATASET in .env.local",
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-05-24";

/** Token read-only opzionale per leggere draft o dataset privati. */
export const readToken = process.env.SANITY_API_READ_TOKEN;

/** URL del CDN di Sanity per le immagini ottimizzate. */
export const useCdn = true;
