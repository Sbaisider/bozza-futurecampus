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
};

function MarqueeHalf({ segmentSrcs, blurPx }: MarqueeHalfProps) {
  const blur =
    blurPx > 0
      ? `blur(${blurPx}px) saturate(0.88) contrast(0.96) brightness(1.02)`
      : `saturate(0.88) contrast(0.96) brightness(1.02)`;

  return (
    <div
      className="flex w-full shrink-0 flex-col"
      style={{ gap: `${GAP_PX}px` }}
    >
      {segmentSrcs.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative w-full shrink-0 overflow-hidden rounded-[2px]"
          style={{ height: `${SEGMENT_HEIGHT_PX}px` }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={HERO_COLUMN_IMAGE_SIZES}
            quality={HERO_COLUMN_IMAGE_QUALITY}
            className="object-cover"
            draggable={false}
            loading="lazy"
            fetchPriority="low"
            style={{
              filter: blur,
              transform: "scale(1.02)",
            }}
          />
        </div>
      ))}
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
      className={`pointer-events-none relative h-[100svh] w-full min-w-0 max-w-full shrink-0 overflow-hidden rounded-[1px] ${visibilityClass} ${rotateClass}`}
    >
      <div
        className={`flex w-full flex-col will-change-transform [backface-visibility:hidden] ${marqueeClass}`}
        style={{
          animationDuration: `${durationSec}s`,
          animationDelay: `${animationDelaySec}s`,
        }}
      >
        <MarqueeHalf key="a" segmentSrcs={segmentSrcs} blurPx={blurPx} />
        <MarqueeHalf key="b" segmentSrcs={segmentSrcs} blurPx={blurPx} />
      </div>
    </div>
  );
}
