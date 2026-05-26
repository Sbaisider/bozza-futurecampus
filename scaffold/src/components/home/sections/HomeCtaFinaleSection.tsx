import Link from "next/link";

import { Reveal } from "@/components/site/Reveal";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * CTA finale minimal: solo titolo + un'azione (Contattaci).
 * Sfondo blu pieno, niente eyebrow né paragrafi accessori.
 */
export function HomeCtaFinaleSection() {
  return (
    <section className="relative z-10 bg-fc-primary text-white">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-28 md:px-8 md:py-36 lg:py-44">
        <Reveal
          as="h2"
          className="text-balance text-[1.75rem] font-black leading-[1.1] tracking-tight sm:text-[2.25rem] md:text-[3rem] lg:text-[3.5rem]"
          style={FONT_DISPLAY}
        >
          Vuoi avere più informazioni
          <br className="hidden sm:block" />
          {" "}riguardo il campus?
        </Reveal>

        <Reveal delay={280} className="mt-9 flex items-center justify-center sm:mt-12">
          <Link
            href="/contatti"
            className="inline-flex min-h-[48px] items-center justify-center bg-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-fc-primary transition-colors hover:bg-fc-accent hover:text-white sm:px-9 sm:tracking-[0.22em]"
            style={FONT_DISPLAY}
          >
            Contattaci
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
