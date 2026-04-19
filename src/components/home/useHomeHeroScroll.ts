"use client";

import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import {
  HERO_ONE_GESTURE_SCROLL_SEC,
  HERO_PIN_END,
  HERO_TITLE_SCALE_MAX,
} from "./home-hero-scroll-config";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/** Metà timeline = zoom titolo (+ velatura); metà = navbar (fixed) dall’alto + section intro dal basso. */
const PHASE_1_DURATION = 5;
const PHASE_2_DURATION = 5;

/** Velatura blu leggera sulle foto (fase 1) */
const BLUE_FADE_MAX = 0.2;

/**
 * Pin sulla hero. Fase 1: titolo + velatura. Fase 2: navbar fixed (y, autoAlpha) + sezione Esperienza (y), in parallelo.
 * Scrub inverso: navbar torna su, sezione verso il basso. Dopo il pin: navbar fixed, scroll normale sotto.
 */
export function useHomeHeroScroll(
  heroSectionRef: RefObject<HTMLElement | null>,
  photoStackRef: RefObject<HTMLDivElement | null>,
  blueOverlayRef: RefObject<HTMLDivElement | null>,
  titleScaleRef: RefObject<HTMLDivElement | null>,
  navbarRef: RefObject<HTMLElement | null>,
  introSectionRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const hero = heroSectionRef.current;
    const photos = photoStackRef.current;
    const blue = blueOverlayRef.current;
    const title = titleScaleRef.current;
    const nav = navbarRef.current;
    const intro = introSectionRef.current;

    if (!hero || !photos || !blue || !title || !nav || !intro) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(title, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(nav, { y: 0, autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(intro, { y: 0, pointerEvents: "auto" });
      gsap.set(blue, { opacity: BLUE_FADE_MAX });
      return;
    }

    gsap.set(title, { scale: 1, transformOrigin: "50% 50%", force3D: true });
    gsap.set(nav, {
      y: "-100%",
      autoAlpha: 0,
      pointerEvents: "none",
    });
    gsap.set(intro, {
      y: "100vh",
      pointerEvents: "none",
    });
    gsap.set(blue, { opacity: 0 });

    let scrollToTween: gsap.core.Tween | null = null;

    const ctx = gsap.context((gsapContext) => {
      const tl = gsap
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
          nav,
          { y: "-100%", autoAlpha: 0, pointerEvents: "none" },
          {
            y: 0,
            autoAlpha: 1,
            duration: PHASE_2_DURATION,
            ease: "power2.out",
            pointerEvents: "auto",
          },
          PHASE_1_DURATION,
        )
        .fromTo(
          intro,
          { y: "100vh", pointerEvents: "none" },
          {
            y: 0,
            duration: PHASE_2_DURATION,
            ease: "power2.inOut",
            pointerEvents: "auto",
          },
          PHASE_1_DURATION,
        );

      const st = tl.scrollTrigger;
      if (!st) return;

      const smoothScrollThroughHeroPin = () => {
        ScrollTrigger.refresh();
        const end = st.end;
        const y = window.scrollY;
        if (y >= end - 1) return;
        if (scrollToTween?.isActive()) return;

        const distance = end - y;
        const total = Math.max(end - st.start, 1);
        const t = Math.min(
          HERO_ONE_GESTURE_SCROLL_SEC,
          Math.max(
            0.75,
            (distance / total) * HERO_ONE_GESTURE_SCROLL_SEC,
          ),
        );

        scrollToTween = gsap.to(window, {
          scrollTo: { y: end, autoKill: true },
          duration: t,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            scrollToTween = null;
          },
        });
      };

      /** Un solo wheel verso il basso nella zona pin = scroll animato fino alla fine (prima schermata / Esperienza). */
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY <= 0) return;
        const y = window.scrollY;
        if (y >= st.end - 1) return;
        e.preventDefault();
        smoothScrollThroughHeroPin();
      };

      /** Touch: uno swipe verso l’alto (scroll giù) da cima pagina → stesso comportamento. */
      let touchY0 = 0;
      const onTouchStart = (e: TouchEvent) => {
        touchY0 = e.touches[0]?.clientY ?? 0;
      };
      const onTouchEnd = (e: TouchEvent) => {
        const t = e.changedTouches[0];
        if (!t) return;
        if (window.scrollY >= st.end - 1) return;
        if (window.scrollY > 8) return;
        const dy = touchY0 - t.clientY;
        if (dy < 48) return;
        e.preventDefault();
        smoothScrollThroughHeroPin();
      };

      window.addEventListener("wheel", onWheel, { passive: false });
      hero.addEventListener("touchstart", onTouchStart, { passive: true });
      hero.addEventListener("touchend", onTouchEnd, { passive: false });

      gsapContext.add(() => {
        window.removeEventListener("wheel", onWheel);
        hero.removeEventListener("touchstart", onTouchStart);
        hero.removeEventListener("touchend", onTouchEnd);
        scrollToTween?.kill();
        scrollToTween = null;
      });
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
    navbarRef,
    introSectionRef,
  ]);
}
