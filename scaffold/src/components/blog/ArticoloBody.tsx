import Image from "next/image";
import Link from "next/link";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * Renderer del corpo dell'articolo (Portable Text di Sanity).
 * Mappa i blocchi Sanity ai tag HTML/JSX con lo stile del sito:
 *  - paragrafi, h2, h3, citazioni
 *  - liste puntate e numerate
 *  - grassetto, corsivo, link (interni/esterni)
 *  - immagini inline (CDN Sanity con next/image)
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[16px] font-extralight leading-[1.8] text-fc-dark md:text-[18px]" style={FONT_BODY}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="mt-10 text-[1.5rem] font-black leading-tight tracking-tight text-fc-dark md:text-[1.85rem]"
        style={FONT_DISPLAY}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-8 text-[1.2rem] font-black leading-tight tracking-tight text-fc-primary md:text-[1.4rem]"
        style={FONT_DISPLAY}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 border-l-2 border-fc-accent pl-6 text-[18px] font-extralight italic leading-[1.6] text-fc-secondary md:text-[20px]"
        style={FONT_BODY}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="ml-5 list-disc space-y-2 text-[16px] font-extralight leading-[1.7] text-fc-dark md:text-[17px]"
        style={FONT_BODY}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="ml-5 list-decimal space-y-2 text-[16px] font-extralight leading-[1.7] text-fc-dark md:text-[17px]"
        style={FONT_BODY}
      >
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-black text-fc-dark">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fc-primary underline decoration-fc-soft underline-offset-4 transition-colors hover:text-fc-accent"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-fc-primary underline decoration-fc-soft underline-offset-4 transition-colors hover:text-fc-accent"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const alt = value.alt ?? "";
      const caption = value.caption as string | undefined;
      const src = urlFor(value).width(1600).fit("max").url();
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-fc-soft/40">
            <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
          </div>
          {caption ? (
            <figcaption
              className="mt-3 text-[12.5px] font-extralight tracking-wide text-fc-secondary"
              style={FONT_BODY}
            >
              {caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function ArticoloBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
