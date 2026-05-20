import Link from "next/link";

import { sponsor } from "@/content/sponsor";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export function HomeSponsorMiniSection() {
  const primari = sponsor
    .filter((s) => s.categoria === "promotore" || s.categoria === "istituzionale")
    .slice(0, 6);

  return (
    <section className="relative z-10 bg-fc-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-primary" style={FONT_BODY}>
              Sponsor e partner
            </p>
            <h2 className="mt-3 max-w-[28ch] text-xl font-black leading-tight tracking-tight text-fc-dark md:text-2xl" style={FONT_DISPLAY}>
              Le realtà che rendono possibile il Campus.
            </h2>
          </div>
          <Link
            href="/sponsor"
            className="text-[12px] font-extralight tracking-[0.18em] text-fc-primary uppercase transition-colors hover:text-fc-accent"
            style={FONT_BODY}
          >
            Tutti i partner →
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {primari.map((s) => (
            <li
              key={s.nome}
              className="rounded-xl border border-fc-soft/60 bg-fc-light px-4 py-4 text-center transition hover:border-fc-primary/25 sm:text-left"
            >
              <p className="text-[13.5px] font-black leading-tight tracking-tight text-fc-primary" style={FONT_DISPLAY}>
                {s.nome}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
