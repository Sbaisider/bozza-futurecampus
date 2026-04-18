import { getHeroFotoPaths } from "@/lib/get-hero-foto-paths";

import { HeroBackgroundGrid } from "./HeroBackgroundGrid";
import { HeroBrandCenter } from "./HeroBrandCenter";
import { HeroColumnsStack } from "./HeroColumnsStack";
import { HeroVignette } from "./HeroVignette";

/**
 * Hero fullscreen: colonne fotografiche a layer, griglia leggera, vignetta morbida ai bordi.
 */
export function HeroSection() {
  const images = getHeroFotoPaths();

  return (
    <section
      className="relative isolate h-[100svh] min-h-[100svh] w-full overflow-hidden bg-fc-primary"
      aria-label="Future Campus Fabriano"
    >
      <HeroColumnsStack images={images} />
      <HeroVignette />
      <HeroBackgroundGrid />
      <HeroBrandCenter />
    </section>
  );
}
