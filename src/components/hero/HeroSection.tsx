"use client";

import type { RefObject } from "react";

import { HeroBackgroundGrid } from "./HeroBackgroundGrid";
import { HeroBrandCenter } from "./HeroBrandCenter";
import { HeroColumnsStack } from "./HeroColumnsStack";
import { HeroVignette } from "./HeroVignette";

export type HeroSectionProps = {
  images: string[];
  sectionRef: RefObject<HTMLElement | null>;
  photoStackRef: RefObject<HTMLDivElement | null>;
  blueOverlayRef: RefObject<HTMLDivElement | null>;
  titleScaleRef: RefObject<HTMLDivElement | null>;
};

/**
 * Hero: solo collage + velatura + titolo. Sticky sotto la seconda schermata (z-0) dopo il pin.
 */
export function HeroSection({
  images,
  sectionRef,
  photoStackRef,
  blueOverlayRef,
  titleScaleRef,
}: HeroSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-0 isolate h-[100svh] min-h-[100svh] w-full overflow-hidden bg-fc-primary"
      aria-label="Future Campus Fabriano"
    >
      <div ref={photoStackRef} className="absolute inset-0 z-0">
        {images.length > 0 ? <HeroColumnsStack images={images} /> : null}
        <HeroVignette />
        <HeroBackgroundGrid />
      </div>
      <div
        ref={blueOverlayRef}
        className="absolute inset-0 z-[1] bg-fc-primary"
        style={{ opacity: 0 }}
        aria-hidden
      />

      {/* Titolo: stesso ref/classi di prima per lo zoom GSAP; velatura #244C90 a tutta area sotto al blocco titolo. */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[#244C90]/30" aria-hidden />
        <div className="relative flex h-full w-full items-center justify-center px-6">
          <div
            ref={titleScaleRef}
            className="inline-flex flex-col items-center text-center will-change-transform [transform-origin:center_center]"
          >
            <HeroBrandCenter />
          </div>
        </div>
      </div>
    </section>
  );
}
