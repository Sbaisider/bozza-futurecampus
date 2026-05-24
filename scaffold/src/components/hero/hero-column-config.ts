export type HeroLayerId = "near";

export type HeroColumnDirection = "up" | "down";

export type HeroRotateDeg = 0;

export interface HeroColumnDefinition {
  id: string;
  layer: HeroLayerId;
  rotateDeg: HeroRotateDeg;
  durationSec: number;
  direction: HeroColumnDirection;
  animationDelaySec: number;
  hideBelow?: "lg" | "md";
}

/**
 * Pattern hero ottimizzato (era: 30 colonne × 5 layer con rotazioni).
 * Ora: 4 colonne, 1 solo layer, niente rotazioni, niente blur, gap visibili,
 * direzioni alternate ↓↑↓↑ per dare sensazione di parallax pacato.
 * Velocità leggermente diverse (60–78s) per evitare sincronismo robotico.
 *
 * Su < md mostriamo solo 2 colonne centrali (le altre `hideBelow: "md"`)
 * così su mobile l'effetto rimane leggibile invece di affollarsi.
 */
export const heroColumnDefinitions: HeroColumnDefinition[] = [
  {
    id: "c1",
    layer: "near",
    rotateDeg: 0,
    durationSec: 72,
    direction: "down",
    animationDelaySec: 0,
    hideBelow: "md",
  },
  {
    id: "c2",
    layer: "near",
    rotateDeg: 0,
    durationSec: 60,
    direction: "up",
    animationDelaySec: -8,
  },
  {
    id: "c3",
    layer: "near",
    rotateDeg: 0,
    durationSec: 68,
    direction: "down",
    animationDelaySec: -4,
  },
  {
    id: "c4",
    layer: "near",
    rotateDeg: 0,
    durationSec: 78,
    direction: "up",
    animationDelaySec: -12,
    hideBelow: "md",
  },
];

/** Niente rotazioni: il pattern è "calmo", coerente con il brief minimal/premium. */
export function columnRotateClass(_deg: HeroRotateDeg): string {
  return "rotate-0";
}

export function columnVisibilityClass(hideBelow?: "lg" | "md"): string {
  if (hideBelow === "md") return "hidden md:flex";
  if (hideBelow === "lg") return "hidden lg:flex";
  return "flex";
}
