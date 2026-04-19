"use client";

import { forwardRef, useMemo } from "react";

import Image from "next/image";

import type { HomeMediaPicks } from "@/lib/home-media-picks";

/** Clip in rotazione; ogni slide = tutta larghezza schermo × altezza sezione. */
const MAX_BG_CLIPS = 3;

type HomeEsperienzaSectionProps = {
  media: HomeMediaPicks;
};

function buildMarqueeItems(videos: string[], photos: string[]) {
  const v = videos.slice(0, MAX_BG_CLIPS);
  const p = photos.slice(0, MAX_BG_CLIPS);

  if (v.length > 0) {
    const base = v.length >= 2 ? v : [...v, ...v, ...v];
    return { kind: "video" as const, items: base };
  }
  if (p.length > 0) {
    const base = p.length >= 2 ? p : [...p, ...p, ...p];
    return { kind: "image" as const, items: base };
  }
  return { kind: "empty" as const, items: [] as string[] };
}

/**
 * Stack: sfondo bianco → video (marquee, leggero, tutta la sezione) → patina blu → testi.
 */
export const HomeEsperienzaSection = forwardRef<
  HTMLElement,
  HomeEsperienzaSectionProps
>(function HomeEsperienzaSection({ media }, ref) {
  const marquee = useMemo(
    () =>
      buildMarqueeItems(media.esperienzaVideos, media.esperienzaPhotos),
    [media.esperienzaVideos, media.esperienzaPhotos],
  );

  const loop = useMemo(() => {
    if (marquee.items.length === 0) return [];
    return [...marquee.items, ...marquee.items];
  }, [marquee.items]);

  const durationSec = Math.min(
    110,
    Math.max(48, marquee.items.length * 32),
  );

  return (
    <section
      ref={ref}
      id="esperienza"
      className="relative z-10 -mt-[100svh] min-h-[min(88svh,820px)] scroll-mt-24 overflow-hidden rounded-t-3xl border-t border-fc-soft/50 bg-fc-white shadow-[0_-12px_48px_rgba(7,8,8,0.06)]"
    >
      {/* 1 — Base bianca (esplicita; il resto è in layer assoluti) */}
      <div className="pointer-events-none absolute inset-0 bg-fc-white" aria-hidden />

      {/* 2 — Video / foto: ogni slide a tutta larghezza × altezza sezione */}
      {loop.length > 0 ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.5] [mask-image:linear-gradient(to_bottom,white_2%,white_92%,transparent_100%)]"
          aria-hidden
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="fc-esperienza-marquee-track flex h-full items-stretch [filter:blur(6px)] [transform:translateZ(0)]"
              style={{
                animationDuration: `${durationSec}s`,
              }}
            >
              {loop.map((src, i) => (
                <div
                  key={`bg-${src}-${i}`}
                  className="relative h-full min-h-full w-screen shrink-0"
                >
                  {marquee.kind === "video" ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      src={src}
                      width={1920}
                      height={1080}
                    />
                  ) : (
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={false}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* 3 — Patina #244C90 sopra i video */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#244C90]/20 via-[#244C90]/28 to-[#244C90]/35"
        aria-hidden
      />

      {/* 4 — Testi */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24 pt-24 md:px-8 md:pb-32 md:pt-32 lg:px-12">
        <p
          className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Esperienza
        </p>
        <h2
          className="mt-4 max-w-2xl text-pretty text-3xl font-black leading-[1.08] tracking-tight text-fc-dark md:text-4xl lg:text-[2.35rem]"
          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
        >
          Non è il solito campus.
        </h2>
        <p
          className="mt-5 max-w-xl text-sm font-extralight leading-relaxed text-fc-secondary md:text-[15px]"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Laboratori, territorio, orientamento. Un percorso che si vive.
        </p>
        <ul className="mt-10 max-w-xl space-y-3 border-t border-fc-soft/55 pt-8 text-[13px] font-light tracking-wide text-fc-dark md:text-sm">
          <li className="flex items-baseline gap-3">
            <span className="text-fc-accent" aria-hidden>
              —
            </span>
            Esperienze reali
          </li>
          <li className="flex items-baseline gap-3">
            <span className="text-fc-accent" aria-hidden>
              —
            </span>
            Connessioni utili
          </li>
          <li className="flex items-baseline gap-3">
            <span className="text-fc-accent" aria-hidden>
              —
            </span>
            Sguardo sul futuro
          </li>
        </ul>
      </div>
    </section>
  );
});
