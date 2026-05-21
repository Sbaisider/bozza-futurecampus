/**
 * Griglia leggerissima sullo sfondo: struttura senza protagonismo.
 */
export function HeroBackgroundGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[25]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}
      aria-hidden
    />
  );
}
