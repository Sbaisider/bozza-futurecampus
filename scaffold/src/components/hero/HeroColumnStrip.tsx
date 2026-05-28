import Image from "next/image";

import type { HeroColumnDirection } from "./hero-column-config";

import {
  HERO_COLUMN_IMAGE_QUALITY,
  HERO_COLUMN_IMAGE_SIZES,
} from "./hero-column-image";
import { HERO_COLUMN_SEGMENT_COUNT } from "./hero-column-segments";

type HeroColumnStripProps = {
  segmentSrcs: string[];
  blurPx: number;
  direction: HeroColumnDirection;
  durationSec: number;
  animationDelaySec: number;
  rotateClass: string;
  visibilityClass: string;
};

const SEGMENT_HEIGHT_PX = 150;
const GAP_PX = 11;

type MarqueeHalfProps = {
  segmentSrcs: string[];
  blurPx: number;
  /** Carica con priorità la prima foto (LCP candidate above-the-fold). */
  priorityFirst?: boolean;
};

function MarqueeHalf({ segmentSrcs, blurPx, priorityFirst = false }: MarqueeHalfProps) {
  const blur =
    blurPx > 0
      ? `blur(${blurPx}px) saturate(0.88) contrast(0.96) brightness(1.02)`
      : `saturate(0.88) contrast(0.96) brightness(1.02)`;

  return (
    <div className="flex w-full shrink-0 flex-col">
      {segmentSrcs.map((src, i) => {
        const isLcpCandidate = priorityFirst && i === 0;
        return (
          <div
            key={`${src}-${i}`}
            className="relative h-[198px] w-full shrink-0 overflow-hidden md:h-[150px]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes={HERO_COLUMN_IMAGE_SIZES}
              quality={HERO_COLUMN_IMAGE_QUALITY}
              className="object-cover max-md:scale-[1.05] md:scale-100"
              draggable={false}
              {...(isLcpCandidate
                ? { priority: true }
                : { loading: "lazy" as const, fetchPriority: "low" as const })}
              style={{
                filter: blur,
                transform: "scale(1.02)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Colonna verticale: due metà identiche (stessa sequenza di foto), loop senza scatto.
 */
export function HeroColumnStrip({
  segmentSrcs,
  blurPx,
  direction,
  durationSec,
  animationDelaySec,
  rotateClass,
  visibilityClass,
}: HeroColumnStripProps) {
  if (segmentSrcs.length !== HERO_COLUMN_SEGMENT_COUNT) {
    return null;
  }

  const marqueeClass =
    direction === "up" ? "fc-hero-marquee-up" : "fc-hero-marquee-down";

  return (
    <div
      className={`pointer-events-none relative h-[100svh] w-full min-w-0 max-w-full shrink-0 overflow-hidden ${visibilityClass} ${rotateClass}`}
    >
      <div
        className={`flex w-full flex-col will-change-transform [backface-visibility:hidden] ${marqueeClass}`}
        style={{
          animationDuration: `${durationSec}s`,
          animationDelay: `${animationDelaySec}s`,
        }}
      >
        <MarqueeHalf key="a" segmentSrcs={segmentSrcs} blurPx={blurPx} priorityFirst />
        <MarqueeHalf key="b" segmentSrcs={segmentSrcs} blurPx={blurPx} />
      </div>
    </div>
  );
}
