import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Webhook di revalidazione On-Demand chiamato da Sanity dopo ogni Publish.
 *
 * Quando un editor pubblica/modifica/elimina un articolo in Sanity Studio,
 * questa route invalida la cache Next.js (Data Cache + Full Route Cache) per
 * le pagine /blog e /blog/[slug] cosi' l'articolo compare immediatamente sul
 * sito pubblico, senza dover aspettare la scadenza ISR di 30s.
 *
 * SETUP IN SANITY STUDIO (una volta sola)
 * ---------------------------------------
 * 1. Vai su https://www.sanity.io/manage → progetto → API → Webhooks → Create
 * 2. URL:          https://www.futurecampus.it/api/revalidate
 *    Dataset:      production
 *    Trigger on:   Create, Update, Delete
 *    Filter:       _type == "articolo"
 *    HTTP method:  POST
 *    API version:  v2025-05-24
 *    Include drafts: NO
 *    Projection:   {
 *                    "_type": _type,
 *                    "slug": slug.current,
 *                    "operation": before() == null ? "create" :
 *                                 after()  == null ? "delete" : "update"
 *                  }
 * 3. Headers:      Authorization: Bearer <valore di SANITY_WEBHOOK_SECRET>
 *    (il segreto deve combaciare con la env var sul deploy Vercel)
 *
 * SETUP ENV
 * ---------
 * - In .env.local (dev) e su Vercel (prod) aggiungi:
 *     SANITY_WEBHOOK_SECRET=<stringa-random-lunga>
 *
 * Senza il webhook configurato il sito funziona comunque: l'ISR fallback
 * rigenera la pagina al massimo dopo 30s (vedi `export const revalidate = 30`
 * in /blog/page.tsx e /blog/[slug]/page.tsx).
 */

type SanityWebhookBody = {
  _type?: string;
  slug?: string;
  operation?: "create" | "update" | "delete";
};

export async function POST(req: Request) {
  // 1) Autorizzazione: header `Authorization: Bearer <SECRET>` deve combaciare
  //    con la env var. Senza secret configurato rifiutiamo: non vogliamo che
  //    chiunque possa scatenare revalidazioni a piacere.
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook secret non configurato sul server" },
      { status: 500 },
    );
  }
  const auth = req.headers.get("authorization") ?? "";
  const provided = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Non autorizzato" }, { status: 401 });
  }

  // 2) Body opzionale: se Sanity ci passa lo slug invalidiamo anche la pagina
  //    di dettaglio. In ogni caso invalidiamo la lista.
  let body: SanityWebhookBody = {};
  try {
    body = (await req.json()) as SanityWebhookBody;
  } catch {
    // body vuoto/non-json va bene: facciamo revalidate "broad".
  }

  // 3) Invalidazione: tag (Data Cache dei fetch) + path (Full Route Cache).
  //    Ridondante ma robusto: copre sia le pagine pre-renderizzate staticamente
  //    sia i fetch cached con tag.
  revalidateTag("articoli");
  revalidatePath("/blog");

  if (body.slug && typeof body.slug === "string") {
    revalidateTag(`articolo:${body.slug}`);
    revalidatePath(`/blog/${body.slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated: {
      tags: ["articoli", ...(body.slug ? [`articolo:${body.slug}`] : [])],
      paths: ["/blog", ...(body.slug ? [`/blog/${body.slug}`] : [])],
    },
    now: Date.now(),
  });
}

// Niente cache su questa route: deve essere sempre fresh.
export const dynamic = "force-dynamic";
