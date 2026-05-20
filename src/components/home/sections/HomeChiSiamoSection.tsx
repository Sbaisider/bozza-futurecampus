import { cosaEFutureCampus, padriFondatori } from "@/content/info";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export function HomeChiSiamoSection() {
  return (
    <section
      id="chi-siamo"
      className="relative z-10 scroll-mt-24 bg-fc-light"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        {/* Cos'è */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-primary" style={FONT_BODY}>
              Cos'è il Future Campus
            </p>
            <h2
              className="mt-4 max-w-[18ch] text-pretty text-2xl font-black leading-tight tracking-tight text-fc-dark md:text-3xl lg:text-[2.1rem]"
              style={FONT_DISPLAY}
            >
              Non una scuola: una sei-settimane di vita.
            </h2>
          </div>
          <div className="space-y-4 text-[15px] font-extralight leading-relaxed text-fc-dark md:text-[16px]" style={FONT_BODY}>
            {cosaEFutureCampus.long.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Padri fondatori */}
        <div className="mt-20 border-t border-fc-soft/60 pt-14 md:mt-24 md:pt-16">
          <p className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-primary" style={FONT_BODY}>
            Padri fondatori
          </p>
          <h3 className="mt-4 max-w-[28ch] text-2xl font-black leading-tight tracking-tight text-fc-dark md:text-3xl" style={FONT_DISPLAY}>
            Chi ha dato origine al Campus.
          </h3>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {padriFondatori.map((p) => (
              <li
                key={p.nome}
                className="rounded-2xl border border-fc-soft/60 bg-white p-6 transition hover:border-fc-primary/25"
              >
                <h4 className="text-[18px] font-black leading-snug tracking-tight text-fc-primary" style={FONT_DISPLAY}>
                  {p.nome}
                </h4>
                <p className="mt-1.5 text-[11px] font-extralight uppercase tracking-[0.22em] text-fc-accent" style={FONT_BODY}>
                  {p.ruolo}
                </p>
                <p className="mt-4 text-[13.5px] font-extralight leading-relaxed text-fc-secondary" style={FONT_BODY}>
                  {p.bio}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
