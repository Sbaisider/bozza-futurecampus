"use client";

import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HERO_PIN_END, HERO_TITLE_SCALE_MAX } from "./home-hero-scroll-config";

gsap.registerPlugin(ScrollTrigger);

/** Metà timeline = zoom titolo (+ velatura); metà = ingresso section intro (translateY). Pin termina a fine timeline. */
const PHASE_1_DURATION = 5;
const PHASE_2_DURATION = 5;

/** Velatura blu leggera sulle foto (fase 1) */
const BLUE_FADE_MAX = 0.2;

/**
 * Pin solo sulla hero per `HERO_PIN_END`. Fase 1: titolo + velatura. Fase 2: section intro nel DOM sale con `y`.
 * A pin rilasciato: scroll normale; intro (z-10) copre la hero sticky (z-0).
 */
export function useHomeHeroScroll(
  heroSectionRef: RefObject<HTMLElement | null>,
  photoStackRef: RefObject<HTMLDivElement | null>,
  blueOverlayRef: RefObject<HTMLDivElement | null>,
  titleScaleRef: RefObject<HTMLDivElement | null>,
  introSectionRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const hero = heroSectionRef.current;
    const photos = photoStackRef.current;
    const blue = blueOverlayRef.current;
    const title = titleScaleRef.current;
    const intro = introSectionRef.current;

    if (!hero || !photos || !blue || !title || !intro) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(title, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(intro, { y: 0, autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(blue, { opacity: BLUE_FADE_MAX });
      return;
    }

    gsap.set(title, { scale: 1, transformOrigin: "50% 50%", force3D: true });
    gsap.set(intro, {
      y: "100vh",
      autoAlpha: 1,
      pointerEvents: "none",
    });
    gsap.set(blue, { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: HERO_PIN_END,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          title,
          { scale: 1 },
          {
            scale: HERO_TITLE_SCALE_MAX,
            duration: PHASE_1_DURATION,
            ease: "none",
            force3D: true,
          },
          0,
        )
        .fromTo(
          blue,
          { opacity: 0 },
          {
            opacity: BLUE_FADE_MAX,
            duration: PHASE_1_DURATION,
            ease: "none",
          },
          0,
        )
        .fromTo(
          intro,
          { y: "100vh", pointerEvents: "none" },
          {
            y: 0,
            duration: PHASE_2_DURATION,
            ease: "power3.out",
            pointerEvents: "auto",
          },
          PHASE_1_DURATION,
        );
    }, hero);

    const refresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [
    heroSectionRef,
    photoStackRef,
    blueOverlayRef,
    titleScaleRef,
    introSectionRef,
  ]);
}
