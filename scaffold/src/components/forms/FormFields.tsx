"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };

export function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-secondary"
      style={FONT_BODY}
    >
      {children} {optional && <span className="text-fc-soft normal-case tracking-normal">(facoltativo)</span>}
    </label>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;
export function TextInput(props: TextInputProps) {
  return (
    <input
      {...props}
      className={`mt-2 block w-full rounded-xl border border-fc-soft/70 bg-white px-4 py-3.5 text-[16px] font-extralight text-fc-dark placeholder:text-fc-soft transition-colors focus:border-fc-primary focus:outline-none focus:ring-2 focus:ring-fc-primary/15 sm:py-3 sm:text-[14px] ${props.className ?? ""}`}
      style={{ ...FONT_BODY, ...(props.style ?? {}) }}
    />
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export function TextArea(props: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`mt-2 block w-full rounded-xl border border-fc-soft/70 bg-white px-4 py-3.5 text-[16px] font-extralight leading-relaxed text-fc-dark placeholder:text-fc-soft transition-colors focus:border-fc-primary focus:outline-none focus:ring-2 focus:ring-fc-primary/15 sm:py-3 sm:text-[14px] ${props.className ?? ""}`}
      style={{ ...FONT_BODY, ...(props.style ?? {}) }}
    />
  );
}

/** Honeypot anti-spam: nascosto agli umani, riempito dai bot. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" style={{ position: "absolute" }}>
      <label htmlFor="website-hp">Lascia vuoto questo campo</label>
      <input id="website-hp" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
