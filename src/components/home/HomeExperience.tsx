"use client";

import { useRef } from "react";

import { HeroSection } from "@/components/hero/HeroSection";

import { useHomeHeroScroll } from "./useHomeHeroScroll";

type HomeExperienceProps = {
  heroImages: string[];
};

/**
 * Homepage: tutta l’esperienza hero (foto, titolo, nav, second screen) in un’unica sezione pinata.
 * Lo scroll del documento riprende solo dopo la fine del pin (nessun contenuto sotto la hero durante il pin).
 */
export function HomeExperience({ heroImages }: HomeExperienceProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const photoStackRef = useRef<HTMLDivElement>(null);
  const blueOverlayRef = useRef<HTMLDivElement>(null);
  const titleScaleRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const introPanelRef = useRef<HTMLDivElement>(null);

  useHomeHeroScroll(
    heroSectionRef,
    photoStackRef,
    blueOverlayRef,
    titleScaleRef,
    navbarRef,
    introPanelRef,
  );

  return (
    <>
      <HeroSection
        images={heroImages}
        sectionRef={heroSectionRef}
        photoStackRef={photoStackRef}
        blueOverlayRef={blueOverlayRef}
        titleScaleRef={titleScaleRef}
        navbarRef={navbarRef}
        introPanelRef={introPanelRef}
      />
      {/* Contenuto sotto la hero: inizia solo dopo il rilascio del pin */}
      <div
        className="min-h-[40vh] bg-fc-light"
        id="dopo-hero"
        aria-hidden
      />
    </>
  );
}
