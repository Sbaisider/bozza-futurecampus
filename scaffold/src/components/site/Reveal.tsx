"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Reveal: avvolge un elemento e lo anima in fade + slide-up quando
 * entra in viewport per la prima volta (run-once, IntersectionObserver,
 * threshold ~15%, soglia inferiore -8% così parte appena la sezione affiora).
 *
 * - `delay`: ritardo iniziale in ms (utile per gli stagger).
 * - `as`: tag HTML usato per il wrapper (default `div`).
 * - Rispetta `prefers-reduced-motion` via CSS (cfr. globals.css).
 *
 * Stile/durata sono definiti in globals.css sotto `.fc-reveal`.
 */

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  const composedStyle: CSSProperties = {
    ...style,
    animationDelay: delay ? `${delay}ms` : undefined,
  };

  return (
    <Tag
      ref={ref as never}
      data-revealed={revealed ? "true" : "false"}
      className={`fc-reveal ${className}`.trim()}
      style={composedStyle}
    >
      {children}
    </Tag>
  );
}

/**
 * RevealWords: come Reveal, ma splitta il testo in parole e le anima in
 * sequenza (ciascuna con un piccolo stagger interno).
 *
 * Usato per i titoloni dove vogliamo l'effetto "la frase si compone".
 * Il testo deve essere passato come `text` (stringa). Per testi multi-line
 * usare `\n` (verrà reso con `<br />`).
 */

type RevealWordsProps = {
  as?: ElementType;
  text: string;
  delay?: number;
  wordDelay?: number;
  className?: string;
  style?: CSSProperties;
};

export function RevealWords({
  as: Tag = "span",
  text,
  delay = 0,
  wordDelay = 70,
  className = "",
  style,
}: RevealWordsProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  // Spezza per righe (mantiene a-capo espliciti) poi per parole.
  const lines = text.split("\n");
  let wordIndex = 0;

  return (
    <Tag
      ref={ref as never}
      data-revealed={revealed ? "true" : "false"}
      className={className}
      style={style}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(/(\s+)/);
        return (
          <span key={lineIdx} style={{ display: "block" }}>
            {words.map((token, tokenIdx) => {
              if (token === "") return null;
              if (/^\s+$/.test(token)) {
                return <span key={tokenIdx}>{token}</span>;
              }
              const localDelay = delay + wordIndex * wordDelay;
              wordIndex += 1;
              return (
                <span
                  key={tokenIdx}
                  className="fc-reveal-word"
                  style={{ animationDelay: `${localDelay}ms` }}
                >
                  {token}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
