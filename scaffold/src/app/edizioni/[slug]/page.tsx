import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { edizioni, getEdizioneBySlug } from "@/content/edizioni";

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
          {/* Sfondo: copertina edizione, blur 24px + zoom in loop */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
            <div className="fc-crescita-bg-zoom absolute inset-0 h-full w-full">
              <Image
                src={ed.copertina}
                alt=""
                fill
                priority
                sizes="100vw"
                quality={70}
                className="object-cover"
                style={{ filter: "blur(24px)", transform: "scale(1.15)" }}
              />
            </div>
          </div>
          {/* Patina blu */}
          <div
            className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-fc-primary/60 via-fc-primary/50 to-fc-primary/72"
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
  // 2022: 1 sola classe in dato ma da specifica utente NON si mostrano card
  // (calendario vuoto). 2023 → 2 card. 2024/2025 → 3 card.
  const fotoMap = CLASSI_FOTO[ed.slug] ?? {};
  const showCards = ed.anno !== 2022 && ed.classi.length >= 2;
  const classi = showCards ? ed.classi : [];
  const gridCols =
    classi.length === 3
      ? "md:grid-cols-3"
      : classi.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  return (
    <PageShell>
      {/* Hero: solo l'anno, centrato, su sfondo foto blurata + patina blu con zoom continuo */}
      <section className="relative isolate flex min-h-[70svh] items-center justify-center overflow-hidden bg-fc-primary px-5 text-white md:min-h-[80svh] md:px-8">
        {/* Sfondo: copertina edizione, blur 24px + zoom in loop */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="fc-crescita-bg-zoom absolute inset-0 h-full w-full">
            <Image
              src={ed.copertina}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={70}
              className="object-cover"
              style={{ filter: "blur(24px)", transform: "scale(1.15)" }}
            />
          </div>
        </div>
        {/* Patina blu */}
        <div
          className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-fc-primary/60 via-fc-primary/50 to-fc-primary/72"
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
    </PageShell>
  );
}
