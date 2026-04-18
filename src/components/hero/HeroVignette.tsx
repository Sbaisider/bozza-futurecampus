/**
 * Leggera vignetta ai bordi (niente “buco” centrale: niente logo/lettering da proteggere).
 */
export function HeroVignette() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        background: `
          radial-gradient(
            ellipse 95% 95% at 50% 50%,
            transparent 55%,
            rgba(7, 8, 8, 0.12) 100%
          )
        `,
      }}
      aria-hidden
    />
  );
}
