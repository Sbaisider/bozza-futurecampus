"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import type { EdizioneFilm } from "@/content/edizioni";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

type FilmEdizioneProps = {
  film: EdizioneFilm;
  anno: number;
  /** Classi extra per il riquadro (es. arrotondamento). */
  className?: string;
};

/**
 * Film dell'edizione in due tempi:
 *
 *  1. In pagina: anteprima corta (~28 s, 720p, ~6 MB) in loop, muta, autoplay.
 *     Il file viene caricato solo quando il riquadro si avvicina al viewport e
 *     si mette in pausa quando esce. Con `prefers-reduced-motion` resta il poster.
 *  2. Al clic: player a tutto schermo (<dialog> nativo → ESC, focus e top layer
 *     gestiti dal browser) con il film completo e l'audio. Il film non viene
 *     scaricato finché non si apre il player (`preload="none"`).
 *
 * `play()` del film viene chiamato dentro il gesto di clic, così anche Safari
 * iOS concede la riproduzione con l'audio.
 */
export function FilmEdizione({ film, anno, className = "" }: FilmEdizioneProps) {
  const frameRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);

  // Carica l'anteprima solo quando il riquadro è vicino al viewport.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => {
        setPreviewSrc(film.anteprima);
        setInView(true);
      });
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPreviewSrc(film.anteprima);
        setInView(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [film.anteprima]);

  // Play/pausa dell'anteprima: gira solo se visibile e con il player chiuso.
  useEffect(() => {
    const v = previewRef.current;
    if (!v || !previewSrc) return;
    if (inView && !open) {
      v.muted = true;
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, open, previewSrc]);

  // Sicurezza: se il componente sparisce col player aperto, sblocca lo scroll.
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const openPlayer = useCallback(() => {
    const dialog = dialogRef.current;
    const player = playerRef.current;
    if (!dialog || !player) return;
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    setOpen(true);
    player.muted = false;
    void player.play().catch(() => {});
  }, []);

  const closePlayer = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Evento `close` del dialog: arriva sia da ESC sia da close().
  const handleClose = useCallback(() => {
    playerRef.current?.pause();
    document.documentElement.style.overflow = "";
    setOpen(false);
  }, []);

  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closePlayer();
    },
    [closePlayer],
  );

  return (
    <>
      <button
        ref={frameRef}
        type="button"
        onClick={openPlayer}
        aria-haspopup="dialog"
        aria-label={`Guarda il film del Future Campus ${anno} (${film.durata}, con audio)`}
        className={`group relative block aspect-video w-full cursor-pointer overflow-hidden bg-fc-dark text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fc-accent focus-visible:ring-offset-2 ${className}`.trim()}
      >
        <video
          ref={previewRef}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          src={previewSrc}
          poster={film.poster}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
        />

        {/* Scurimento dal basso per la leggibilità del testo */}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5"
          aria-hidden
        />

        {/* Pulsante play centrale */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <span className="flex size-16 items-center justify-center rounded-full bg-black/25 ring-1 ring-white/70 backdrop-blur-sm transition duration-300 ease-out group-hover:scale-105 group-hover:bg-fc-accent group-hover:ring-fc-accent sm:size-20 md:size-24">
            <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-white sm:size-7 md:size-8" aria-hidden>
              <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
          </span>
        </span>

        {/* Etichetta in basso a sinistra */}
        <span className="pointer-events-none absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] sm:inset-x-7 sm:bottom-6 md:inset-x-10 md:bottom-8" aria-hidden>
          <span
            className="block text-lg font-black leading-none tracking-tight sm:text-2xl md:text-3xl"
            style={FONT_DISPLAY}
          >
            Guarda il film
          </span>
          <span
            className="block shrink-0 text-[10px] font-light uppercase tracking-[0.32em] text-white sm:text-[11px]"
            style={FONT_BODY}
          >
            {film.durata} · con audio
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        aria-label={`Film del Future Campus ${anno}`}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none border-0 bg-black p-0 text-white"
      >
        <div
          className="flex h-full w-full items-center justify-center px-3 py-16 sm:px-8"
          onClick={handleBackdropClick}
        >
          <video
            ref={playerRef}
            className="aspect-video max-h-full w-full max-w-6xl bg-black"
            src={film.src}
            poster={film.poster}
            controls
            playsInline
            preload="none"
          />
        </div>
        <button
          type="button"
          onClick={closePlayer}
          className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-extralight uppercase tracking-[0.32em] text-white/90 ring-1 ring-white/40 transition hover:bg-white hover:text-fc-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fc-accent sm:right-6 sm:top-6"
          style={FONT_BODY}
        >
          Chiudi
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
