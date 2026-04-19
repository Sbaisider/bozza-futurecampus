"use client";

import type { RefObject } from "react";

import { IntroManifestoPanel } from "@/components/home/IntroManifestoPanel";
import { SiteNavbar } from "@/components/home/SiteNavbar";

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
  navbarRef: RefObject<HTMLElement | null>;
  introPanelRef: RefObject<HTMLDivElement | null>;
};

/**
 * Hero a layer assoluti: (1) collage + velatura blu (2) titolo (3) overlay nav + second screen.
 * Tutto vive nella stessa sezione pinata — niente push sul documento durante le fasi GSAP.
 */
export function HeroSection({
  images,
  sectionRef,
  photoStackRef,
  blueOverlayRef,
  titleScaleRef,
  navbarRef,
  introPanelRef,
}: HeroSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[100svh] min-h-[100svh] w-full overflow-hidden bg-fc-primary"
      aria-label="Future Campus Fabriano"
    >
      {/* Layer 1 — background (fermo nel viewport durante il pin) */}
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

      {/* Layer 2 — titolo */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
        <div
          ref={titleScaleRef}
          className="inline-flex flex-col items-center text-center will-change-transform [transform-origin:center_center]"
        >
          <HeroBrandCenter />
        </div>
      </div>

      {/* Layer 3 — navbar + second screen (solo transform/opacity, nessun flusso documento) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <SiteNavbar
          ref={navbarRef}
          className="absolute left-0 right-0 top-0 z-50 w-full"
        />
        <IntroManifestoPanel ref={introPanelRef} visualSrc={images[0]} />
      </div>
    </section>
  );
}
