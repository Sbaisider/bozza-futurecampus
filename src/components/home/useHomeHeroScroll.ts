"use client";

import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HERO_PIN_END, HERO_TITLE_SCALE_MAX } from "./home-hero-scroll-config";

gsap.registerPlugin(ScrollTrigger);

const TITLE_DURATION = 10;
const NAV_START = 5.45;
const NAV_DURATION = 2.05;

/**
 * Pin della hero + zoom titolo da centro testo + fade navbar sincronizzati allo scroll.
 */
export function useHomeHeroScroll(
  heroSectionRef: RefObject<HTMLElement | null>,
  heroBackgroundRef: RefObject<HTMLDivElement | null>,
  titleScaleRef: RefObject<HTMLDivElement | null>,
  navbarRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const hero = heroSectionRef.current;
    const bg = heroBackgroundRef.current;
    const title = titleScaleRef.current;
    const nav = navbarRef.current;

    if (!hero || !bg || !title || !nav) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(title, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(nav, { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      return;
    }

    gsap.set(title, { scale: 1, transformOrigin: "50% 50%", force3D: true });
    gsap.set(nav, { autoAlpha: 0, y: -20, pointerEvents: "none" });

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: HERO_PIN_END,
          pin: true,
          scrub: 0.28,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          title,
          { scale: 1 },
          {
            scale: HERO_TITLE_SCALE_MAX,
            duration: TITLE_DURATION,
            ease: "none",
            force3D: true,
          },
          0,
        )
        .fromTo(
          bg,
          { opacity: 1 },
          { opacity: 0.78, duration: TITLE_DURATION, ease: "none" },
          0,
        )
        .fromTo(
          nav,
          { autoAlpha: 0, y: -18, pointerEvents: "none" },
          {
            autoAlpha: 1,
            y: 0,
            pointerEvents: "auto",
            duration: NAV_DURATION,
            ease: "power2.out",
          },
          NAV_START,
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
  }, [heroSectionRef, heroBackgroundRef, titleScaleRef, navbarRef]);
}
