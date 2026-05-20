import { perchéEsiste, quandoSiSvolge, siteInfo } from "@/content/info";

const FONT_BODY = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

export function HomeQuandoSection() {
  return (
    <section className="relative z-10 bg-fc-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Quando */}
          <div>
            <p className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-primary" style={FONT_BODY}>
              Quando si svolge
            </p>
            <h2 className="mt-4 max-w-[20ch] text-2xl font-black leading-tight tracking-tight text-fc-dark md:text-3xl" style={FONT_DISPLAY}>
              {siteInfo.periodoCorrente}
            </h2>
            <p className="mt-5 text-[15px] font-extralight leading-relaxed text-fc-secondary" style={FONT_BODY}>
              {quandoSiSvolge.periodo} {quandoSiSvolge.dettaglio}
            </p>
            <p className="mt-3 text-[13px] font-extralight leading-relaxed text-fc-secondary" style={FONT_BODY}>
              {quandoSiSvolge.edizione2026}
            </p>

            <div className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-fc-soft/70 bg-fc-light px-5 py-4">
              <span className="text-[10px] font-extralight uppercase tracking-[0.28em] text-fc-accent" style={FONT_BODY}>
                {siteInfo.edizioneNumero}
              </span>
              <span className="h-3.5 w-px bg-fc-soft" aria-hidden />
              <span className="text-[13px] font-extralight tracking-wide text-fc-dark" style={FONT_BODY}>
                Iscrizioni aperte
              </span>
            </div>
          </div>

          {/* Perché esiste */}
          <div className="rounded-2xl bg-fc-primary p-7 text-white md:p-10">
            <p className="text-[10px] font-extralight uppercase tracking-[0.42em] text-fc-accent" style={FONT_BODY}>
              Perché esiste
            </p>
            <h3 className="mt-4 max-w-[22ch] text-xl font-black leading-tight tracking-tight md:text-2xl" style={FONT_DISPLAY}>
              {perchéEsiste.lead}
            </h3>
            <div className="mt-5 space-y-4 text-[14px] font-extralight leading-relaxed text-white/88" style={FONT_BODY}>
              {perchéEsiste.paragrafi.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
