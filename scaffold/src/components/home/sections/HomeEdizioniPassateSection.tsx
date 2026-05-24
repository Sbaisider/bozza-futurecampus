import Image from "next/image";
import Link from "next/link";

import { getEdizioniOrdinate } from "@/content/edizioni";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * Edizioni passate: 4 card foto attaccate (gap 0), full-bleed (niente padding
 * laterale al container). Card più alte e prominenti, hover che scala 1.06
 * verso l'interno (z-index alto per non venir tagliata dai vicini).
 */
export function HomeEdizioniPassateSection() {
  const edizioni = getEdizioniOrdinate("desc")
    .filter((e) => !e.isCorrente)
    .slice(0, 4);

  return (
    <section className="relative z-10 bg-fc-light">
      {/* Header con padding normale (testo non a tutta larghezza) */}
      <div className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
              style={FONT_BODY}
            >
              Edizioni passate
            </p>
            <h2
              className="mt-6 max-w-[20ch] text-balance text-[1.85rem] font-black leading-[1.08] tracking-tight text-fc-dark sm:text-[2.25rem] md:text-[2.75rem]"
              style={FONT_DISPLAY}
            >
              Quattro anni di campus.
            </h2>
          </div>
          <Link
            href="/edizioni"
            className="self-start text-[11px] font-extralight uppercase tracking-[0.28em] text-fc-primary transition-colors hover:text-fc-accent md:self-end"
            style={FONT_BODY}
          >
            Esplora l&apos;archivio →
          </Link>
        </div>
      </div>

      {/* Card a tutta larghezza, attaccate. Blur+zoom-leggero di default,
          al hover il blur sparisce e parte uno zoom lento. Tutto su un singolo
          layer Image (no crossfade) → niente scatti, transizioni smooth. */}
      <ul className="mt-16 grid grid-cols-2 gap-0 md:mt-20 md:grid-cols-4">
        {edizioni.map((e) => (
          <li key={e.slug} className="group relative">
            <Link
              href={`/edizioni/${e.slug}`}
              className="relative block aspect-[3/4] overflow-hidden bg-fc-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-primary/40 md:aspect-[3/4.5]"
            >
              <Image
                src={e.copertina}
                alt={`Edizione ${e.anno}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                quality={72}
                className="fc-edizione-image object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fc-dark/70 via-fc-dark/15 to-transparent" />
              <p
                className="pointer-events-none absolute inset-x-6 bottom-7 text-[2.75rem] font-black leading-none tracking-tight text-white md:inset-x-7 md:bottom-8 md:text-[3.5rem] lg:text-[4.25rem]"
                style={FONT_DISPLAY}
              >
                {e.anno}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
