import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { getEdizioniOrdinate } from "@/content/edizioni";

const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export const metadata: Metadata = {
  title: "Edizioni",
  description:
    "L'archivio delle edizioni del Future Campus Fabriano: dalla prima del 2022 alla quinta del 2026.",
};

export default function EdizioniIndexPage() {
  const edizioni = getEdizioniOrdinate("desc");

  return (
    <PageShell>
      <PageHero
        eyebrow="Edizioni"
        title="L'archivio delle annualità"
        lead="Dal 2022 a oggi, ogni edizione del Future Campus ha aggiunto un capitolo nuovo: una classe in più, ragazzi in più, una rete più larga"
        imageSrc="/foto/8505.JPG"
        imageAlt=""
      />

      <section className="bg-fc-light">
        {/* Card attaccate, solo anno — stesso pattern della HomeEdizioniPassateSection */}
        <ul className="grid grid-cols-2 gap-0 md:grid-cols-5">
          {edizioni.map((e) => (
            <li key={e.slug} className="group relative">
              <Link
                href={`/edizioni/${e.slug}`}
                className="relative block aspect-[3/4] overflow-hidden bg-fc-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-primary/40 md:aspect-[3/4.5]"
              >
                <Image
                  src={e.copertina}
                  alt={`Edizione ${e.anno}`}
                  fill
                  sizes="(min-width: 768px) 20vw, 50vw"
                  quality={72}
                  className="fc-edizione-image object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fc-dark/70 via-fc-dark/15 to-transparent" />
                <p
                  className="pointer-events-none absolute inset-x-6 bottom-7 text-[2.75rem] font-black leading-none tracking-tight text-white md:inset-x-7 md:bottom-8 md:text-[3.25rem] lg:text-[3.75rem]"
                  style={FONT_DISPLAY}
                >
                  {e.anno}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
