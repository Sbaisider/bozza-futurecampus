import type { Metadata } from "next";

import { PageShell } from "@/components/site/PageShell";

const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export const metadata: Metadata = {
  title: "Social",
  description:
    "Seguici sui canali social ufficiali di Future Campus Fabriano e Confindustria Fabriano.",
};

export default function SocialPage() {
  return (
    <PageShell>
      <section className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center bg-fc-primary text-fc-white md:min-h-[calc(100dvh-4rem)]">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 md:py-32">
          <h1
            className="text-center text-[44px] font-black uppercase tracking-[0.18em] text-fc-white md:text-[88px] md:tracking-[0.22em]"
            style={FONT_DISPLAY}
          >
            Social
          </h1>

          <div className="mt-14 flex items-center justify-center gap-12 md:mt-20 md:gap-20">
            <a
              href="https://www.facebook.com/ConfindustriaFABRIANO/?locale=it_IT"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook — Confindustria Fabriano"
              className="text-fc-white transition-transform duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-20 w-20 md:h-28 md:w-28"
                aria-hidden="true"
              >
                <path d="M13.5 21v-7.5h2.52l.38-2.93H13.5V8.7c0-.85.24-1.43 1.46-1.43h1.56V4.65c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.81 1.38-3.81 3.91v2.18H7.9v2.93h2.52V21h3.08z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/futurecampusfabriano/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — Future Campus Fabriano"
              className="text-fc-white transition-transform duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-20 w-20 md:h-28 md:w-28"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
