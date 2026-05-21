import type { Metadata } from "next";

import { IscrizioneForm } from "@/components/forms/IscrizioneForm";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { getEdizioneCorrente } from "@/content/edizioni";

export const metadata: Metadata = {
  title: "Unisciti a noi",
  description:
    "Iscriviti gratuitamente al Future Campus Fabriano. Sei settimane di formazione esperienziale per studenti delle scuole superiori del territorio.",
};

const STEPS = [
  {
    titolo: "Compila il modulo",
    testo: "Inserisci i tuoi dati e raccontaci perché vorresti partecipare. Bastano poche righe.",
  },
  {
    titolo: "Ti ricontattiamo",
    testo: "L'organizzazione del Campus ti scriverà dalla casella ufficiale per i passaggi successivi.",
  },
  {
    titolo: "Si parte",
    testo: "All'avvio della stagione ti verrà comunicata la classe assegnata e il calendario degli incontri.",
  },
];

export default function UniscitiPage() {
  const corrente = getEdizioneCorrente();

  return (
    <PageShell>
      <PageHero
        eyebrow="Unisciti a noi"
        title={
          <>
            Iscriviti al <span className="text-fc-accent">Future Campus 2026</span>
          </>
        }
        lead="Sei settimane di formazione esperienziale, gratuita, per i ragazzi delle scuole superiori del territorio. Le iscrizioni sono aperte."
        imageSrc="/foto/7075.JPG"
        imageAlt=""
      />

      {/* A chi è rivolto */}
      <section className="bg-fc-light">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <SectionEyebrow
              label="A chi si rivolge"
              title="Per gli studenti delle scuole superiori del territorio di Fabriano"
              lead="Il Campus è pensato per ragazze e ragazzi che vogliono conoscere il mondo del lavoro, le imprese del territorio, sviluppare competenze trasversali e mettersi alla prova fuori dall'aula scolastica."
            />
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-fc-soft/60 bg-white p-6">
                <p
                  className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  Beginner
                </p>
                <p
                  className="mt-3 text-[14px] font-extralight leading-relaxed text-fc-dark"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  Per chi parte per la prima volta. Giochi di team building, primi incontri con coach e imprenditori.
                </p>
              </div>
              <div className="rounded-2xl border border-fc-soft/60 bg-white p-6">
                <p
                  className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  Master
                </p>
                <p
                  className="mt-3 text-[14px] font-extralight leading-relaxed text-fc-dark"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  Per chi ha già fatto la Beginner. Due giorni intensivi in azienda per costruire un progetto reale.
                </p>
              </div>
              <div className="rounded-2xl border border-fc-soft/60 bg-white p-6">
                <p
                  className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  Advanced
                </p>
                <p
                  className="mt-3 text-[14px] font-extralight leading-relaxed text-fc-dark"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  Per chi torna al terzo anno. L'energia di gruppo diventa il filo conduttore di ogni attività.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Come iscriversi - step */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <SectionEyebrow
            label="Come iscriversi"
            title="Tre passaggi semplici"
            lead="Niente burocrazia, niente costi. Solo un modulo da compilare e poi ti accompagniamo noi."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <li key={s.titolo} className="relative rounded-2xl border border-fc-soft/60 bg-fc-light p-7">
                <span
                  className="absolute -top-4 left-7 inline-flex h-9 w-9 items-center justify-center rounded-full bg-fc-primary text-[14px] font-black text-white"
                  style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                >
                  {i + 1}
                </span>
                <h3
                  className="mt-3 text-[18px] font-black leading-tight tracking-tight text-fc-dark"
                  style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                >
                  {s.titolo}
                </h3>
                <p
                  className="mt-3 text-[14px] font-extralight leading-relaxed text-fc-secondary"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  {s.testo}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scadenze e info pratiche */}
      <section className="bg-fc-soft/30">
        <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p
                className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                Periodo
              </p>
              <p
                className="mt-2 text-[15px] font-black text-fc-dark"
                style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
              >
                {corrente.periodo}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                Durata
              </p>
              <p
                className="mt-2 text-[15px] font-black text-fc-dark"
                style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
              >
                6 settimane, 2 incontri a settimana
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                Costo
              </p>
              <p
                className="mt-2 text-[15px] font-black text-fc-dark"
                style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
              >
                Gratuito
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-fc-light scroll-mt-24">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <SectionEyebrow
            label="Modulo di iscrizione"
            title="Candidati ora"
            lead="Compila i campi qui sotto. Ti ricontatteremo direttamente sulla tua email."
          />
          <div className="mt-10">
            <IscrizioneForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
