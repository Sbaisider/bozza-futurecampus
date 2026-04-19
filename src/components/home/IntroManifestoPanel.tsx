"use client";

import { forwardRef } from "react";

import Image from "next/image";

const MICRO_LABEL = "Future Campus Fabriano";

const TITLE =
  "Un luogo dove idee, orientamento e opportunità prendono forma";

const LEAD =
  "Future Campus Fabriano è uno spazio in cui studenti, esperienze, territorio e futuro si incontrano attraverso attività concrete, relazioni e percorsi di crescita.";

const PILLARS = [
  {
    title: "Esperienze reali",
    body: "Laboratori, incontri, attività e momenti capaci di trasformare la partecipazione in esperienza concreta.",
  },
  {
    title: "Connessioni utili",
    body: "Un punto di incontro tra persone, competenze, scuole, imprese e nuove possibilità.",
  },
  {
    title: "Sguardo sul futuro",
    body: "Un ambiente che aiuta a immaginare, esplorare e costruire nuove direzioni.",
  },
] as const;

function ManifestoVisual({ src }: { src?: string }) {
  return (
    <div className="relative min-h-[180px] w-full overflow-hidden rounded-sm border border-fc-soft/70 bg-fc-white sm:min-h-[220px] lg:min-h-[min(32vh,360px)]">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-fc-soft/35 via-fc-light to-fc-primary/[0.06]"
          aria-hidden
        />
      )}
    </div>
  );
}

type IntroManifestoPanelProps = {
  visualSrc?: string;
};

/**
 * Second screen dentro la hero: wrapper absolute (non fixed), card animata con GSAP.
 */
export const IntroManifestoPanel = forwardRef<
  HTMLDivElement,
  IntroManifestoPanelProps
>(function IntroManifestoPanel({ visualSrc }, ref) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-end pb-0 pt-12 md:pt-16">
      <div
        ref={ref}
        id="intro"
        className="pointer-events-auto flex max-h-[min(58vh,640px)] w-full min-w-0 flex-col overflow-hidden rounded-t-lg border-x-0 border-t border-fc-soft/60 border-b-0 bg-fc-light/98 px-5 py-7 shadow-[0_-12px_48px_rgba(7,8,8,0.08)] backdrop-blur-sm md:px-10 md:py-9 lg:px-12"
      >
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <header className="max-w-3xl">
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.38em] text-fc-accent sm:text-[11px]"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              {MICRO_LABEL.toUpperCase()}
            </p>
            <h2
              className="mt-4 text-balance text-2xl font-black leading-[1.12] tracking-tight text-fc-dark sm:mt-5 sm:text-3xl md:text-[1.85rem] lg:text-[2.1rem]"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              {TITLE}
            </h2>
            <p
              className="mt-5 max-w-2xl text-sm font-extralight leading-relaxed text-fc-secondary md:text-base"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              {LEAD}
            </p>
          </header>

          <div className="mt-8 border-t border-fc-soft/50 pt-8 md:mt-10 md:pt-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-8 lg:gap-10">
                {PILLARS.map((pillar, i) => (
                  <article
                    key={pillar.title}
                    className={
                      i > 0 ? "border-t border-fc-soft/60 pt-8 lg:pt-10" : undefined
                    }
                  >
                    <h3
                      className="text-base font-black tracking-tight text-fc-dark md:text-lg"
                      style={{
                        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="mt-2 max-w-md text-[14px] font-extralight leading-relaxed text-fc-secondary md:text-[15px]"
                      style={{
                        fontFamily: "var(--font-manrope), system-ui, sans-serif",
                      }}
                    >
                      {pillar.body}
                    </p>
                  </article>
                ))}
              </div>
              <div className="min-h-0">
                <ManifestoVisual src={visualSrc} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
