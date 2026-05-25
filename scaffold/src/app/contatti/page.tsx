import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { contatti } from "@/content/contatti";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Scrivi al Future Campus Fabriano per informazioni, collaborazioni o opportunità di partnership.",
};

export default function ContattiPage() {
  return (
    <PageShell>
      <PageHero
        title="Contatti"
        imageSrc="/foto/5026.JPG"
        imageAlt=""
        compact
      />

      <section className="bg-fc-light">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.3fr] md:gap-16 md:px-8 md:py-24">
          <Reveal as="div">
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Email
            </p>
            <a
              href={`mailto:${contatti.emailPubblica}`}
              className="mt-3 inline-block break-words text-[18px] font-black leading-tight tracking-tight text-fc-dark transition-colors hover:text-fc-primary md:text-[20px]"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              {contatti.emailPubblica}
            </a>

            <div className="mt-10 border-t border-fc-soft/70 pt-6">
              <p
                className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                Dove ci troviamo
              </p>
              <p
                className="mt-3 text-[14px] font-extralight leading-relaxed text-fc-dark"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                {contatti.sedeAttivita}
              </p>
              <p
                className="mt-2 text-[13px] font-extralight leading-relaxed text-fc-secondary"
                style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
              >
                {contatti.organizzazione}
              </p>
            </div>
          </Reveal>

          <Reveal as="div" delay={180}>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Form di contatto
            </p>
            <h2
              className="mt-3 text-[22px] font-black leading-tight tracking-tight text-fc-dark md:text-[26px]"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              Scrivici un messaggio
            </h2>
            <p
              className="mt-3 text-[13px] font-extralight leading-relaxed text-fc-secondary"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Ti rispondiamo direttamente alla tua casella email.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
