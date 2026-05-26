"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef, useCallback, useEffect, useId, useState } from "react";

const links = [
  { href: "/edizioni", label: "Edizioni" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

// Mobile panel: solo Edizioni e Blog (Home/Contatti rimossi su richiesta).
const mobileLinks = [
  { href: "/edizioni", label: "Edizioni" },
  { href: "/blog", label: "Blog" },
];

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

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
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 py-1 md:gap-3"
            aria-label="Future Campus Fabriano — Home"
            onClick={close}
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
              className="text-[10.5px] font-extralight tracking-[0.2em] text-fc-primary uppercase leading-[1.15] sm:text-[11px] sm:tracking-[0.22em]"
              style={FONT_BODY}
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
                    style={FONT_BODY}
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
            className="relative z-[70] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-fc-soft/70 bg-white/90 text-fc-primary shadow-sm transition active:scale-95 hover:border-fc-primary/35 hover:bg-white md:hidden"
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

        {/* ─── Mobile overlay + pannello ───────────────────────────────── */}
        <div
          className={`fixed inset-0 z-[65] md:hidden ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          {/* Backdrop scuro cliccabile per chiudere */}
          <button
            type="button"
            className={`absolute inset-0 bg-fc-dark/55 backdrop-blur-[3px] transition-opacity duration-300 ease-out ${
              open ? "opacity-100" : "opacity-0"
            }`}
            tabIndex={open ? 0 : -1}
            aria-label="Chiudi menu"
            onClick={close}
          />

          {/* Pannello laterale a tema blu primario, premium */}
          <nav
            id={panelId}
            className={`absolute top-0 right-0 flex h-[100dvh] w-[min(100%,22rem)] flex-col overflow-hidden bg-fc-primary text-fc-white shadow-[-18px_0_60px_rgba(0,0,0,0.32)] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Menu principale"
            style={{
              paddingTop: "max(1.25rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
            }}
          >
            {/* Texture a punti molto leggera (coerente con la hero mobile) */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden
            />

            {/* Header pannello: spazio per la X dell'hamburger (in alto a destra nella navbar) */}
            <div className="relative h-10 px-6 pb-6" aria-hidden />

            {/* Eyebrow "Menu" */}
            <p
              className={`relative px-6 pb-3 text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent transition-opacity duration-500 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              style={{ ...FONT_BODY, transitionDelay: open ? "120ms" : "0ms" }}
            >
              Menu
            </p>

            {/* Lista link grandi, tap-friendly */}
            <ul className="relative flex-1 overflow-y-auto px-6">
              {mobileLinks.map((l, i) => (
                <li
                  key={l.label}
                  className={`border-b border-white/10 transition-all duration-500 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${180 + i * 70}ms` : "0ms" }}
                >
                  <Link
                    href={l.href}
                    onClick={close}
                    className="group flex items-center justify-between py-4 text-[22px] font-black tracking-tight text-fc-white transition-colors hover:text-fc-accent"
                    style={FONT_DISPLAY}
                  >
                    <span>{l.label}</span>
                    <span
                      aria-hidden
                      className="text-fc-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-fc-accent"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Contattaci in fondo */}
            <div
              className={`relative px-6 pt-6 transition-opacity duration-500 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: open ? "500ms" : "0ms" }}
            >
              <Link
                href="/contatti"
                onClick={close}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-fc-accent px-5 py-3.5 text-[12px] font-black tracking-[0.18em] text-fc-white uppercase shadow-[0_8px_24px_-8px_rgba(19,172,234,0.7)] transition active:scale-[0.98] hover:bg-fc-white hover:text-fc-primary"
                style={FONT_DISPLAY}
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
