"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";

import Image from "next/image";

import type { HomeMediaPicks } from "@/lib/home-media-picks";

/** Clip in rotazione; ogni slide = tutta larghezza schermo × altezza sezione. */
const MAX_BG_CLIPS = 3;

/**
 * Autoplay nel browser spesso richiede play() dopo mount + muted/playsInline.
 * File rinominati .mp4 senza ricodifica restano non decodificabili → onError in dev.
 */
function EsperienzaMarqueeVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    const tryPlay = () => {
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, [src]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      muted
      loop
      playsInline
      preload="auto"
      src={src}
      width={1920}
      height={1080}
      onError={
        process.env.NODE_ENV === "development"
          ? () => {
              console.error(
                "[Esperienza] Video non caricato o formato non supportato dal browser:",
                src,
              );
            }
          : undefined
      }
    />
  );
}

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

const DETAIL_POINTS = [
  "Esperienze reali",
  "Connessioni utili",
  "Sguardo sul futuro",
  "Orientamento e soft skill",
  "Rete scuole, imprese e territorio",
] as const;

/**
 * Stack: sfondo video/patina → contenuti estesi + immagine spotlight nitida.
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

  const hasMedia = loop.length > 0;
  const spotlight = media.esperienzaSpotlightPhoto;
  const secondaryRow = media.esperienzaPhotoRow.filter(
    (x): x is string => Boolean(x),
  );

  return (
    <section
      ref={ref}
      id="esperienza"
      aria-labelledby="esperienza-heading"
      className="relative z-10 -mt-[100svh] overflow-hidden rounded-t-3xl border-t border-fc-soft/40 bg-fc-white shadow-[0_-16px_48px_rgba(36,76,144,0.07)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-fc-white" aria-hidden />

      {hasMedia ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden opacity-[0.52] [mask-image:linear-gradient(to_bottom,white_0%,white_90%,rgba(255,255,255,0.85)_100%)]"
          aria-hidden
        >
          <div className="absolute inset-0 min-h-[720px] overflow-hidden lg:min-h-[820px]">
            <div
              className="fc-esperienza-marquee-track flex h-full min-h-[inherit] items-stretch [filter:blur(6px)] [transform:translateZ(0)]"
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
                    <EsperienzaMarqueeVideo src={src} />
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

      {hasMedia ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] min-h-full bg-gradient-to-b from-[#244C90]/18 via-[#244C90]/26 to-[#244C90]/34"
          aria-hidden
        />
      ) : null}

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="rounded-2xl border border-white/90 bg-white/88 p-7 shadow-[0_12px_48px_rgba(36,76,144,0.09)] backdrop-blur-md ring-1 ring-[#244C90]/[0.07] sm:p-8 md:p-10">
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-8 shrink-0 bg-[#244C90]/45"
                  aria-hidden
                />
                <p
                  className="text-[10px] font-extralight uppercase tracking-[0.45em] text-[#244C90]"
                  style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  }}
                >
                  Esperienza
                </p>
              </div>

              <h2
                id="esperienza-heading"
                className="mt-5 text-pretty text-[1.65rem] font-black leading-[1.12] tracking-tight text-fc-dark sm:text-3xl md:text-[2rem] lg:text-[2.35rem]"
                style={{
                  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                }}
              >
                Non è il solito campus.
              </h2>

              <p
                className="mt-5 text-[15px] font-extralight leading-[1.65] text-fc-secondary md:text-base"
                style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                }}
              >
                Laboratori, territorio, orientamento. Un percorso che si vive
                tra incontri, workshop e momenti sul campo: un ponte tra scuola,
                mondo del lavoro e comunità.
              </p>

              <p
                className="mt-4 text-[15px] font-extralight leading-[1.65] text-fc-secondary md:text-base"
                style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                }}
              >
                Future Campus Fabriano è un progetto educativo e territoriale:
                ogni edizione costruisce competenze trasversali e relazioni che
                restano, con un format maturo cresciuto nel tempo insieme a
                partner istituzionali e imprese.
              </p>

              <ul
                className="mt-9 space-y-3.5 border-t border-fc-soft/50 pt-9"
                role="list"
              >
                {DETAIL_POINTS.map((label) => (
                  <li key={label} className="flex gap-3.5">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#244C90]"
                      aria-hidden
                    />
                    <span
                      className="text-[14px] font-extralight leading-snug tracking-wide text-fc-dark md:text-[15px]"
                      style={{
                        fontFamily: "var(--font-manrope), system-ui, sans-serif",
                      }}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              {spotlight ? (
                <figure
                  className="relative mt-8 overflow-hidden rounded-xl border border-fc-soft/40 md:hidden"
                  aria-hidden
                >
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src={spotlight}
                      alt=""
                      fill
                      className="scale-[1.06] object-cover object-center blur-[2.5px] brightness-[0.97]"
                      sizes="100vw"
                      priority={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/88 via-white/35 to-white/15" />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#244C90]/10" />
                  </div>
                </figure>
              ) : null}
            </div>
          </div>

          <div className="hidden flex-col gap-3 sm:gap-4 md:flex lg:col-span-6 xl:col-span-7">
            {spotlight ? (
              <>
                <figure className="relative overflow-hidden rounded-2xl bg-fc-soft/25 shadow-[0_16px_44px_rgba(36,76,144,0.1)] ring-1 ring-[#244C90]/[0.12]">
                  <div className="relative h-[168px] w-full overflow-hidden sm:h-[188px] md:h-[204px]">
                    <Image
                      src={spotlight}
                      alt="Momento di gruppo al Future Campus Fabriano"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                  <figcaption className="sr-only">
                    Fotografia principale del progetto Future Campus Fabriano
                  </figcaption>
                </figure>

                {secondaryRow.length > 0 && (
                  <div
                    className={`grid gap-3 sm:gap-4 ${
                      secondaryRow.length >= 2 ? "grid-cols-2" : "grid-cols-1 sm:max-w-[50%]"
                    }`}
                  >
                    {secondaryRow.map((src) => (
                      <figure
                        key={src}
                        className="relative overflow-hidden rounded-xl bg-fc-soft/20 ring-1 ring-[#244C90]/10"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 45vw, 25vw"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-fc-soft/70 bg-fc-light/80 p-8 text-center text-sm font-extralight text-fc-secondary"
                style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                }}
              >
                Aggiungi foto in{" "}
                <code className="mx-1 rounded bg-fc-soft/40 px-1.5 py-0.5 text-[13px] text-fc-dark">
                  public/foto
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
