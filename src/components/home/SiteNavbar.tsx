"use client";

import { forwardRef } from "react";

const links = [
  { href: "#intro", label: "Progetto" },
  { href: "#", label: "Campus" },
  { href: "#", label: "Contatti" },
];

export type SiteNavbarProps = {
  className?: string;
};

/**
 * Barra navigazione globale: in homepage montata come `fixed top-0` (layer sopra hero/intro), animata da GSAP.
 */
export const SiteNavbar = forwardRef<HTMLElement, SiteNavbarProps>(
  function SiteNavbar({ className = "" }, ref) {
    return (
      <header
        ref={ref}
        className={`border-b border-fc-soft/80 bg-fc-white/95 shadow-[0_1px_0_rgba(7,8,8,0.04)] backdrop-blur-md ${className}`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
          <a
            href="/"
            className="text-lg font-black tracking-tight text-fc-primary"
            style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
          >
            FCF
          </a>
          <nav aria-label="Principale">
            <ul className="flex items-center gap-6 md:gap-10">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13px] font-extralight tracking-[0.18em] text-fc-secondary uppercase transition-colors hover:text-fc-primary"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    );
  },
);
