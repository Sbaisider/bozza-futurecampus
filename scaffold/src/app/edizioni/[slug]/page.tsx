import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CalendarioEdizione } from "@/components/edizioni/CalendarioEdizione";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { edizioni, getEdizioneBySlug } from "@/content/edizioni";
import { getAttivitaPerAnno } from "@/content/edizioni-attivita";

const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * Foto utilizzate per le card delle classi su ciascuna edizione.
 * Pescate dalla gallery dell'edizione corrispondente: cambiare i path
 * qui per aggiornare i visual senza toccare il componente.
 */
const CLASSI_FOTO: Record<
  string,
  Partial<Record<"Beginner" | "Master" | "Advanced", string>>
> = {
  "2025": {
    Beginner: "/foto/7075.JPG",
    Master: "/foto/7578.JPG",
    Advanced: "/foto/8505.JPG",
  },
  "2024": {
    Beginner: "/foto/3400.JPG",
    Master: "/foto/2820.JPG",
    Advanced: "/foto/3495.JPG",
  },
  "2023": {
    Beginner: "/foto/1294.JPG",
    Master: "/foto/1841.JPG",
  },
};

/**
 * 20 foto della prima edizione (Fabriano 2022) usate nel marquee auto-scroll
 * sotto l'hero. Ordine arbitrario — il marquee è infinito e duplicato.
 */
const PHOTOS_2022: string[] = [
  "/edizioni/2022/fabriano/1.JPG",
  "/edizioni/2022/fabriano/3%20(1).JPG",
  "/edizioni/2022/fabriano/3%20(2).JPG",
  "/edizioni/2022/fabriano/4.JPG",
  "/edizioni/2022/fabriano/5.JPG",
  "/edizioni/2022/fabriano/6.JPG",
  "/edizioni/2022/fabriano/7.JPG",
  "/edizioni/2022/fabriano/8.JPG",
  "/edizioni/2022/fabriano/9.JPG",
  "/edizioni/2022/fabriano/10.JPG",
  "/edizioni/2022/fabriano/11.JPG",
  "/edizioni/2022/fabriano/12.JPG",
  "/edizioni/2022/fabriano/13.JPG",
  "/edizioni/2022/fabriano/14.JPG",
  "/edizioni/2022/fabriano/15.JPG",
  "/edizioni/2022/fabriano/16.JPG",
  "/edizioni/2022/fabriano/17.JPG",
  "/edizioni/2022/fabriano/18.JPG",
  "/edizioni/2022/fabriano/19.JPG",
  "/edizioni/2022/fabriano/20.JPG",
];

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return edizioni.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ed = getEdizioneBySlug(slug);
  if (!ed) return { title: "Edizione non trovata" };
  return {
    title: `Edizione ${ed.anno}`,
    description: ed.sintesi,
  };
}

