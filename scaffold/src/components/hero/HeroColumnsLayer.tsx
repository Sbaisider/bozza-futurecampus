import {
  columnRotateClass,
  columnVisibilityClass,
  type HeroColumnDefinition,
  type HeroLayerId,
} from "./hero-column-config";
import { HeroColumnStrip } from "./HeroColumnStrip";

/**
 * Layer hero ottimizzato.
 * - Niente più blur: foto nitide.
 * - Opacità alta (0.95) per restituire colore alle foto.
 * - Gap visibili tra colonne (8px desktop, 4px mobile).
 * - Tutte le colonne riempiono l'altezza del layer in modo uniforme.
 */
const layerStyle: Record<HeroLayerId, { z: number; opacity: number; blurPx: number }> = {
  near: { z: 1, opacity: 1, blurPx: 4 },
};

export type HeroColumnWithSegments = HeroColumnDefinition & {
  segmentSrcs: string[];
};

type HeroColumnsLayerProps = {
  layer: HeroLayerId;
  columns: HeroColumnWithSegments[];
};

export function HeroColumnsLayer({ layer, columns }: HeroColumnsLayerProps) {
  const { z, opacity, blurPx } = layerStyle[layer];
  const n = columns.length;

  return (
    <div
      className="pointer-events-none absolute inset-0 grid h-full w-full"
      style={{
        zIndex: z,
        opacity,
        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        columnGap: "0px",
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
