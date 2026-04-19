import { HomeExperience } from "@/components/home/HomeExperience";
import { getHeroFotoPaths } from "@/lib/get-hero-foto-paths";
import { getPublicVideoPaths } from "@/lib/get-public-video-paths";
import { pickHomeMedia } from "@/lib/home-media-picks";

export default function Home() {
  const heroImages = getHeroFotoPaths();
  const videos = getPublicVideoPaths();
  const media = pickHomeMedia(heroImages, videos);

  return (
    <main className="flex min-h-full flex-1 flex-col">
      <HomeExperience heroImages={heroImages} media={media} />
    </main>
  );
}
