"use client";

import { forwardRef } from "react";

const links = [
  { href: "#intro", label: "Progetto" },
  { href: "#", label: "Campus" },
  { href: "#", label: "Contatti" },
];

/**
 * Navbar fissa: nascosta all’inizio, rivelata da GSAP verso fine transizione hero.
 */
export const SiteNavbar = forwardRef<HTMLElement>(function SiteNavbar(_props, ref) {
  return (
    <header
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] border-b border-fc-soft/70 bg-fc-white/92 opacity-0 backdrop-blur-md"
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
});
