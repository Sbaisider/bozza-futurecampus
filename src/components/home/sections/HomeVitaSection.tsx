"use client";

import Image from "next/image";

import type { HomeMediaPicks } from "@/lib/home-media-picks";

const LABELS = [
  "Laboratori",
  "Orientamento",
  "Aziende",
  "Soft skills",
  "Tecnologia",
  "Team",
] as const;

type Props = { media: HomeMediaPicks };

export function HomeVitaSection({ media }: Props) {
  const shots = media.vitaGallery;
  const tiles = LABELS.map((label, i) => ({
    label,
    src: shots[i] ?? shots[shots.length - 1] ?? null,
  }));

  return (
    <section
      id="vita"
      className="relative z-10 scroll-mt-24 border-t border-fc-soft/40 bg-fc-light"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Come si vive
            </p>
            <h2
              className="mt-3 max-w-lg text-pretty text-2xl font-black tracking-tight text-fc-dark md:text-3xl"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              Attività concrete, zero slogan.
            </h2>
          </div>
          <p
            className="max-w-sm text-sm font-extralight text-fc-secondary"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Un collage di momenti: il progetto si racconta con gli occhi.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {tiles.map((t, i) => (
            <figure
              key={`${t.label}-${i}`}
              className={`group relative overflow-hidden rounded-md bg-fc-soft/20 ${
                i === 0 || i === 5 ? "aspect-[3/4] sm:aspect-[4/5]" : "aspect-square sm:aspect-[5/4]"
              }`}
            >
              {t.src ? (
                <Image
                  src={t.src}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-fc-soft/40 to-fc-primary/10"
                  aria-hidden
                />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fc-dark/75 to-transparent px-3 pb-3 pt-10">
                <span
                  className="text-[11px] font-light uppercase tracking-[0.2em] text-white/95"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  {t.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
