import { heroColumnDefinitions } from "./hero-column-config";
import {
  HERO_COLUMN_SEGMENT_COUNT,
  segmentUrlsForColumn,
} from "./hero-column-segments";
import { HeroColumnsLayer, type HeroColumnWithSegments } from "./HeroColumnsLayer";

function withSegmentSources(images: string[]): HeroColumnWithSegments[] {
  return heroColumnDefinitions.map((def, globalIndex) => ({
    ...def,
    segmentSrcs: segmentUrlsForColumn(
      images,
      globalIndex,
      HERO_COLUMN_SEGMENT_COUNT,
    ),
  }));
}

/**
 * Pattern hero ottimizzato: 4 colonne verticali in un unico layer nitido.
 * Foto in marquee con direzioni alternate (↓↑↓↑) e velocità diverse per
 * ottenere parallax pacato senza overlap caotico. Niente più 5 layer di
 * profondità sovrapposti con blur e rotazioni.
 */
export function HeroColumnsStack({ images }: { images: string[] }) {
  if (images.length === 0) return null;
  const columns = withSegmentSources(images);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <HeroColumnsLayer layer="near" columns={columns} />
    </div>
  );
}
