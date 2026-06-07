"use client";

import { useEffect } from "react";

const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };
const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-fc-primary px-5 py-24 text-center text-white md:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <p
        className="relative text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-white/80"
        style={FONT_BODY}
      >
        Errore
      </p>
      <h1
        className="relative mt-4 text-balance text-[2rem] font-black leading-none tracking-tight md:text-[3rem]"
        style={FONT_DISPLAY}
      >
        Qualcosa è andato storto
      </h1>
      <p
        className="relative mt-5 max-w-md text-[15px] font-extralight leading-[1.7] text-fc-white/85"
        style={FONT_BODY}
      >
        Si è verificato un problema imprevisto. Puoi riprovare: spesso si risolve da sé.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="relative mt-9 inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-fc-primary transition-colors hover:bg-fc-accent hover:text-fc-dark"
        style={FONT_DISPLAY}
      >
        Riprova
      </button>
    </main>
  );
}
