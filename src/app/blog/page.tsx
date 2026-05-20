import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { getArticoliOrdinati } from "@/content/articoli";

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

export default function BlogIndexPage() {
  const articoli = getArticoliOrdinati();
  const [hero, ...rest] = articoli;

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Il Campus tra una stagione e l'altra"
        lead="Aggiornamenti, storie dei ragazzi, riflessioni sul territorio, novità sulle iscrizioni. Tutto quello che succede attorno al Campus, fuori dall'estate."
        imageSrc="/foto/2438.JPG"
        imageAlt=""
        compact
      />

      <section className="bg-fc-light">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          {hero && (
            <Link
              href={`/blog/${hero.slug}`}
              className="group mb-12 block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-fc-primary/30 md:mb-16"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-fc-soft/40 md:aspect-auto">
                  <Image
                    src={hero.copertina}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p
                    className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {hero.categoria} · {dateFormatter.format(new Date(hero.data))}
                  </p>
                  <h2
                    className="mt-3 text-[24px] font-black leading-tight tracking-tight text-fc-dark md:text-[28px]"
                    style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                  >
                    {hero.titolo}
                  </h2>
                  <p
                    className="mt-4 text-[14px] font-extralight leading-relaxed text-fc-secondary md:text-[15px]"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {hero.sommario}
                  </p>
                  <span
                    className="mt-5 text-[12px] font-extralight tracking-[0.18em] text-fc-primary uppercase transition-colors group-hover:text-fc-accent"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    Leggi l'articolo →
                  </span>
                </div>
              </div>
            </Link>
          )}

          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-fc-primary/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-fc-soft/40">
                    <Image
                      src={a.copertina}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p
                      className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                      style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                    >
                      {a.categoria} · {dateFormatter.format(new Date(a.data))}
                    </p>
                    <h3
                      className="mt-3 text-[18px] font-black leading-snug tracking-tight text-fc-dark"
                      style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                    >
                      {a.titolo}
                    </h3>
                    <p
                      className="mt-3 text-[13.5px] font-extralight leading-relaxed text-fc-secondary"
                      style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                    >
                      {a.sommario}
                    </p>
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
