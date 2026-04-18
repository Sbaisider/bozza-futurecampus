import {
  columnRotateClass,
  columnVisibilityClass,
  type HeroColumnDefinition,
  type HeroLayerId,
} from "./hero-column-config";
import { HeroColumnStrip } from "./HeroColumnStrip";

const layerStyle: Record<
  HeroLayerId,
  { z: number; opacity: number; blurPx: number }
> = {
  deep: { z: 8, opacity: 0.48, blurPx: 10 },
  rear: { z: 9, opacity: 0.56, blurPx: 7 },
  mid: { z: 10, opacity: 0.66, blurPx: 4.5 },
  front: { z: 11, opacity: 0.78, blurPx: 3 },
  near: { z: 12, opacity: 0.88, blurPx: 1.75 },
};

export type HeroColumnWithSegments = HeroColumnDefinition & {
  segmentSrcs: string[];
};

type HeroColumnsLayerProps = {
  layer: HeroLayerId;
  columns: HeroColumnWithSegments[];
};

/**
 * Layer a griglia su tutta la larghezza: ogni colonna occupa una frazione uguale dello schermo.
 */
export function HeroColumnsLayer({ layer, columns }: HeroColumnsLayerProps) {
  const { z, opacity, blurPx } = layerStyle[layer];
  const n = columns.length;

  return (
    <div
      className="pointer-events-none absolute inset-0 grid h-full w-full px-px md:px-[2px]"
      style={{
        zIndex: z,
        opacity,
        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        columnGap: "1px",
      }}
    >
      {columns.map((col) => (
        <div key={col.id} className="relative flex min-w-0 items-stretch">
          <HeroColumnStrip
            segmentSrcs={col.segmentSrcs}
            blurPx={blurPx}
            direction={col.direction}
            durationSec={col.durationSec}
            animationDelaySec={col.animationDelaySec}
            rotateClass={columnRotateClass(col.rotateDeg)}
            visibilityClass={columnVisibilityClass(col.hideBelow)}
          />
        </div>
      ))}
    </div>
  );
}
