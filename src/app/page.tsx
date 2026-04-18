import { HomeExperience } from "@/components/home/HomeExperience";
import { getHeroFotoPaths } from "@/lib/get-hero-foto-paths";

export default function Home() {
  const heroImages = getHeroFotoPaths();

  return (
    <main className="flex min-h-full flex-1 flex-col">
      <HomeExperience heroImages={heroImages} />
    </main>
  );
}
