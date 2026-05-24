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
      <div className="mx-auto max-w-5xl px-5 py-28 md:px-8 md:py-36 lg:py-44">
        <h2
          className="max-w-[18ch] text-balance text-[2rem] font-black leading-[1.05] tracking-tight text-fc-dark sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem]"
          style={FONT_DISPLAY}
        >
          {siteInfo.claim}
        </h2>
        <p
          className="mt-8 max-w-2xl text-[16px] font-extralight leading-[1.7] text-fc-secondary md:text-[18px]"
          style={FONT_BODY}
        >
          {siteInfo.sottoclaim}
        </p>
      </div>
    </section>
  );
}
