"use client";

import Image from "next/image";
import { forwardRef, useCallback, useEffect, useId, useState } from "react";

const links = [
  { href: "#esperienza", label: "Esperienza" },
  { href: "#crescita", label: "Percorso" },
  { href: "#vita", label: "Come si vive" },
  { href: "#chiusura", label: "Territorio" },
];

export type SiteNavbarProps = {
  className?: string;
  /** Scroll imperativo: la sezione Esperienza usa transform GSAP, #hash non è affidabile. */
  onEsperienzaClick?: () => void;
};

/**
 * Barra navigazione globale: in homepage montata come `fixed top-0` (layer sopra hero/intro), animata da GSAP.
 * Desktop: link in riga. Mobile (&lt; md): menu hamburger + pannello full-height.
 */
export const SiteNavbar = forwardRef<HTMLElement, SiteNavbarProps>(
  function SiteNavbar({ className = "", onEsperienzaClick }, ref) {
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
        className={`border-b border-fc-soft/80 bg-fc-white/92 shadow-[0_1px_0_rgba(7,8,8,0.04)] backdrop-blur-xl md:bg-fc-white/95 ${className}`}
      >
        <div className="mx-auto flex h-[3.25rem] max-w-6xl items-center justify-between px-4 md:h-16 md:px-8">
          <a href="/" className="flex shrink-0 items-center py-1">
            <Image
              src="/brand/fcf-logo.png"
              alt="Future Campus Fabriano"
              width={40}
              height={40}
              className="h-8 w-8 object-contain md:h-9 md:w-9"
            />
          </a>

          {/* Desktop: invariato */}
          <nav aria-label="Principale" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13px] font-extralight tracking-[0.18em] text-fc-secondary uppercase transition-colors hover:text-fc-primary"
                    style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
                    onClick={
                      l.href === "#esperienza" && onEsperienzaClick
                        ? (e) => {
                            e.preventDefault();
                            onEsperienzaClick();
                          }
                        : undefined
                    }
                  >
                    {l.label}
                  </a>
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
                  <a
                    href={l.href}
                    className={`block border-b border-fc-soft/40 py-3.5 text-[13px] font-extralight tracking-[0.22em] text-fc-secondary uppercase transition-colors hover:text-fc-primary ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      fontFamily: "var(--font-manrope), system-ui, sans-serif",
                      transition: "opacity 0.35s ease, color 0.2s",
                    }}
                    onClick={(e) => {
                      if (l.href === "#esperienza" && onEsperienzaClick) {
                        e.preventDefault();
                        onEsperienzaClick();
                      }
                      close();
                    }}
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
