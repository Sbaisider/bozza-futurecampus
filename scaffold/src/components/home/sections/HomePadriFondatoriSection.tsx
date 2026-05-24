import { padriFondatori } from "@/content/info";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/**
 * Padri fondatori — sezione minimal su fondo light.
 * Header sobrio, 3 card senza ombre/bordi pesanti.
 */
export function HomePadriFondatoriSection() {
  return (
    <section className="relative z-10 bg-fc-light">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <h2
          className="max-w-[24ch] text-balance text-[1.85rem] font-black leading-[1.08] tracking-tight text-fc-dark sm:text-[2.25rem] md:text-[2.75rem]"
          style={FONT_DISPLAY}
        >
          Chi ha dato origine al Campus.
        </h2>

        <ul className="mt-16 grid gap-12 border-t border-fc-soft/50 pt-14 md:mt-20 md:grid-cols-3 md:gap-10 md:pt-16 lg:gap-14">
          {padriFondatori.map((p) => (
            <li key={p.nome} className="flex flex-col">
              <h3
                className="text-[20px] font-black leading-tight tracking-tight text-fc-primary md:text-[22px]"
                style={FONT_DISPLAY}
              >
                {p.nome}
              </h3>
              <p
                className="mt-2 text-[10px] font-extralight uppercase tracking-[0.28em] text-fc-accent"
                style={FONT_BODY}
              >
                {p.ruolo}
              </p>
              <p
                className="mt-5 text-[14.5px] font-extralight leading-[1.7] text-fc-secondary md:text-[15px]"
                style={FONT_BODY}
              >
                {p.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
