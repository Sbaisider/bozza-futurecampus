/**
 * Titolo hero: Montserrat Black + Graduate (brand system).
 */
export function HeroBrandCenter() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
      <h1 className="max-w-5xl text-center text-balance text-fc-white [text-shadow:0_2px_28px_rgba(7,8,8,0.45),0_1px_2px_rgba(7,8,8,0.35)]">
        <span
          className="block text-3xl font-black uppercase tracking-[0.06em] sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
        >
          Future Campus
        </span>
        <span
          className="mt-1 block text-2xl font-normal uppercase tracking-[0.05em] sm:mt-1.5 sm:text-3xl md:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-graduate), ui-serif, serif" }}
        >
          Fabriano
        </span>
      </h1>
    </div>
  );
}
