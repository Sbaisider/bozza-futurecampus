"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { HomeMediaPicks } from "@/lib/home-media-picks";

const LABELS = [
  "Laboratori",
  "Orientamento",
  "Aziende",
  "Soft skills",
  "Tecnologia",
  "Team",
] as const;

const INTERVAL_MS = 3000;

type Props = { media: HomeMediaPicks };

export function HomeVitaSection({ media }: Props) {
  const shots = media.vitaGallery;
  const slides = useMemo(
    () =>
      shots.map((src, i) => ({
        src,
        label: LABELS[i % LABELS.length],
      })),
    [shots],
  );

  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (slides.length === 0) return;
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    setIndex((i) => {
      if (slides.length === 0) return 0;
      return Math.min(i, slides.length - 1);
    });
  }, [slides.length]);

  /* Ogni cambio slide (manuale o automatico) riavvia il countdown di INTERVAL_MS. */
  useEffect(() => {
    if (slides.length <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length, index]);

  return (
    <section
      id="vita"
      className="relative z-10 scroll-mt-24 border-t border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 fc-vita-dot-grid" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Come si vive
            </p>
            <h2
              className="mt-3 text-pretty text-2xl font-black tracking-tight text-white md:text-3xl"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              Attività concrete.
            </h2>
          </div>
          
        </div>

        <div className="mt-12 md:mt-14">
          {slides.length === 0 ? (
            <div
              className="flex aspect-[16/10] max-h-[min(70vh,520px)] w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-sm font-extralight text-white/60"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Aggiungi foto in <span className="px-1 text-fc-accent">/public/foto</span>
            </div>
          ) : (
            <div
              className="relative mx-auto max-w-4xl rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-fc-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#244c90]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Galleria vita al campus"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  go(-1);
                }
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  go(1);
                }
              }}
            >
              <div className="relative aspect-[16/10] max-h-[min(72vh,560px)] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)]">
                {slides.map((slide, i) => (
                  <div
                    key={`${slide.src}-${i}`}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      i === index ? "z-10 opacity-100" : "z-0 opacity-0"
                    }`}
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={slide.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                      priority={i === 0}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-5 pb-5 pt-24 md:px-8 md:pb-7">
                      <p
                        className="text-[11px] font-light uppercase tracking-[0.28em] text-white/95 md:text-xs"
                        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                      >
                        {slide.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Scorri le immagini"
                >
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Vai alla slide ${i + 1} di ${slides.length}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-8 bg-fc-accent"
                          : "w-2 bg-white/35 hover:bg-white/55"
                      }`}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/90 transition hover:border-white/45 hover:bg-white/10"
                    aria-label="Immagine precedente"
                    onClick={() => go(-1)}
                  >
                    <span className="text-lg leading-none" aria-hidden>
                      ‹
                    </span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/90 transition hover:border-white/45 hover:bg-white/10"
                    aria-label="Immagine successiva"
                    onClick={() => go(1)}
                  >
                    <span className="text-lg leading-none" aria-hidden>
                      ›
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
