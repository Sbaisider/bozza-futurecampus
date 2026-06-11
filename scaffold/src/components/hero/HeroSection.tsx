import type { RefObject } from "react";

import { HeroBackgroundGrid } from "./HeroBackgroundGrid";
import { HeroVignette } from "./HeroVignette";
import { LetteringMark } from "./LetteringMark";

export type HeroSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Hero: video di sfondo a tutta pagina + velo blu/scurimento per leggibilità +
 * eyebrow "Edizione 2026" e lettering "Future Campus Fabriano" in bianco al
 * centro. Layout unificato mobile + desktop (il lettering scala in larghezza
 * tramite breakpoint Tailwind).
 *
 * Video: H.264 MP4 ottimizzato (~10 MB, 1080p, faststart, no audio) in loop
 * autoplay muted playsinline; poster come fallback prima del play e per la
 * preview SSR. Stesso video su desktop e mobile (autoplay funziona perché
 * muted + playsInline).
 *
 * Scroll nativo: la hero è una sezione 100svh che scorre via verso l'alto.
 * La navbar appare quando la hero esce dal viewport (gestito da
 * `HomeExperience` con IntersectionObserver).
 */
const HERO_VIDEO_SRC = "/video_hero_home/hero.mp4";
const HERO_VIDEO_POSTER = "/video_hero_home/hero_poster.jpg";

const LETTERING_WIDTH_CLASS =
  "h-auto w-[min(86vw,32rem)] sm:w-[min(80vw,38rem)] md:w-[min(72vw,44rem)] lg:w-[min(64vw,52rem)]";

export function HeroSection({ sectionRef }: HeroSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-fc-primary"
      aria-label="Future Campus Fabriano"
    >
      {/* h1 accessibile (la copia SVG è aria-hidden) */}
      <h1 className="sr-only">Future Campus Fabriano</h1>

      {/* ─── SFONDO: video sempre presente (mobile + desktop) ─── */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          poster={HERO_VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
        />
        <HeroVignette />
        <HeroBackgroundGrid />
      </div>

      {/* ─── VELO: blu primario + scurimento dal basso per la leggibilità ─── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        <div className="absolute inset-0 bg-fc-primary/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
      </div>

      {/* ─── CONTENUTO: eyebrow + lettering centrati + scroll hint ─── */}
      <div className="absolute inset-0 z-[5] flex flex-col" aria-hidden>
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-fc-white">
          <p
            className="mb-7 inline-flex items-center gap-3 text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] md:mb-9 md:text-[11px]"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            <span aria-hidden className="h-px w-7 bg-fc-accent/90 md:w-10" />
            Edizione 2026
            <span aria-hidden className="h-px w-7 bg-fc-accent/90 md:w-10" />
          </p>
          <LetteringMark
            className={`${LETTERING_WIDTH_CLASS} text-fc-white [filter:drop-shadow(0_2px_14px_rgba(0,0,0,0.35))]`}
          />
        </div>

        <div className="relative pb-8 text-center">
          <p
            className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Scorri
          </p>
        </div>
      </div>
    </section>
  );
}
