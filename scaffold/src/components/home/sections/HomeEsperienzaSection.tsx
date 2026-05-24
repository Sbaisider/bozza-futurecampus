import { forwardRef } from "react";

import Image from "next/image";

import { cosaEFutureCampus } from "@/content/info";
import type { HomeMediaPicks } from "@/lib/home-media-picks";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

const BACKDROP_PHOTO = "/foto/1287.JPG";

type Props = {
  media?: HomeMediaPicks;
};

/**
 * Esperienza in formato timeline ORIZZONTALE su sfondo foto blurata + patina blu.
 * - Sfondo: foto del campus, blur 24px, leggero zoom in loop (fc-crescita-bg-zoom).
 * - Patina blu primary in overlay per leggibilità.
 * - 4 nodi su linea orizzontale, scritte bianche.
 */
export const HomeEsperienzaSection = forwardRef<HTMLElement, Props>(
  function HomeEsperienzaSection(_props, ref) {
    return (
      <section
        ref={ref}
        id="esperienza"
        aria-labelledby="esperienza-heading"
        className="relative z-10 isolate overflow-hidden scroll-mt-24 bg-fc-primary"
      >
        {/* Sfondo foto blurata con leggero zoom in loop */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="fc-crescita-bg-zoom absolute inset-0 h-full w-full">
            <Image
              src={BACKDROP_PHOTO}
              alt=""
              fill
              sizes="100vw"
              quality={60}
              priority={false}
              className="object-cover"
              style={{ filter: "blur(24px)", transform: "scale(1.15)" }}
            />
          </div>
        </div>

        {/* Patina blu in overlay per leggibilità testo bianco */}
        <div
          className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-fc-primary/85 via-fc-primary/78 to-fc-primary/90"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-5 py-24 text-fc-white md:px-8 md:py-32 lg:py-40">
          <h2
            id="esperienza-heading"
            className="max-w-[18ch] text-balance text-[1.85rem] font-black leading-[1.08] tracking-tight text-fc-white sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem]"
            style={FONT_DISPLAY}
          >
            Non è il solito campus.
          </h2>

          {/* Timeline ORIZZONTALE */}
          <ol className="relative mt-20 md:mt-28">
            {/* linea orizzontale */}
            <span
              className="absolute left-0 right-0 top-[7px] h-px bg-fc-white/25 md:top-[9px]"
              aria-hidden
            />

            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
              {cosaEFutureCampus.paroleChiave.map((p) => (
                <li key={p.titolo} className="relative pt-10 md:pt-14">
                  {/* nodo */}
                  <span
                    className="absolute left-0 top-0 flex h-[15px] w-[15px] items-center justify-center md:h-[19px] md:w-[19px]"
                    aria-hidden
                  >
                    <span className="absolute inset-0 rounded-full border border-fc-white/40 bg-fc-primary" />
                    <span className="relative h-[7px] w-[7px] rounded-full bg-fc-accent md:h-2.5 md:w-2.5" />
                  </span>

                  {/* titolo + descrizione */}
                  <h3
                    className="text-[18px] font-black tracking-tight text-fc-white md:text-[22px] lg:text-[24px]"
                    style={FONT_DISPLAY}
                  >
                    {p.titolo}
                  </h3>
                  <p
                    className="mt-3 max-w-xs text-[13.5px] font-extralight leading-[1.65] text-fc-white/80 md:text-[14.5px]"
                    style={FONT_BODY}
                  >
                    {p.testo}
                  </p>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </section>
    );
  },
);
