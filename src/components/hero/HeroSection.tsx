"use client";

import type { RefObject } from "react";

import { HeroBackgroundGrid } from "./HeroBackgroundGrid";
import { HeroBrandCenter } from "./HeroBrandCenter";
import { HeroColumnsStack } from "./HeroColumnsStack";
import { HeroVignette } from "./HeroVignette";

export type HeroSectionProps = {
  images: string[];
  sectionRef: RefObject<HTMLElement | null>;
  backgroundLayerRef: RefObject<HTMLDivElement | null>;
  titleScaleRef: RefObject<HTMLDivElement | null>;
};

/**
 * Hero fullscreen: collage, titolo su wrapper dedicato allo scale (origine centro testo).
 */
export function HeroSection({
  images,
  sectionRef,
  backgroundLayerRef,
  titleScaleRef,
}: HeroSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[100svh] min-h-[100svh] w-full overflow-hidden bg-fc-primary"
      aria-label="Future Campus Fabriano"
    >
      <div ref={backgroundLayerRef} className="absolute inset-0">
        <HeroColumnsStack images={images} />
        <HeroVignette />
        <HeroBackgroundGrid />
      </div>

      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
        <div
          ref={titleScaleRef}
          className="inline-flex flex-col items-center text-center will-change-transform [transform-origin:center_center]"
        >
          <HeroBrandCenter />
        </div>
      </div>
    </section>
  );
}
