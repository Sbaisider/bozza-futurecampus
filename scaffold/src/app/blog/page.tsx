import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { urlFor } from "@/sanity/lib/image";
import { fetchArticoli } from "@/sanity/lib/fetch";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Aggiornamenti, storie e contenuti del Future Campus Fabriano durante tutto l'anno.",
};

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogIndexPage() {
  const articoli = await fetchArticoli();
  const [hero, ...rest] = articoli;

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Il Campus tra una stagione e l'altra"
        lead="Aggiornamenti, storie dei ragazzi, riflessioni sul territorio. Tutto quello che succede attorno al Campus, fuori dall'estate."
        imageSrc="/foto/2438.JPG"
        imageAlt=""
        compact
      />

      <section className="bg-fc-light">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          {!hero ? (
            <p
              className="text-center text-[15px] font-extralight text-fc-secondary"
              style={FONT_BODY}
            >
              Nessun articolo pubblicato ancora. Torna a trovarci a breve.
            </p>
          ) : null}

          {/* Articolo in evidenza */}
          {hero ? (
            <Link
              href={`/blog/${hero.slug}`}
              className="group mb-16 grid gap-8 md:mb-24 md:grid-cols-[1.15fr_1fr] md:gap-12 lg:gap-16"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-fc-dark md:aspect-[5/4]">
                <Image
                  src={urlFor(hero.copertina).width(1400).fit("crop").url()}
                  alt={hero.copertina.alt ?? ""}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  quality={72}
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <p
                  className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                  style={FONT_BODY}
                >
                  {hero.categoria} · {dateFormatter.format(new Date(hero.data))}
                </p>
                <h2
                  className="mt-5 text-balance text-[1.85rem] font-black leading-[1.1] tracking-tight text-fc-dark md:text-[2.25rem] lg:text-[2.5rem]"
                  style={FONT_DISPLAY}
                >
                  {hero.titolo}
                </h2>
                <p
                  className="mt-6 text-[15px] font-extralight leading-[1.7] text-fc-secondary md:text-[16px]"
                  style={FONT_BODY}
                >
                  {hero.sommario}
                </p>
                <span
                  className="mt-8 text-[11px] font-extralight uppercase tracking-[0.28em] text-fc-primary transition-colors group-hover:text-fc-accent"
                  style={FONT_BODY}
                >
                  Leggi l&apos;articolo →
                </span>
              </div>
            </Link>
          ) : null}

          {/* Altri articoli */}
          {rest.length > 0 ? (
            <ul className="grid gap-x-8 gap-y-14 border-t border-fc-soft/50 pt-14 md:grid-cols-2 md:gap-x-10 md:pt-20 lg:gap-x-14">
              {rest.map((a) => (
                <li key={a._id}>
                  <Link href={`/blog/${a.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-fc-dark">
                      <Image
                        src={urlFor(a.copertina).width(900).fit("crop").url()}
                        alt={a.copertina.alt ?? ""}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        quality={72}
                        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="mt-6">
                      <p
                        className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                        style={FONT_BODY}
                      >
                        {a.categoria} · {dateFormatter.format(new Date(a.data))}
                      </p>
                      <h3
                        className="mt-3 text-[20px] font-black leading-snug tracking-tight text-fc-dark md:text-[22px]"
                        style={FONT_DISPLAY}
                      >
                        {a.titolo}
                      </h3>
                      <p
                        className="mt-3 text-[14px] font-extralight leading-[1.65] text-fc-secondary"
                        style={FONT_BODY}
                      >
                        {a.sommario}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
