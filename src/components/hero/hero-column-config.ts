export type HeroLayerId = "deep" | "rear" | "mid" | "front" | "near";

export type HeroColumnDirection = "up" | "down";

export type HeroRotateDeg = -8 | -4 | 0 | 4 | 8;

export interface HeroColumnDefinition {
  id: string;
  layer: HeroLayerId;
  rotateDeg: HeroRotateDeg;
  durationSec: number;
  direction: HeroColumnDirection;
  animationDelaySec: number;
  hideBelow?: "lg" | "md";
}

const ROT: HeroRotateDeg[] = [-4, 4, 0, -8, 8, -4, 0, 4];

function layerBaseDuration(layer: HeroLayerId): number {
  switch (layer) {
    case "deep":
      return 104;
    case "rear":
      return 92;
    case "mid":
      return 76;
    case "front":
      return 62;
    case "near":
      return 52;
    default:
      return 80;
  }
}

function col(
  id: string,
  layer: HeroLayerId,
  globalI: number,
  hideBelow?: "lg" | "md",
): HeroColumnDefinition {
  return {
    id,
    layer,
    rotateDeg: ROT[globalI % ROT.length]!,
    durationSec: layerBaseDuration(layer) + (globalI % 5) * 5,
    direction: globalI % 2 === 0 ? "up" : "down",
    animationDelaySec: -(globalI * 5),
    hideBelow,
  };
}

const LAYERS: HeroLayerId[] = ["deep", "rear", "mid", "front", "near"];

/** 30 colonne (6 per layer) su 5 layer — profondità più ricca */
export const heroColumnDefinitions: HeroColumnDefinition[] = LAYERS.flatMap(
  (layer, li) =>
    Array.from({ length: 6 }, (_, i) => {
      const globalI = li * 6 + i;
      const hideBelow =
        layer === "mid" || layer === "front" || layer === "near"
          ? i >= 5
            ? "md"
            : undefined
          : i >= 4
            ? "md"
            : undefined;
      return col(`${layer[0]}${i + 1}`, layer, globalI, hideBelow);
    }),
);

const rotateClassMap: Record<HeroRotateDeg, string> = {
  "-8": "md:rotate-[-8deg]",
  "-4": "md:rotate-[-4deg]",
  "0": "md:rotate-0",
  "4": "md:rotate-[4deg]",
  "8": "md:rotate-[8deg]",
};

export function columnRotateClass(deg: HeroRotateDeg): string {
  return `max-md:rotate-0 ${rotateClassMap[deg]}`;
}

export function columnVisibilityClass(hideBelow?: "lg" | "md"): string {
  if (hideBelow === "md") return "hidden md:flex";
  if (hideBelow === "lg") return "hidden lg:flex";
  return "flex";
}
