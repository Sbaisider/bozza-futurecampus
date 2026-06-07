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
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
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
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
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

  // Spezza per righe (mantiene a-capo espliciti) poi per parole. L'indice globale
  // di parola (per lo stagger cross-line) è precalcolato QUI, fuori dal JSX, così
  // il render non muta variabili di scope (react-hooks/immutability).
  let running = 0;
  const lineData = text.split("\n").map((line) =>
    line.split(/(\s+)/).map((token) => {
      const isWord = token !== "" && !/^\s+$/.test(token);
      return { token, isWord, wordIndex: isWord ? running++ : -1 };
    }),
  );

  return (
    <Tag
      ref={ref as never}
      data-revealed={revealed ? "true" : "false"}
      className={className}
      style={style}
    >
      {lineData.map((tokens, lineIdx) => (
        <span key={lineIdx} style={{ display: "block" }}>
          {tokens.map(({ token, isWord, wordIndex }, tokenIdx) => {
            if (token === "") return null;
            if (!isWord) {
              return <span key={tokenIdx}>{token}</span>;
            }
            return (
              <span
                key={tokenIdx}
                className="fc-reveal-word"
                style={{ animationDelay: `${delay + wordIndex * wordDelay}ms` }}
              >
                {token}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
