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

type IntroManifestoSectionProps = {
  /** Prima immagine da `/foto` (opzionale): area visual premium a destra. */
  visualSrc?: string;
};

function ManifestoVisual({ src }: { src?: string }) {
  return (
    <div className="relative min-h-[min(52vh,420px)] w-full overflow-hidden rounded-sm border border-fc-soft/70 bg-fc-white lg:min-h-[min(72vh,640px)]">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
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

/**
 * Sezione manifesto dopo la hero: ritmo più chiaro, layout arioso, pillar + visual.
 */
export function IntroManifestoSection({ visualSrc }: IntroManifestoSectionProps) {
  return (
    <section
      id="intro"
      className="scroll-mt-20 border-t border-fc-soft/60 bg-fc-light text-fc-dark md:scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24 lg:max-w-7xl lg:px-14 lg:py-28 xl:py-32">
        <header className="max-w-3xl">
          <p
            className="text-[10px] font-extralight uppercase tracking-[0.38em] text-fc-accent sm:text-[11px]"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            {MICRO_LABEL.toUpperCase()}
          </p>
          <h2
            className="mt-6 text-balance text-3xl font-black leading-[1.12] tracking-tight text-fc-dark sm:text-4xl md:mt-8 md:text-[2.35rem] md:leading-[1.1] lg:text-[2.65rem] lg:leading-[1.08]"
            style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
          >
            {TITLE}
          </h2>
          <p
            className="mt-8 max-w-2xl text-base font-extralight leading-relaxed text-fc-secondary md:mt-10 md:text-lg md:leading-relaxed"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            {LEAD}
          </p>
        </header>

        <div className="mt-16 border-t border-fc-soft/50 pt-16 md:mt-20 md:pt-20 lg:mt-24 lg:pt-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
            <div className="flex flex-col gap-12 lg:gap-14">
              {PILLARS.map((pillar, i) => (
                <article
                  key={pillar.title}
                  className={
                    i > 0
                      ? "border-t border-fc-soft/60 pt-12 lg:pt-14"
                      : undefined
                  }
                >
                  <h3
                    className="text-lg font-black tracking-tight text-fc-dark md:text-xl"
                    style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="mt-3 max-w-md text-[15px] font-extralight leading-relaxed text-fc-secondary md:text-base"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>

            <div>
              <ManifestoVisual src={visualSrc} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
