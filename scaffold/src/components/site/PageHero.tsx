import type { ReactNode } from "react";
import Image from "next/image";

import { Reveal } from "@/components/site/Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  imageSrc?: string; // path /foto/...
  imageAlt?: string;
  align?: "left" | "center";
  /** Vairante più compatta */
  compact?: boolean;
  children?: ReactNode;
};

/**
 * Hero condiviso per le pagine interne.
 * Se imageSrc è fornito, lo usa come sfondo con overlay blu del brand.
 * Altrimenti renderizza un hero pulito su sfondo chiaro.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  imageSrc,
  imageAlt = "",
  align = "left",
  compact = false,
  children,
}: PageHeroProps) {
  const hasImage = Boolean(imageSrc);
  const heightClass = compact
    ? "min-h-[44vh] md:min-h-[52vh]"
    : "min-h-[58vh] md:min-h-[70vh]";

  return (
    <section
      className={`relative ${heightClass} overflow-hidden ${hasImage ? "text-white" : "bg-fc-light text-fc-dark"}`}
    >
      {hasImage && imageSrc && (
        <>
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-fc-primary/88 via-fc-primary/55 to-[#0a1628]/92" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
        </>
      )}

      <div
        className={`relative z-10 mx-auto flex ${heightClass} max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32 ${align === "center" ? "items-center text-center" : ""}`}
      >
        {eyebrow && (
          <Reveal
            as="p"
            className={`text-[10px] font-extralight uppercase tracking-[0.42em] ${hasImage ? "text-fc-accent" : "text-fc-primary"}`}
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            {eyebrow}
          </Reveal>
        )}
        <Reveal
          as="h1"
          delay={eyebrow ? 140 : 0}
          className={`${eyebrow ? "mt-4" : ""} max-w-[22ch] text-pretty text-3xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem] ${align === "center" ? "mx-auto" : ""}`}
          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
        >
          {title}
        </Reveal>
        {lead && (
          <Reveal
            as="p"
            delay={(eyebrow ? 140 : 0) + 220}
            className={`mt-6 max-w-2xl text-base font-extralight leading-relaxed ${hasImage ? "text-white/90" : "text-fc-secondary"} ${align === "center" ? "mx-auto" : ""}`}
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            {lead}
          </Reveal>
        )}
        {children && (
          <Reveal delay={(eyebrow ? 140 : 0) + (lead ? 380 : 220)} className="mt-8">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
