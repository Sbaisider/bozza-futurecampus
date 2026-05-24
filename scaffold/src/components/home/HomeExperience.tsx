"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HeroSection } from "@/components/hero/HeroSection";
import { HomeCtaFinaleSection } from "@/components/home/sections/HomeCtaFinaleSection";
import { HomeEdizioniPassateSection } from "@/components/home/sections/HomeEdizioniPassateSection";
import { HomeEsperienzaSection } from "@/components/home/sections/HomeEsperienzaSection";
import { HomeManifestoSection } from "@/components/home/sections/HomeManifestoSection";
import { HomePadriFondatoriSection } from "@/components/home/sections/HomePadriFondatoriSection";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import type { HomeMediaPicks } from "@/lib/home-media-picks";

type HomeExperienceProps = {
  heroImages: string[];
  media: HomeMediaPicks;
};

/**
 * Home minimal/premium — versione snella.
 *
 *  1. Hero
 *  2. Manifesto
 *  3. Esperienza (timeline verticale)
 *  4. Edizioni passate (card grandi, attaccate, hover scale)
 *  5. CTA finale (Contattaci)
 *  6. Footer
 *
 * Rimossi (su richiesta utente): Numeri, Edizione 2026, Partner/Sponsor.
 */
export function HomeExperience({ heroImages, media: _media }: HomeExperienceProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const esperienzaSectionRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarVisible, setNavbarVisible] = useState(false);

  useEffect(() => {
    const hero = heroSectionRef.current;
    if (!hero) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      // 48px ≈ altezza navbar: appena la pagina scrolla anche solo di pochi pixel
      // dentro la hero, la navbar entra dall'alto.
      setNavbarVisible(window.scrollY > 48);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToEsperienza = useCallback(() => {
    const el = esperienzaSectionRef.current;
    const nav = navbarRef.current;
    if (!el) return;
    const pad = nav?.offsetHeight ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - pad;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, y), behavior: smooth ? "smooth" : "auto" });
    window.history.replaceState(null, "", "#esperienza");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#esperienza") return;
    const t = window.setTimeout(scrollToEsperienza, 200);
    return () => window.clearTimeout(t);
  }, [scrollToEsperienza]);

  return (
    <div className="relative">
      <HeroSection images={heroImages} sectionRef={heroSectionRef} />
      <HomeManifestoSection />
      <HomeEsperienzaSection ref={esperienzaSectionRef} />
      <HomePadriFondatoriSection />
      <HomeEdizioniPassateSection />
      <HomeCtaFinaleSection />
      <SiteFooter />
      <SiteNavbar
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-[60] transition-[opacity,transform] duration-300 ease-out ${
          navbarVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onEsperienzaClick={scrollToEsperienza}
      />
    </div>
  );
}
