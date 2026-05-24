"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef, useCallback, useEffect, useId, useState } from "react";

const links = [
  { href: "/edizioni", label: "Edizioni" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

export type SiteNavbarProps = {
  className?: string;
  /** Scroll imperativo opzionale: serve solo alla Home per l'ancora #esperienza. */
  onEsperienzaClick?: () => void;
};

/**
 * Barra di navigazione globale del sito.
 * - Home: montata da `HomeExperience` come `fixed top-0` con animazione GSAP.
 * - Pagine interne: usata via `PageShell`, statica in cima.
 * Desktop: link in riga. Mobile (< md): menu hamburger + pannello full-height.
 */
export const SiteNavbar = forwardRef<HTMLElement, SiteNavbarProps>(
  function SiteNavbar({ className = "" }, ref) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [close]);

    return (
      <header
        ref={ref}
        className={`border-b border-fc-soft/60 bg-fc-white/94 shadow-[0_6px_24px_rgba(36,76,144,0.08)] backdrop-blur-xl md:bg-fc-white/96 ${className}`}
      >
        <div className="mx-auto flex h-[3.25rem] max-w-6xl items-center justify-between px-4 md:h-16 md:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 py-1"
            aria-label="Future Campus Fabriano — Home"
          >
            <Image
              src="/brand/fcf-emblem.png"
              alt="Future Campus Fabriano"
              width={96}
              height={96}
              className="h-9 w-9 md:h-10 md:w-10"
              priority
            />
            <span
              className="hidden text-[11px] font-extralight tracking-[0.22em] text-fc-primary uppercase sm:inline-block"
              style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
            >
              Future Campus
              <br />
              Fabriano
            </span>
          </Link>

          {/* Desktop */}
          <nav aria-label="Principale" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[12px] font-extralight tracking-[0.18em] text-fc-secondary uppercase transition-colors hover:text-fc-primary"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile: hamburger */}
          <button
            type="button"
            className="relative z-[70] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-fc-soft/70 bg-white/90 text-fc-primary shadow-sm transition hover:border-fc-primary/35 hover:bg-white md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex h-[14px] w-[18px] flex-col justify-between" aria-hidden>
              <span
                className={`h-0.5 w-full origin-center rounded-full bg-fc-primary transition-transform duration-300 ease-out ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-fc-primary transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full origin-center rounded-full bg-fc-primary transition-transform duration-300 ease-out ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile overlay + pannello */}
        <div
          className={`fixed inset-0 z-[65] md:hidden ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          <button
            type="button"
            className={`absolute inset-0 bg-fc-dark/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
              open ? "opacity-100" : "opacity-0"
            }`}
            tabIndex={open ? 0 : -1}
            aria-label="Chiudi menu"
            onClick={close}
          />
          <nav
            id={panelId}
            className={`absolute top-0 right-0 flex h-[min(100dvh,100%)] w-[min(100%,20rem)] flex-col border-l border-fc-soft/60 bg-fc-white/97 py-6 pl-6 shadow-[-12px_0_48px_rgba(36,76,144,0.12)] backdrop-blur-xl transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Menu principale"
            style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
          >
            <ul className="flex flex-1 flex-col gap-1 pr-4">
              {links.map((l, i) => (
                <li key={l.label} style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}>
                  <Link
                    href={l.href}
                    className={`block border-b border-fc-soft/40 py-3.5 text-[13px] font-extralight tracking-[0.22em] text-fc-secondary uppercase transition-colors hover:text-fc-primary ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      fontFamily: "var(--font-manrope), system-ui, sans-serif",
                      transition: "opacity 0.35s ease, color 0.2s",
                    }}
                    onClick={close}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pr-4">
              <Link
                href="/contatti"
                onClick={close}
                className="block w-full rounded-full bg-fc-primary px-5 py-3 text-center text-[12px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition hover:bg-fc-accent"
                style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
              >
                Contattaci
              </Link>
            </div>
          </nav>
        </div>
      </header>
    );
  },
);