export default async function EdizioneDettaglioPage({ params }: PageProps) {
  const { slug } = await params;
  const ed = getEdizioneBySlug(slug);
  if (!ed) notFound();

  /* ─── EDIZIONE 2026 — pagina segnaposto: solo "IN ARRIVO" grande ────── */
  if (ed.anno === 2026) {
    return (
      <PageShell>
        <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-fc-primary px-5 text-white md:px-8">
          {/* Texture a punti molto leggera (stessa della hero mobile) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          {/* Glow morbido in alto, scurimento in basso → profondità */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/30"
            aria-hidden
          />

          <RevealWords
            as="h1"
            text="IN ARRIVO"
            wordDelay={150}
            className="relative block text-balance text-center text-[2.25rem] font-black leading-none tracking-tight md:text-[4rem] lg:text-[5.5rem]"
            style={FONT_DISPLAY}
          />
        </section>
      </PageShell>
    );
  }

  /* ─── EDIZIONI passate: hero solo anno + card classi (se presenti) ──── */
  // Logica card: nascoste se l'edizione ha un calendario attività popolato
  // (in quel caso le classi sono già visualizzate nel calendario via dot
  // colorati) oppure se è il 2022 (richiesta utente). Le edizioni 2024/2025
  // mostrano ancora 3 card finché non avranno il loro calendario attività.
  const attivitaAnno = getAttivitaPerAnno(ed.anno);
  const hasCalendario = attivitaAnno.length > 0;
  const fotoMap = CLASSI_FOTO[ed.slug] ?? {};
  const showCards = !hasCalendario && ed.anno !== 2022 && ed.classi.length >= 2;
  const classi = showCards ? ed.classi : [];
  const gridCols =
    classi.length === 3
      ? "md:grid-cols-3"
      : classi.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  return (
    <PageShell>
      {/* Hero: solo l'anno, centrato, su blu pieno con texture a punti (coerente con la hero mobile) */}
      <section className="relative isolate flex min-h-[70svh] items-center justify-center overflow-hidden bg-fc-primary px-5 text-white md:min-h-[80svh] md:px-8">
        {/* Texture a punti molto leggera (stessa della hero mobile) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        {/* Glow morbido in alto, scurimento in basso → profondità */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/30"
          aria-hidden
        />

        <RevealWords
          as="h1"
          text={String(ed.anno)}
          className="relative block text-center text-[3.5rem] font-black leading-none tracking-tight md:text-[5.5rem] lg:text-[7rem]"
          style={FONT_DISPLAY}
        />
      </section>

      {/* Card delle classi: blur+zoom-leggero di default, sharp+zoom-più-deciso su hover.
          Stesso pattern visuale delle card della pagina /edizioni. */}
      {classi.length > 0 && (
        <section className="bg-fc-dark">
          <ul className={`grid grid-cols-1 gap-0 ${gridCols}`}>
            {classi.map((classe, idx) => {
              const photo = fotoMap[classe as keyof typeof fotoMap];
              return (
                <Reveal
                  as="li"
                  key={classe}
                  delay={idx * 140}
                  className="group relative"
                >
                  <div className="relative min-h-[60vh] overflow-hidden bg-fc-dark md:min-h-[80vh]">
                    {photo ? (
                      <Image
                        src={photo}
                        alt=""
                        fill
                        sizes={
                          classi.length === 3
                            ? "(min-width: 768px) 33vw, 100vw"
                            : "(min-width: 768px) 50vw, 100vw"
                        }
                        quality={72}
                        className="fc-edizione-image object-cover"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fc-dark/80 via-fc-dark/25 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-6 bottom-7 md:inset-x-10 md:bottom-10">
                      <p
                        className="text-[2.5rem] font-black leading-none tracking-tight text-white md:text-[3.5rem] lg:text-[4.5rem]"
                        style={FONT_DISPLAY}
                      >
                        {classe}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </section>
      )}

      {/* Calendario attività dell'edizione (mostrato quando ci sono attività
          popolate in edizioni-attivita.ts). Per il 2023 ha 23 attività su 2
          mesi; per 2024/2025 ancora vuoto. */}
      {hasCalendario && <CalendarioEdizione attivita={attivitaAnno} anno={ed.anno} />}

      {/* Marquee orizzontale infinito delle foto della 1ª edizione (solo 2022).
          Lista duplicata per loop seamless con keyframe -50%. */}
      {ed.anno === 2022 && (
        <section className="overflow-hidden bg-fc-dark py-12 md:py-16">
          <ul
            className="fc-edizione-2022-marquee items-center gap-3 md:gap-4"
            aria-label="Foto dell'edizione 2022"
          >
            {[...PHOTOS_2022, ...PHOTOS_2022].map((src, i) => (
              <li
                key={`${src}-${i}`}
                className="relative h-[180px] w-[240px] shrink-0 overflow-hidden rounded-md ring-1 ring-white/10 md:h-[240px] md:w-[320px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 240px, 320px"
                  quality={70}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
