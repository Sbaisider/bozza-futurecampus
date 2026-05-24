import Link from "next/link";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * CTA finale minimal: solo titolo + un'azione (Contattaci).
 * Sfondo blu pieno, niente eyebrow né paragrafi accessori.
 */
export function HomeCtaFinaleSection() {
  return (
    <section className="relative z-10 bg-fc-primary text-white">
      <div className="mx-auto max-w-4xl px-5 py-28 text-center md:px-8 md:py-36 lg:py-44">
        <h2
          className="text-balance text-[2rem] font-black leading-[1.08] tracking-tight sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]"
          style={FONT_DISPLAY}
        >
          Vuoi avere più informazioni
          <br />
          riguardo il campus?
        </h2>

        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/contatti"
            className="inline-flex items-center justify-center bg-white px-9 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-fc-primary transition-colors hover:bg-fc-accent hover:text-white"
            style={FONT_DISPLAY}
          >
            Contattaci
          </Link>
        </div>
      </div>
    </section>
  );
}
