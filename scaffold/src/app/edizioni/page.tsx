import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { getEdizioniOrdinate } from "@/content/edizioni";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export const metadata: Metadata = {
  title: "Edizioni",
  description:
    "L'archivio delle edizioni del Future Campus Fabriano: dalla prima del 2022 alla quinta del 2026.",
};

export default function EdizioniIndexPage() {
  const edizioni = getEdizioniOrdinate("desc");

  return (
    <PageShell>
      <PageHero
        eyebrow="Edizioni"
        title="L'archivio delle annualità"
        lead="Dal 2022 a oggi, ogni edizione del Future Campus ha aggiunto un capitolo nuovo: una classe in più, ragazzi in più, una rete più larga"
        imageSrc="/foto/8505.JPG"
        imageAlt=""
      />

      <section className="relative isolate overflow-hidden bg-fc-primary">
        {/* Texture a punti molto leggera (coerente con la hero mobile) */}
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

        {/* MOBILE (<md): carosello orizzontale swipe-friendly.
            DESKTOP (md+): griglia full-bleed 5 colonne come prima. */}
        <ul
          className="
            fc-edizioni-carousel
            relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth
            px-5 py-8
            md:grid md:grid-cols-5 md:gap-0 md:overflow-visible md:px-0 md:py-0
          "
        >
          {edizioni.map((e, idx) => (
            <Reveal
              as="li"
              key={e.slug}
              delay={idx * 110}
              className="
                group relative shrink-0 snap-center
                w-[78vw] max-w-[22rem]
                md:w-auto md:max-w-none md:shrink md:snap-align-none
              "
            >
              <Link
                href={`/edizioni/${e.slug}`}
                className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-fc-dark shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-fc-dark/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-accent md:rounded-none md:shadow-none md:ring-0 md:aspect-[3/4.5] md:focus-visible:ring-fc-primary/40"
              >
                <Image
                  src={e.copertina}
                  alt={`Edizione ${e.anno}`}
                  fill
                  sizes="(min-width: 768px) 20vw, 78vw"
                  quality={72}
                  className="fc-edizione-image object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fc-dark/70 via-fc-dark/15 to-transparent" />
                <div className="pointer-events-none absolute inset-x-4 bottom-5 sm:inset-x-6 sm:bottom-7 md:inset-x-7 md:bottom-8">
                  <p
                    className="text-[2.25rem] font-black leading-none tracking-tight text-white sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem]"
                    style={FONT_DISPLAY}
                  >
                    {e.anno}
                  </p>
                  {e.anno === 2026 && (
                    <p
                      className="mt-2 text-[9.5px] font-extralight uppercase tracking-[0.28em] text-fc-accent sm:mt-3 sm:text-[10px] sm:tracking-[0.32em] md:text-[11px]"
                      style={FONT_BODY}
                    >
                      In arrivo
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
