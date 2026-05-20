import type { Metadata } from "next";

import { CtaButton } from "@/components/site/CtaButton";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { categorieSponsor, getSponsorByCategoria } from "@/content/sponsor";

export const metadata: Metadata = {
  title: "Sponsor e partner",
  description:
    "Le istituzioni e le realtà che sostengono Future Campus Fabriano: Confindustria Ancona, Fondazione Aristide Merloni, Camera di Commercio delle Marche, Regione Marche, BPER Banca, Caritas Diocesi di Fabriano-Matelica.",
};

const CATEGORY_ORDER: Array<keyof typeof categorieSponsor> = [
  "promotore",
  "istituzionale",
  "territoriale",
  "sostenitore",
];

export default function SponsorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sponsor e partner"
        title={
          <>
            Le realtà che rendono <span className="text-fc-accent">possibile</span> il Campus
          </>
        }
        lead="Future Campus esiste perché istituzioni, imprese e realtà del territorio hanno scelto di sostenerlo. A loro va il riconoscimento più grande."
        imageSrc="/foto/2820.JPG"
        imageAlt="Partner del Future Campus durante una giornata di formazione"
      />

      <section className="bg-fc-light">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <SectionEyebrow
            label="Riconoscimento"
            title="Un progetto sostenuto da una rete che cresce ogni anno"
            lead="Dalla prima edizione del 2022 alle 150 partecipazioni del 2025, ogni passo del Campus è stato accompagnato dal contributo concreto dei nostri partner — economico, istituzionale, di rete."
          />

          <div className="mt-14 space-y-14">
            {CATEGORY_ORDER.map((cat) => {
              const items = getSponsorByCategoria(cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <p
                    className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-secondary"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {categorieSponsor[cat]}
                  </p>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((s) => (
                      <li
                        key={s.nome}
                        className="rounded-2xl border border-fc-soft/60 bg-white p-6 transition hover:border-fc-primary/30 hover:shadow-sm"
                      >
                        <h3
                          className="text-[15px] font-black leading-snug tracking-tight text-fc-primary"
                          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                        >
                          {s.nome}
                        </h3>
                        {s.descrizione && (
                          <p
                            className="mt-3 text-[13px] font-extralight leading-relaxed text-fc-secondary"
                            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                          >
                            {s.descrizione}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-fc-primary text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-7 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Diventa partner
            </p>
            <h2
              className="mt-4 max-w-[28ch] text-2xl font-black leading-tight tracking-tight md:text-3xl"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              Sostieni il futuro dei ragazzi del territorio di Fabriano.
            </h2>
          </div>
          <CtaButton href="/contatti" variant="outline-light">
            Scrivici
          </CtaButton>
        </div>
      </section>
    </PageShell>
  );
}
