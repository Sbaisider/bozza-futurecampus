"use client";

import Image from "next/image";

const TERRITORIO_PHOTO = "/foto/360.jpg";

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
      className="relative z-10 scroll-mt-24 border-t border-white/10"
    >
      <div className="relative min-h-[min(88vh,820px)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 overflow-hidden">
            <div className="fc-crescita-bg-zoom absolute inset-0 h-full min-h-full w-full min-w-full origin-center">
              <Image
                src={TERRITORIO_PHOTO}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                quality={60}
                priority={false}
              />
            </div>
          </div>
          {/* Lettura testi + coerenza brand */}
          <div className="absolute inset-0 bg-gradient-to-br from-fc-primary/88 via-fc-primary/55 to-[#0a1628]/92" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(88vh,820px)] max-w-[960px] flex-col justify-center px-5 py-20 md:px-10 md:py-28 lg:px-12">
          <div className="text-center">
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Territorio
            </p>
            <h2
              className="mx-auto mt-4 max-w-[34ch] text-pretty text-2xl font-black leading-tight tracking-tight text-white md:text-3xl lg:text-[2rem] lg:leading-snug"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              Educazione, orientamento, futuro — con radici nel territorio.
            </h2>
            <p
              className="mx-auto mt-6 max-w-lg text-sm font-extralight leading-relaxed text-white/88"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Un ecosistema che accompagna i giovani verso scelte consapevoli e connessioni reali.
            </p>
          </div>

          <ul
            className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2.5 md:mt-14 md:gap-3"
            aria-label="Partner e rete"
          >
            {partners.map((p) => (
              <li key={p}>
                <span
                  className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-2.5 text-[12px] font-extralight tracking-wide text-white/92 backdrop-blur-[2px] md:px-5 md:text-[13px]"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
