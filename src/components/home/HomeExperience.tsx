"use client";

import { useRef } from "react";

import { HeroSection } from "@/components/hero/HeroSection";
import { HomeCrescitaSection } from "@/components/home/sections/HomeCrescitaSection";
import { HomeEsperienzaSection } from "@/components/home/sections/HomeEsperienzaSection";
import { HomePartnerSection } from "@/components/home/sections/HomePartnerSection";
import { HomeVitaSection } from "@/components/home/sections/HomeVitaSection";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import type { HomeMediaPicks } from "@/lib/home-media-picks";

import { useHomeHeroScroll } from "./useHomeHeroScroll";

type HomeExperienceProps = {
  heroImages: string[];
  media: HomeMediaPicks;
};

/**
 * Hero + scroll GSAP + quattro blocchi premium dopo la hero (Esperienza → … → chiusura).
 */
export function HomeExperience({ heroImages, media }: HomeExperienceProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const photoStackRef = useRef<HTMLDivElement>(null);
  const blueOverlayRef = useRef<HTMLDivElement>(null);
  const titleScaleRef = useRef<HTMLDivElement>(null);
  const esperienzaSectionRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useHomeHeroScroll(
    heroSectionRef,
    photoStackRef,
    blueOverlayRef,
    titleScaleRef,
    navbarRef,
    esperienzaSectionRef,
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
      <HomeEsperienzaSection ref={esperienzaSectionRef} media={media} />
      <HomeCrescitaSection media={media} />
      <HomeVitaSection media={media} />
      <HomePartnerSection />
      <SiteNavbar
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-[60] will-change-transform"
      />
    </div>
  );
}
