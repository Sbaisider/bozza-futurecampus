import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticoloBody } from "@/components/blog/ArticoloBody";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { fetchArticolo, fetchArticoli, fetchArticoliSlugs } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

type PageProps = { params: Promise<{ slug: string }> };

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateStaticParams() {
  const slugs = await fetchArticoliSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const a = await fetchArticolo(slug);
  if (!a) return { title: "Articolo non trovato" };
  return { title: a.titolo, description: a.sommario };
}

export default async function BlogArticoloPage({ params }: PageProps) {
  const { slug } = await params;
  const a = await fetchArticolo(slug);
  if (!a) notFound();

  const tutti = await fetchArticoli();
  const altri = tutti.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        {/* Hero con foto di copertina come sfondo (blur + leggero zoom) e patina blu */}
        <header className="relative isolate overflow-hidden bg-fc-primary text-fc-white">
          {/* Sfondo foto blurato con leggero zoom in loop */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
            <div className="fc-crescita-bg-zoom absolute inset-0 h-full w-full">
              <Image
                src={urlFor(a.copertina).width(2200).fit("crop").url()}
                alt={a.copertina.alt ?? ""}
                fill
                priority
                sizes="100vw"
                quality={70}
                className="object-cover"
                style={{ filter: "blur(24px)", transform: "scale(1.15)" }}
              />
            </div>
          </div>

          {/* Patina blu in overlay (leggera) per leggibilità testo bianco */}
          <div
            className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-fc-primary/55 via-fc-primary/45 to-fc-primary/65"
            aria-hidden
          />
          {/* Velo scuro sottile per far stagliare meglio il testo */}
          <div
            className="pointer-events-none absolute inset-0 -z-[4] bg-gradient-to-t from-black/25 via-transparent to-black/10"
            aria-hidden
          />

          <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-16 sm:pt-28 sm:pb-20 md:px-8 md:pt-36 md:pb-28">
            <Reveal as="div">
              <Link
                href="/blog"
                className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-white/80 transition-colors hover:text-fc-accent"
                style={FONT_BODY}
              >
                ← Tutti gli articoli
              </Link>
            </Reveal>
            <Reveal as="div" delay={140} className="mt-8 md:mt-10">
              <span
                className="inline-flex items-center rounded-full bg-white/95 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-fc-primary shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] ring-1 ring-white/60 backdrop-blur-sm sm:tracking-[0.42em]"
                style={FONT_BODY}
              >
                {a.categoria} · {dateFormatter.format(new Date(a.data))}
              </span>
            </Reveal>
            <RevealWords
              as="h1"
              text={a.titolo}
              delay={280}
              className="mt-5 block text-balance text-[1.75rem] font-black leading-[1.1] tracking-tight text-fc-white sm:text-[2.25rem] md:text-[3rem]"
              style={FONT_DISPLAY}
            />
            <Reveal
              as="p"
              delay={650}
              className="mt-5 max-w-2xl text-[15px] font-extralight leading-[1.7] text-fc-white/85 sm:text-[16px] md:text-[18px]"
              style={FONT_BODY}
            >
              {a.sommario}
            </Reveal>
            {a.autore ? (
              <Reveal
                as="p"
                delay={820}
                className="mt-6 text-[11px] font-extralight tracking-[0.24em] text-fc-white/70 uppercase"
                style={FONT_BODY}
              >
                di {a.autore}
              </Reveal>
            ) : null}
          </div>
        </header>

        {/* Corpo articolo (Portable Text) */}
        <div className="bg-fc-white">
          <div className="mx-auto max-w-2xl px-5 py-14 sm:py-20 md:px-8 md:py-28">
            <ArticoloBody value={a.corpo} />
          </div>
        </div>
      </article>

      {/* Altri articoli */}
      {altri.length > 0 ? (
        <section className="bg-fc-light">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
            <Reveal
              as="h2"
              className="text-balance text-[1.4rem] font-black leading-tight tracking-tight text-fc-dark sm:text-[1.5rem] md:text-[1.85rem]"
              style={FONT_DISPLAY}
            >
              Continua a leggere
            </Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-10 sm:mt-12 sm:gap-y-12 md:grid-cols-3">
              {altri.map((x, idx) => (
                <Reveal as="li" key={x._id} delay={180 + idx * 120}>
                  <Link href={`/blog/${x.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-fc-dark">
                      <Image
                        src={urlFor(x.copertina).width(800).fit("crop").url()}
                        alt={x.copertina.alt ?? ""}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        quality={70}
                        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <p
                      className="mt-5 text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                      style={FONT_BODY}
                    >
                      {dateFormatter.format(new Date(x.data))}
                    </p>
                    <h3
                      className="mt-2 text-[17px] font-black leading-snug tracking-tight text-fc-dark"
                      style={FONT_DISPLAY}
                    >
                      {x.titolo}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
