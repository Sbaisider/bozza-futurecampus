import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/site/PageShell";
import { articoli, getArticoloBySlug } from "@/content/articoli";

type PageProps = { params: Promise<{ slug: string }> };

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateStaticParams() {
  return articoli.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticoloBySlug(slug);
  if (!a) return { title: "Articolo non trovato" };
  return { title: a.titolo, description: a.sommario };
}

export default async function BlogArticoloPage({ params }: PageProps) {
  const { slug } = await params;
  const a = getArticoloBySlug(slug);
  if (!a) notFound();

  const altri = articoli.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        {/* Hero articolo */}
        <header className="relative min-h-[50vh] overflow-hidden text-white md:min-h-[60vh]">
          <Image
            src={a.copertina}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-fc-primary/88 via-fc-primary/55 to-[#0a1628]/92" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
          <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-end px-5 pb-12 pt-28 md:min-h-[60vh] md:px-8 md:pb-16">
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              {a.categoria} · {dateFormatter.format(new Date(a.data))}
            </p>
            <h1
              className="mt-4 text-pretty text-3xl font-black leading-[1.1] tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              {a.titolo}
            </h1>
            <p
              className="mt-5 max-w-2xl text-[15px] font-extralight leading-relaxed text-white/90 md:text-[16px]"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              {a.sommario}
            </p>
          </div>
        </header>

        {/* Corpo */}
        <div className="bg-fc-light">
          <div
            className="mx-auto max-w-3xl space-y-5 px-5 py-16 text-[16px] font-extralight leading-relaxed text-fc-dark md:px-8 md:py-20"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            {a.paragrafi.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      {/* Altri articoli */}
      {altri.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Continua a leggere
            </p>
            <ul className="mt-8 grid gap-7 md:grid-cols-3">
              {altri.map((x) => (
                <li key={x.slug}>
                  <Link
                    href={`/blog/${x.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-fc-soft/60 bg-fc-light transition hover:border-fc-primary/25 focus:outline-none focus:ring-2 focus:ring-fc-primary/30"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-fc-soft/40">
                      <Image
                        src={x.copertina}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-5">
                      <p
                        className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                      >
                        {dateFormatter.format(new Date(x.data))}
                      </p>
                      <h3
                        className="mt-2 text-[15px] font-black leading-snug tracking-tight text-fc-dark"
                        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                      >
                        {x.titolo}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
