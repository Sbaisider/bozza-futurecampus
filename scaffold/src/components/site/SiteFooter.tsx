import Link from "next/link";

import { LetteringMark } from "@/components/hero/LetteringMark";
import { contatti } from "@/content/contatti";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };

const footerLinks = [
  { href: "/edizioni", label: "Edizioni" },
  { href: "/blog", label: "Blog" },
  { href: "/social", label: "Social" },
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
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="inline-flex items-center text-white"
              aria-label="Future Campus Fabriano — Home"
            >
              <LetteringMark className="h-auto w-[min(70vw,18rem)] md:w-[20rem]" />
            </Link>
            <div className="mt-5 flex w-[min(70vw,18rem)] items-center justify-center gap-4 md:w-[20rem]">
              <a
                href="https://www.facebook.com/ConfindustriaFABRIANO/?locale=it_IT"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook — Confindustria Fabriano"
                className="text-white/90 transition-colors hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-7.5h2.52l.38-2.93H13.5V8.7c0-.85.24-1.43 1.46-1.43h1.56V4.65c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.81 1.38-3.81 3.91v2.18H7.9v2.93h2.52V21h3.08z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/futurecampusfabriano/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — Future Campus Fabriano"
                className="text-white/90 transition-colors hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
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
                    className="block py-1.5 text-[13px] font-extralight tracking-wide text-fc-soft transition-colors hover:text-fc-white"
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
                  className="block break-all py-1.5 transition-colors hover:text-fc-white"
                >
                  {contatti.emailPubblica}
                </a>
              </li>
              <li className="py-1.5">{contatti.sedeAttivita}</li>
              <li className="py-1.5">{contatti.organizzazione}</li>
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
