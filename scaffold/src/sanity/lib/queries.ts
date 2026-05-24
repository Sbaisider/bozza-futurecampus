import { groq } from "next-sanity";

import type { PortableTextBlock } from "@portabletext/react";
import type { Image as SanityImage } from "sanity";

/**
 * Tipo "Articolo" come arriva da Sanity dopo la query GROQ.
 * `slug` è già normalizzato a stringa (lato GROQ estraiamo `slug.current`).
 */
export type ArticoloSanity = {
  _id: string;
  slug: string;
  titolo: string;
  sommario: string;
  data: string; // YYYY-MM-DD
  categoria: "Aggiornamenti" | "Storie" | "Territorio" | "Formazione";
  copertina: SanityImage & { alt?: string };
  corpo: PortableTextBlock[];
  autore?: string;
};

/** Tutti gli articoli, dal più recente. */
export const ARTICOLI_QUERY = groq`*[_type == "articolo"] | order(data desc) {
  _id,
  "slug": slug.current,
  titolo,
  sommario,
  data,
  categoria,
  copertina,
  autore
}`;

/** Articolo singolo per slug + corpo completo. */
export const ARTICOLO_QUERY = groq`*[_type == "articolo" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  titolo,
  sommario,
  data,
  categoria,
  copertina,
  corpo,
  autore
}`;

/** Solo gli slug — usato per `generateStaticParams`. */
export const ARTICOLI_SLUGS_QUERY = groq`*[_type == "articolo" && defined(slug.current)][].slug.current`;
