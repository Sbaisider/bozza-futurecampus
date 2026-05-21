import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaButton } from "@/components/site/CtaButton";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { edizioni, getEdizioneBySlug } from "@/content/edizioni";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return edizioni.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ed = getEdizioneBySlug(slug);
  if (!ed) return { title: "Edizione non trovata" };
  return {
    title: `Edizione ${ed.anno} — ${ed.numeroEdizione}`,
    description: ed.sintesi,
  };
}

export default async function EdizioneDettaglioPage({ params }: PageProps) {
  const { slug } = await params;
  const ed = getEdizioneBySlug(slug);
  if (!ed) notFound();

  const allEdizioni = edizioni.slice().sort((a, b) => a.anno - b.anno);
  const idx = allEdizioni.findIndex((e) => e.slug === ed.slug);
  const prev = idx > 0 ? allEdizioni[idx - 1] : null;
  const next = idx < allEdizioni.length - 1 ? allEdizioni[idx + 1] : null;

  return (
    <PageShell>
      <PageHero
        eyebrow={`${ed.numeroEdizione} · ${ed.anno}`}
        title={ed.titolo}
        lead={ed.sintesi}
        imageSrc={ed.copertina}
        imageAlt=""
      >
        <div className="flex flex-wrap items-center gap-3">
          {ed.classi.map((c) => (
            <span
              key={c}
              className="inline-flex rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-extralight tracking-[0.18em] text-white uppercase backdrop-blur-sm"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              {c}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Numeri chiave */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:grid-cols-3 md:px-8 md:py-14">
          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Periodo
            </p>
            <p
              className="mt-2 text-[16px] font-black text-fc-dark"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              {ed.periodo}
            </p>
          </div>
          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Partecipanti
            </p>
            <p
              className="mt-2 text-[16px] font-black text-fc-dark"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              {ed.partecipanti}
            </p>
          </div>
          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Tema
            </p>
            <p
              className="mt-2 text-[16px] font-black text-fc-dark"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              {ed.tema}
            </p>
          </div>
        </div>
      </section>

      {/* Racconto */}
      <section className="bg-fc-light">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
          <SectionEyebrow label="Racconto" title="Cosa è stata questa edizione" />
          <div
            className="mt-8 space-y-5 text-[15px] font-extralight leading-relaxed text-fc-dark md:text-[16px]"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            {ed.paragrafiRacconto.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Momenti chiave */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <SectionEyebrow label="Momenti chiave" title="I passaggi che hanno fatto questa edizione" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {ed.momentiChiave.map((m) => (
              <li
                key={m.titolo}
                className="rounded-2xl border border-fc-soft/60 bg-fc-light p-6 transition hover:border-fc-primary/30"
              >
                <h3
                  className="text-[16px] font-black leading-snug tracking-tight text-fc-dark"
                  style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                >
                  {m.titolo}
                </h3>
                <p
                  className="mt-3 text-[14px] font-extralight leading-relaxed text-fc-secondary"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  {m.descrizione}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      {ed.gallery.length > 0 && (
        <section className="bg-fc-light">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <SectionEyebrow label="Gallery" title="Il Campus in immagini" />
            <ul className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
              {ed.gallery.map((src) => (
                <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-fc-soft/30">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Partner */}
      {ed.partner.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <SectionEyebrow label="Partner di questa edizione" title="Chi ha reso possibile il Campus" />
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {ed.partner.map((p) => (
                <li key={p.nome}>
                  <span
                    className="inline-flex rounded-full border border-fc-soft/70 bg-fc-light px-4 py-2 text-[12px] font-extralight tracking-wide text-fc-secondary"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {p.nome}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Navigazione fra edizioni */}
      <section className="bg-fc-light">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
          <div className="flex flex-wrap gap-4">
            {prev && (
              <Link
                href={`/edizioni/${prev.slug}`}
                className="text-[12px] font-extralight tracking-[0.18em] text-fc-secondary uppercase transition-colors hover:text-fc-primary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                ← Edizione {prev.anno}
              </Link>
            )}
            {next && (
              <Link
                href={`/edizioni/${next.slug}`}
                className="text-[12px] font-extralight tracking-[0.18em] text-fc-secondary uppercase transition-colors hover:text-fc-primary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                Edizione {next.anno} →
              </Link>
            )}
          </div>
          <CtaButton href="/edizioni" variant="ghost">
            Torna a tutte le edizioni
          </CtaButton>
        </div>
      </section>
    </PageShell>
  );
}
