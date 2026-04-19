import Image from "next/image";

/**
 * Titolo hero: lettering brand (`/public/brand/lettering.png`).
 * Il wrapper con ref e transform-origin è in HeroSection (zoom dal centro del testo).
 */
export function HeroBrandCenter() {
  return (
    <h1 className="max-w-5xl text-balance">
      <Image
        src="/brand/lettering.png"
        alt="Future Campus Fabriano"
        width={552}
        height={241}
        priority
        className="-translate-x-1.5 h-auto w-full max-w-[min(100%,36rem)] sm:max-w-[min(100%,42rem)] md:max-w-[min(100%,48rem)] lg:max-w-[min(100%,56rem)]"
      />
    </h1>
  );
}
