import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { faqGruppi } from "@/content/faq";

export const metadata: Metadata = {
  title: "Domande frequenti",
  description:
    "Tutte le risposte sul Future Campus Fabriano: chi può partecipare, quando si svolge, come iscriversi, come funzionano le classi Beginner, Master e Advanced.",
};

export default function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="FAQ"
        title="Domande frequenti"
        lead="Le risposte alle domande più ricorrenti su iscrizioni, partecipazione, percorso e organizzazione del Campus."
        imageSrc="/foto/2007.JPG"
        imageAlt=""
        compact
      />

      <section className="bg-fc-light">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          {faqGruppi.map((g) => (
            <div key={g.titolo} className="mb-14 last:mb-0">
              <h2
                className="text-[20px] font-black tracking-tight text-fc-primary md:text-[22px]"
                style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
              >
                {g.titolo}
              </h2>
              <div className="mt-5 divide-y divide-fc-soft/60 rounded-2xl border border-fc-soft/60 bg-white">
                {g.voci.map((v) => (
                  <details
                    key={v.domanda}
                    className="group px-5 py-4 md:px-7 md:py-5"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-fc-dark">
                      <span
                        className="text-[15px] font-black leading-snug tracking-tight md:text-[16px]"
                        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                      >
                        {v.domanda}
                      </span>
                      <span
                        className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fc-soft/70 text-fc-primary transition group-open:rotate-45 group-open:border-fc-primary/40"
                        aria-hidden
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p
                      className="mt-4 text-[14px] font-extralight leading-relaxed text-fc-secondary"
                      style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                    >
                      {v.risposta}
                    </p>
                    {v.linkTo && (
                      <Link
                        href={v.linkTo.href}
                        className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-extralight tracking-[0.16em] text-fc-primary uppercase transition-colors hover:text-fc-accent"
                        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                      >
                        {v.linkTo.label}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
