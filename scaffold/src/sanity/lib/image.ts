import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Helper per generare URL ottimizzati delle immagini caricate in Sanity.
 * Uso tipico: `urlFor(img).width(1600).height(900).fit("crop").url()`.
 * Sanity gestisce automaticamente CDN, resize, formato (auto webp/avif).
 */
export function urlFor(source: Image) {
  return builder.image(source);
}
