import { heroColumnDefinitions } from "./hero-column-config";
import {
  HERO_COLUMN_SEGMENT_COUNT,
  segmentUrlsForColumn,
} from "./hero-column-segments";
import { HeroColumnsLayer, type HeroColumnWithSegments } from "./HeroColumnsLayer";

function withSegmentSources(
  images: string[],
): HeroColumnWithSegments[] {
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
 * Cinque layer + sequenze foto per colonna (nessuna ripetizione nello stesso blocco, se possibile).
 */
export function HeroColumnsStack({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  const columns = withSegmentSources(images);
  const deep = columns.filter((c) => c.layer === "deep");
  const rear = columns.filter((c) => c.layer === "rear");
  const mid = columns.filter((c) => c.layer === "mid");
  const front = columns.filter((c) => c.layer === "front");
  const near = columns.filter((c) => c.layer === "near");

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="max-lg:hidden">
        <HeroColumnsLayer layer="deep" columns={deep} />
      </div>
      <div className="max-md:hidden">
        <HeroColumnsLayer layer="rear" columns={rear} />
      </div>
      <HeroColumnsLayer layer="mid" columns={mid} />
      <HeroColumnsLayer layer="front" columns={front} />
      <HeroColumnsLayer layer="near" columns={near} />
    </div>
  );
}
