import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { getEdizioniOrdinate } from "@/content/edizioni";

export const metadata: Metadata = {
  title: "Edizioni",
  description:
    "L'archivio delle edizioni del Future Campus Fabriano: dalla prima del 2022 alla quinta del 2026.",
};

export default function EdizioniIndexPage() {
  const edizioni = getEdizioniOrdinate("desc");

  return (
    <PageShell>
      <PageHero
        eyebrow="Edizioni"
        title="L'archivio delle annualità"
        lead="Dal 2022 a oggi, ogni edizione del Future Campus ha aggiunto un capitolo nuovo: una classe in più, ragazzi in più, una rete più larga. Qui le ritrovi tutte."
        imageSrc="/foto/8505.JPG"
        imageAlt=""
      />

      <section className="bg-fc-light">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <ul className="grid gap-7 md:grid-cols-2 lg:gap-8">
            {edizioni.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/edizioni/${e.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-fc-primary/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-fc-soft/40">
                    <Image
                      src={e.copertina}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {e.isCorrente && (
                      <span
                        className="absolute right-4 top-4 rounded-full bg-fc-accent px-3 py-1 text-[10px] font-black tracking-[0.18em] text-white uppercase"
                        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                      >
                        Edizione corrente
                      </span>
                    )}
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p
                        className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                      >
                        {e.numeroEdizione} · {e.anno}
                      </p>
                      <h2
                        className="mt-2 text-[22px] font-black leading-tight tracking-tight md:text-[24px]"
                        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                      >
                        {e.titolo}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6 md:p-7">
                    <p
                      className="text-[14px] font-extralight leading-relaxed text-fc-secondary"
                      style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                    >
                      {e.sintesi}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <ul className="flex flex-wrap gap-2">
                        {e.classi.map((c) => (
                          <li key={c}>
                            <span
                              className="inline-flex rounded-full bg-fc-soft/35 px-2.5 py-1 text-[11px] font-extralight tracking-wide text-fc-secondary"
                              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                            >
                              {c}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <span
                        className="text-[12px] font-extralight tracking-[0.16em] text-fc-primary uppercase transition-colors group-hover:text-fc-accent"
                        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                      >
                        Scopri →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
