import type { ReactNode } from "react";

import { Reveal } from "@/components/site/Reveal";

type SectionEyebrowProps = {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionEyebrow({
  label,
  title,
  lead,
  align = "left",
  light = false,
}: SectionEyebrowProps) {
  return (
    <header className={align === "center" ? "text-center" : ""}>
      <Reveal
        as="p"
        className={`text-[10px] font-extralight uppercase tracking-[0.42em] ${light ? "text-fc-accent" : "text-fc-primary"}`}
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        {label}
      </Reveal>
      <Reveal
        as="h2"
        delay={140}
        className={`mt-4 text-pretty text-2xl font-black leading-tight tracking-tight md:text-3xl lg:text-[2rem] lg:leading-snug ${light ? "text-white" : "text-fc-dark"} ${align === "center" ? "mx-auto max-w-[34ch]" : "max-w-[34ch]"}`}
        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
      >
        {title}
      </Reveal>
      {lead && (
        <Reveal
          as="p"
          delay={320}
          className={`mt-5 max-w-2xl text-[15px] font-extralight leading-relaxed ${light ? "text-white/85" : "text-fc-secondary"} ${align === "center" ? "mx-auto" : ""}`}
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          {lead}
        </Reveal>
      )}
    </header>
  );
}
