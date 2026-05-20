import Image from "next/image";
import Link from "next/link";

import { contatti } from "@/content/contatti";
import { sponsor } from "@/content/sponsor";

const footerLinks = [
  { href: "/edizioni", label: "Edizioni" },
  { href: "/blog", label: "Blog" },
  { href: "/unisciti", label: "Unisciti a noi" },
  { href: "/sponsor", label: "Sponsor" },
  { href: "/contatti", label: "Contatti" },
  { href: "/faq", label: "FAQ" },
];

export function SiteFooter() {
  const partnerSintetici = sponsor
    .filter((s) => s.categoria === "promotore" || s.categoria === "istituzionale")
    .slice(0, 5)
    .map((s) => s.nome);

  return (
    <footer className="mt-24 border-t border-fc-soft/60 bg-fc-dark text-fc-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Future Campus Fabriano">
              <Image
                src="/brand/fcf-logo.svg"
                alt="Future Campus Fabriano"
                width={208}
                height={55}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p
              className="mt-5 max-w-md text-[13px] font-extralight leading-relaxed text-fc-soft"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Marchio di Confindustria Ancona — Comitato Territoriale Fabriano. Un percorso gratuito di formazione e orientamento per i ragazzi delle scuole superiori del territorio.
            </p>
          </div>

          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Sito
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] font-extralight tracking-wide text-fc-soft transition-colors hover:text-fc-white"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Contatti
            </p>
            <ul
              className="mt-4 space-y-2.5 text-[13px] font-extralight leading-relaxed text-fc-soft"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              <li>
                <a
                  href={`mailto:${contatti.emailPubblica}`}
                  className="transition-colors hover:text-fc-white"
                >
                  {contatti.emailPubblica}
                </a>
              </li>
              <li>{contatti.sedeAttivita}</li>
              <li>{contatti.organizzazione}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7">
          <p
            className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Partner principali
          </p>
          <ul
            className="mt-4 flex flex-wrap gap-2.5"
            aria-label="Partner principali"
          >
            {partnerSintetici.map((p) => (
              <li key={p}>
                <span
                  className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11.5px] font-extralight tracking-wide text-fc-soft"
                  style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                >
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[11px] font-extralight tracking-wide text-fc-soft md:flex-row md:items-center">
          <span style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
            © {new Date().getFullYear()} Future Campus Fabriano — Confindustria Ancona
          </span>
          <span style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
            Sito web {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
