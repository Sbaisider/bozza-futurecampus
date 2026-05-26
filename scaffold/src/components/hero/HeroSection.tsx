import type { RefObject } from "react";

import { HeroBackgroundGrid } from "./HeroBackgroundGrid";
import { HeroColumnsStack } from "./HeroColumnsStack";
import { HeroVignette } from "./HeroVignette";
import { LetteringMark } from "./LetteringMark";

export type HeroSectionProps = {
  images: string[];
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Hero "editorial": collage di foto a colonne + velatura blu + fascia bianca
 * orizzontale con il lettering "Future Campus Fabriano" appoggiato sopra.
 * Il lettering è renderizzato 3 volte (TOP/MID/BOTTOM) con clip-path in % della
 * hero: bianco fuori dalla fascia, blu primario dentro.
 *
 * Scroll nativo: la hero è una sezione standard 100svh che scorre via verso
 * l'alto come qualunque altra. La navbar appare quando la hero esce dal
 * viewport (gestito da `HomeExperience` con IntersectionObserver).
 */
const HERO_BAND_TOP_PCT = 41;
const HERO_BAND_HEIGHT_PCT = 18;
const HERO_BAND_BOTTOM_PCT = 100 - HERO_BAND_TOP_PCT - HERO_BAND_HEIGHT_PCT;

const LETTERING_WIDTH_CLASS =
  "h-auto w-[min(86vw,32rem)] sm:w-[min(80vw,38rem)] md:w-[min(72vw,44rem)] lg:w-[min(64vw,52rem)]";

export function HeroSection({ images, sectionRef }: HeroSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-fc-primary"
      aria-label="Future Campus Fabriano"
    >
      {/* h1 accessibile (le copie SVG sono aria-hidden) */}
      <h1 className="sr-only">Future Campus Fabriano</h1>

      {/* ─── MOBILE (<md): hero pulito su blu pieno, senza foto né fascia bianca.
              Lettering bianco centrato, sottile texture a punti per dare ritmo. */}
      <div className="absolute inset-0 z-[5] flex flex-col md:hidden" aria-hidden>
        {/* Texture a punti molto leggera (no foto) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Glow morbido in alto, scurimento in basso → profondità */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/30" />

        {/* Eyebrow + lettering centrati verticalmente */}
        <div className="relative z-[2] flex flex-1 flex-col items-center justify-center px-6 text-fc-white">
          <p
            className="mb-7 inline-flex items-center gap-3 text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-white/80"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            <span aria-hidden className="h-px w-7 bg-fc-accent/80" />
            Edizione 2026
            <span aria-hidden className="h-px w-7 bg-fc-accent/80" />
          </p>
          <LetteringMark className="h-auto w-[min(86vw,32rem)] text-fc-white" />
        </div>

        {/* Hint scroll in basso */}
        <div className="relative z-[2] pb-8 text-center">
          <p
            className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-white/55"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Scorri
          </p>
        </div>
      </div>

      {/* ─── DESKTOP (md+): hero editorial originale con foto a colonne ─── */}
      <div className="absolute inset-0 z-0 hidden md:block">
        {/* Foto a colonne + griglia + vignette */}
        <div className="absolute inset-0 z-0">
          {images.length > 0 ? <HeroColumnsStack images={images} /> : null}
          <HeroVignette />
          <HeroBackgroundGrid />
        </div>

        {/* Velatura blu statica sopra le foto */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[#244C90]/30" aria-hidden />

        {/* Fascia bianca: piedistallo del lettering */}
        <div
          className="pointer-events-none absolute inset-x-0 z-[3] bg-fc-white"
          style={{ top: `${HERO_BAND_TOP_PCT}%`, height: `${HERO_BAND_HEIGHT_PCT}%` }}
          aria-hidden
        />

        {/* Lettering: 3 copie clip-pathed nella stessa posizione/dimensione.
            - TOP    (0 → BAND_TOP)              → bianco
            - MID    (BAND_TOP → BAND_TOP+BAND_H) → blu (sulla fascia)
            - BOTTOM (BAND_TOP+BAND_H → 100)     → bianco */}
        <div className="pointer-events-none absolute inset-0 z-[10]" aria-hidden>
          <div
            className="absolute inset-0 flex items-center justify-center px-6 text-fc-white"
            style={{ clipPath: `inset(0 0 ${HERO_BAND_TOP_PCT + HERO_BAND_HEIGHT_PCT}% 0)` }}
          >
            <LetteringMark className={LETTERING_WIDTH_CLASS} />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center px-6 text-fc-primary"
            style={{
              clipPath: `inset(${HERO_BAND_TOP_PCT}% 0 ${HERO_BAND_BOTTOM_PCT}% 0)`,
            }}
          >
            <LetteringMark className={LETTERING_WIDTH_CLASS} />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center px-6 text-fc-white"
            style={{ clipPath: `inset(${HERO_BAND_TOP_PCT + HERO_BAND_HEIGHT_PCT}% 0 0 0)` }}
          >
            <LetteringMark className={LETTERING_WIDTH_CLASS} />
          </div>
        </div>
      </div>
    </section>
  );
}
