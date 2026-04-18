/** Segmenti verticali per colonna (deve combaciare con HeroColumnStrip). */
export const HERO_COLUMN_SEGMENT_COUNT = 6;

/**
 * Sceglie `count` URL per una colonna: tutti distinti se ci sono abbastanza foto;
 * con meno foto evita almeno ripetizioni consecutive.
 */
export function segmentUrlsForColumn(
  images: string[],
  columnGlobalIndex: number,
  count: number,
): string[] {
  const n = images.length;
  if (n === 0) return [];
  if (n === 1) return Array.from({ length: count }, () => images[0]!);

  const out: string[] = [];

  if (n >= count) {
    const start = (columnGlobalIndex * 11) % n;
    for (let k = 0; k < count; k++) {
      out.push(images[(start + k) % n]!);
    }
    return out;
  }

  let idx = columnGlobalIndex % n;
  for (let k = 0; k < count; k++) {
    let next = images[idx % n]!;
    if (out.length > 0 && next === out[out.length - 1]) {
      idx += 1;
      next = images[idx % n]!;
    }
    out.push(next);
    idx += 1;
  }
  return out;
}
