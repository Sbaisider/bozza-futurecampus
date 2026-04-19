"use client";

type Props = {
  /** Nomi leggeri, senza loghi pesanti — testo sobrio */
  partners?: string[];
};

const DEFAULT_PARTNERS = [
  "Confindustria Ancona",
  "Scuole e territorio",
  "Imprese e istituzioni",
];

export function HomePartnerSection({ partners = DEFAULT_PARTNERS }: Props) {
  return (
    <section
      id="chiusura"
      className="relative z-10 scroll-mt-24 border-t border-fc-soft/50 bg-fc-white"
    >
      <div className="mx-auto max-w-[900px] px-5 py-24 text-center md:px-8 md:py-32 lg:px-12">
        <p
          className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Territorio
        </p>
        <h2
          className="mt-4 text-pretty text-2xl font-black tracking-tight text-fc-dark md:text-3xl"
          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
        >
          Educazione, orientamento, futuro — con radici nel territorio.
        </h2>
        <p
          className="mx-auto mt-6 max-w-lg text-sm font-extralight leading-relaxed text-fc-secondary"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Un ecosistema che accompagna i giovani verso scelte consapevoli e connessioni reali.
        </p>

        <ul className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-8 gap-y-3 text-[13px] font-extralight tracking-wide text-fc-secondary">
          {partners.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <nav
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
          aria-label="Azioni"
        >
          <a
            href="#esperienza"
            className="inline-flex min-h-11 min-w-[200px] items-center justify-center border border-fc-primary/25 px-6 text-[12px] font-light uppercase tracking-[0.22em] text-fc-primary transition hover:border-fc-primary/50 hover:bg-fc-primary/[0.04]"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Scopri il progetto
          </a>
          <a
            href="#crescita"
            className="inline-flex min-h-11 min-w-[200px] items-center justify-center border border-transparent px-6 text-[12px] font-light uppercase tracking-[0.22em] text-fc-secondary transition hover:text-fc-primary"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Le edizioni
          </a>
          <span
            className="inline-flex min-h-11 min-w-[200px] cursor-not-allowed items-center justify-center border border-dashed border-fc-soft/80 px-6 text-[12px] font-light uppercase tracking-[0.22em] text-fc-soft"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            title="Prossimamente"
          >
            Candidature · prossimamente
          </span>
        </nav>
      </div>
    </section>
  );
}
