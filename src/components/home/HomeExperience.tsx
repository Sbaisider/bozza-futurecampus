"use client";

import { useRef } from "react";

import { HeroSection } from "@/components/hero/HeroSection";

import { IntroManifestoSection } from "./IntroManifestoSection";
import { SiteNavbar } from "./SiteNavbar";
import { useHomeHeroScroll } from "./useHomeHeroScroll";

type HomeExperienceProps = {
  heroImages: string[];
};

/**
 * Homepage: hero pin + zoom titolo (GSAP), navbar, sezione introduttiva.
 */
export function HomeExperience({ heroImages }: HomeExperienceProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const titleScaleRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useHomeHeroScroll(
    heroSectionRef,
    heroBackgroundRef,
    titleScaleRef,
    navbarRef,
  );

  return (
    <>
      <SiteNavbar ref={navbarRef} />
      <HeroSection
        images={heroImages}
        sectionRef={heroSectionRef}
        backgroundLayerRef={heroBackgroundRef}
        titleScaleRef={titleScaleRef}
      />
      <IntroManifestoSection visualSrc={heroImages[0]} />
    </>
  );
}
