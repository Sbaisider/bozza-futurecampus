import { Reveal, RevealWords } from "@/components/site/Reveal";
import { siteInfo } from "@/content/info";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * Manifesto: prima sezione dopo la hero, frase grande editoriale.
 * Tantissimo whitespace, nessun decoro. Setta il tono "premium" della home.
 */
export function HomeManifestoSection() {
  return (
    <section className="relative z-10 bg-fc-white">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28 md:px-8 md:py-36 lg:py-44">
        <RevealWords
          as="h2"
          text={siteInfo.claim}
          className="max-w-[18ch] text-balance text-[1.75rem] font-black leading-[1.08] tracking-tight text-fc-dark sm:text-[2.25rem] md:text-[3.25rem] lg:text-[3.75rem]"
          style={FONT_DISPLAY}
        />
        <Reveal
          as="p"
          delay={420}
          className="mt-6 max-w-2xl text-[15px] font-extralight leading-[1.7] text-fc-secondary sm:mt-8 sm:text-[16px] md:text-[18px]"
          style={FONT_BODY}
        >
          {siteInfo.sottoclaim}
        </Reveal>
      </div>
    </section>
  );
}
