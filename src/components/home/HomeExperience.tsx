"use client";

import { useRef } from "react";

import { HeroSection } from "@/components/hero/HeroSection";
import { IntroManifestoSection } from "@/components/home/IntroManifestoSection";
import { SiteNavbar } from "@/components/home/SiteNavbar";

import { useHomeHeroScroll } from "./useHomeHeroScroll";

type HomeExperienceProps = {
  heroImages: string[];
};

/**
 * Navbar globale fixed (layer separato dalla section intro); hero pin + GSAP; poi scroll normale.
 */
export function HomeExperience({ heroImages }: HomeExperienceProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const photoStackRef = useRef<HTMLDivElement>(null);
  const blueOverlayRef = useRef<HTMLDivElement>(null);
  const titleScaleRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useHomeHeroScroll(
    heroSectionRef,
    photoStackRef,
    blueOverlayRef,
    titleScaleRef,
    navbarRef,
    introSectionRef,
  );

  return (
    <div className="relative">
      <HeroSection
        images={heroImages}
        sectionRef={heroSectionRef}
        photoStackRef={photoStackRef}
        blueOverlayRef={blueOverlayRef}
        titleScaleRef={titleScaleRef}
      />
      <IntroManifestoSection
        ref={introSectionRef}
        visualSrc={heroImages[0]}
      />
      <SiteNavbar
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-[60] will-change-transform"
      />
    </div>
  );
}
