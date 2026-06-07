import type { MetadataRoute } from "next";

import { edizioni } from "@/content/edizioni";
import { fetchArticoli } from "@/sanity/lib/fetch";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.futurecampus.it";

/** Sitemap generata: rotte statiche + edizioni + articoli blog (slug + lastModified). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/edizioni`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contatti`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/social`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const edizioniRoutes: MetadataRoute.Sitemap = edizioni.map((e) => ({
    url: `${BASE}/edizioni/${e.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: e.isCorrente ? 0.9 : 0.5,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const articoli = await fetchArticoli();
    blogRoutes = articoli.map((a) => ({
      url: `${BASE}/blog/${a.slug}`,
      lastModified: new Date(a.data),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Sanity irraggiungibile in build: la sitemap resta valida con le rotte note.
  }

  return [...staticRoutes, ...edizioniRoutes, ...blogRoutes];
}
