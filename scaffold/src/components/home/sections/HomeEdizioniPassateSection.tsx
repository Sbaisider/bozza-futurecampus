import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/Reveal";
import { getEdizioniOrdinate } from "@/content/edizioni";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * Edizioni passate: 4 card foto attaccate (gap 0), full-bleed (niente padding
 * laterale al container). Card più alte e prominenti, hover che scala 1.06
 * verso l'interno (z-index alto per non venir tagliata dai vicini).
 *
 * Sfondo: blu pieno + texture a punti (stesso della hero mobile).
 */
export function HomeEdizioniPassateSection() {
  const edizioni = getEdizioniOrdinate("desc")
    .filter((e) => !e.isCorrente)
    .slice(0, 4);

  return (
    <section className="relative z-10 isolate overflow-hidden bg-fc-primary">
      {/* Texture a punti molto leggera (stessa della hero mobile) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      {/* Glow morbido in alto, scurimento in basso → profondità */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/30"
        aria-hidden
      />

      {/* Header con padding normale (testo non a tutta larghezza) */}
      <div className="relative mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal as="div">
            <h2
              className="max-w-[20ch] text-balance text-[1.85rem] font-black leading-[1.08] tracking-tight text-fc-white sm:text-[2.25rem] md:text-[2.75rem]"
              style={FONT_DISPLAY}
            >
              Edizioni passate
            </h2>
          </Reveal>
          <Reveal as="div" delay={180} className="self-start md:self-end">
            <Link
              href="/edizioni"
              className="text-[11px] font-extralight uppercase tracking-[0.28em] text-fc-white transition-colors hover:text-fc-accent"
              style={FONT_BODY}
            >
              Esplora l&apos;archivio →
            </Link>
          </Reveal>
        </div>
      </div>

      {/* MOBILE (<md): carosello orizzontale con snap, swipe-friendly.
          DESKTOP (md+): griglia full-bleed 4 colonne come prima.
          Blur+zoom-leggero di default; hover su desktop attiva sharp+zoom. */}
      <ul
        className="
          fc-edizioni-carousel
          relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth
          px-5 pb-5 pt-2
          md:mt-20 md:grid md:grid-cols-4 md:gap-0 md:overflow-visible md:px-0 md:py-0
        "
      >
        {edizioni.map((e, idx) => (
          <Reveal
            as="li"
            key={e.slug}
            delay={300 + idx * 110}
            className="
              group relative shrink-0 snap-center
              w-[78vw] max-w-[22rem]
              md:w-auto md:max-w-none md:shrink md:snap-align-none
            "
          >
            <Link
              href={`/edizioni/${e.slug}`}
              className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-fc-dark shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-accent md:rounded-none md:shadow-none md:ring-0 md:aspect-[3/4.5] md:focus-visible:ring-fc-primary/40"
            >
              <Image
                src={e.copertina}
                alt={`Edizione ${e.anno}`}
                fill
                sizes="(min-width: 768px) 25vw, 78vw"
                quality={72}
                className="fc-edizione-image object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fc-dark/70 via-fc-dark/15 to-transparent" />
              <p
                className="pointer-events-none absolute inset-x-4 bottom-5 text-[2.25rem] font-black leading-none tracking-tight text-white sm:inset-x-6 sm:bottom-7 sm:text-[2.75rem] md:inset-x-7 md:bottom-8 md:text-[3.5rem] lg:text-[4.25rem]"
                style={FONT_DISPLAY}
              >
                {e.anno}
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>

      {/* Spazio in fondo (solo mobile) per evitare che il carosello tocchi la sezione successiva */}
      <div className="h-10 md:hidden" aria-hidden />
    </section>
  );
}
