import Link from "next/link";

import { LetteringMark } from "@/components/hero/LetteringMark";
import { contatti } from "@/content/contatti";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };

const footerLinks = [
  { href: "/edizioni", label: "Edizioni" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

/**
 * Footer minimal.
 * - Lettering FUTURE CAMPUS FABRIANO al posto dei loghi (SVG inline tramite
 *   `LetteringMark`, colorato in bianco via Tailwind).
 * - 2 colonne: Sito + Contatti (rimossa la sezione "Partner principali").
 * - Niente più link a /sponsor.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-fc-soft/60 bg-fc-dark text-fc-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-white"
              aria-label="Future Campus Fabriano — Home"
            >
              <LetteringMark className="h-auto w-[min(70vw,18rem)] md:w-[20rem]" />
            </Link>
          </div>

          <div>
            <p
              className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-accent"
              style={FONT_BODY}
            >
              Sito
            </p>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] font-extralight tracking-wide text-fc-soft transition-colors hover:text-fc-white"
                    style={FONT_BODY}
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
              style={FONT_BODY}
            >
              Contatti
            </p>
            <ul
              className="mt-5 space-y-3 text-[13px] font-extralight leading-relaxed text-fc-soft"
              style={FONT_BODY}
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

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-7 text-[11px] font-extralight tracking-wide text-fc-soft md:flex-row md:items-center">
          <span style={FONT_BODY}>
            © {new Date().getFullYear()} Future Campus Fabriano — Confindustria Ancona
          </span>
          <span style={FONT_BODY}>Tutti i diritti riservati</span>
        </div>
      </div>
    </footer>
  );
}
