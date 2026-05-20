"use client";

import Image from "next/image";

import type { HomeMediaPicks } from "@/lib/home-media-picks";

const MILESTONES = [
  { year: "2022", line: "Avvio del percorso" },
  { year: "2023", line: "100+ partecipanti" },
  { year: "2024", line: "150+ ragazzi" },
  { year: "2025", line: "200+ ragazzi" },
] as const;

type Props = { media: HomeMediaPicks };

export function HomeCrescitaSection({ media }: Props) {
  const bg = media.crescitaBackdrop;

  return (
    <section
      id="crescita"
      className="relative z-10 scroll-mt-24 border-t border-fc-soft/40 bg-fc-white"
    >
      {bg ? (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.14]"
          aria-hidden
        >
          <div className="fc-crescita-bg-zoom absolute inset-0 h-full w-full origin-center">
            <Image
              src={bg}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              quality={55}
              priority={false}
            />
          </div>
        </div>
      ) : null}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <p
          className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Percorso
        </p>
        <h2
          className="mt-3 max-w-xl text-pretty text-2xl font-black tracking-tight text-fc-dark md:text-3xl"
          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
        >
          Un progetto che cresce nel tempo.
        </h2>

        <div className="mt-14 grid gap-0 md:grid-cols-4 md:divide-x md:divide-fc-soft/50">
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="border-b border-fc-soft/40 py-8 md:border-b-0 md:px-6 md:py-4 md:first:pl-0"
            >
              <p
                className="text-4xl font-black tabular-nums tracking-tight text-fc-primary md:text-5xl"
                style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
              >
                {m.year}
              </p>
              <p
                className="mt-3 text-sm font-extralight text-fc-secondary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                {m.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
