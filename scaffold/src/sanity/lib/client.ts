import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

/**
 * Client Sanity per leggere i dati dal frontend.
 * `useCdn: true` serve la versione cached (più veloce, può avere ~1min di delay).
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
});
