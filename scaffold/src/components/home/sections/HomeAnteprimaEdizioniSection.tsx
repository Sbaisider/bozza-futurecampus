import Image from "next/image";
import Link from "next/link";

import { getEdizioniOrdinate } from "@/content/edizioni";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export function HomeAnteprimaEdizioniSection() {
  const edizioni = getEdizioniOrdinate("desc").slice(0, 4);

  return (
    <section className="relative z-10 bg-fc-light">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-primary" style={FONT_BODY}>
              Anteprima edizioni
            </p>
            <h2 className="mt-4 max-w-[24ch] text-2xl font-black leading-tight tracking-tight text-fc-dark md:text-3xl" style={FONT_DISPLAY}>
              Cinque anni di Campus, raccontati anno per anno.
            </h2>
          </div>
          <Link
            href="/edizioni"
            className="text-[12px] font-extralight tracking-[0.18em] text-fc-primary uppercase transition-colors hover:text-fc-accent"
            style={FONT_BODY}
          >
            Esplora l'archivio →
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {edizioni.map((e) => (
            <li key={e.slug}>
              <Link
                href={`/edizioni/${e.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-fc-primary/30"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-fc-soft/40">
                  <Image
                    src={e.copertina}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent" style={FONT_BODY}>
                      {e.anno}
                    </p>
                    <h3 className="mt-1.5 text-[16px] font-black leading-tight tracking-tight" style={FONT_DISPLAY}>
                      {e.numeroEdizione}
                    </h3>
                  </div>
                  {e.isCorrente && (
                    <span
                      className="absolute right-3 top-3 rounded-full bg-fc-accent px-2.5 py-1 text-[9.5px] font-black tracking-[0.18em] text-white uppercase"
                      style={FONT_DISPLAY}
                    >
                      In corso
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
