"use client";

import { useRef } from "react";

import { HeroSection } from "@/components/hero/HeroSection";
import { IntroManifestoSection } from "@/components/home/IntroManifestoSection";

import { useHomeHeroScroll } from "./useHomeHeroScroll";

type HomeExperienceProps = {
  heroImages: string[];
};

/**
 * Hero pinata per zoom + ingresso translateY della section intro; poi scroll normale (intro copre la hero sticky).
 */
export function HomeExperience({ heroImages }: HomeExperienceProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const photoStackRef = useRef<HTMLDivElement>(null);
  const blueOverlayRef = useRef<HTMLDivElement>(null);
  const titleScaleRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLElement>(null);

  useHomeHeroScroll(
    heroSectionRef,
    photoStackRef,
    blueOverlayRef,
    titleScaleRef,
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
    </div>
  );
}
