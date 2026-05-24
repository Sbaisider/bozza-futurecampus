# Roadmap — Future Campus Fabriano

Stato del sito, cosa è stato fatto, cosa resta. Aggiornare quando si conclude/avvia un blocco.

---

## ✅ Fatto

### Hero editorial (home)
- Fascia bianca centrale full-width al ~50%; lettering `FUTURE / CAMPUS / FABRIANO` renderizzato 3 volte con `clip-path` in % della hero (bianco fuori dalla fascia, blu primario dentro).
- `viewBox` del lettering tarato per centrare visivamente la parola `CAMPUS` sull'asse della fascia.
- Foto di sfondo: 4 colonne verticali in marquee con direzioni alternate ↓↑↓↑, blur 4px (copre la sgranatura delle 200px originali), niente gap né rotazioni — muro pieno di foto.
- Scroll nativo: hero `relative h-[100svh]` che scorre via naturalmente; nessun pin GSAP, nessun wheel-hijack.

### Navbar
- Logo emblema `fcf-emblem.png` (convertito da PDF) + lettering Manrope a fianco.
- Appare via fade+slide CSS quando lo scroll passa il 90% della hero (scroll listener leggero con `requestAnimationFrame`).

### Sezioni home (ordine attuale)
1. **Hero**
2. **Manifesto** — claim grande Montserrat Black + sottoclaim Manrope, niente eyebrow.
3. **Esperienza** — timeline orizzontale (4 nodi con linea bianca, scritte bianche) su sfondo foto blurata + patina blu primary + zoom continuo lento (`fc-crescita-bg-zoom`).
4. **Edizioni passate** — 4 card 2022→2025 attaccate (`gap-0`), solo l'anno bianco in basso. Foto blurate di default; al hover transizione fluida 1.5s (filter) + 4.5s (transform) verso sharp + zoom 1.14× (classe `.fc-edizione-image` in `globals.css`).
5. **CTA finale** — sfondo blu pieno, claim "Vuoi avere più informazioni riguardo il campus?" + un solo bottone "Contattaci".
6. **Footer** — `LetteringMark` inline al posto del logo PNG, 2 colonne (Sito + Contatti), niente più partner né link `/sponsor`.

### Pagina `/edizioni`
- Hero con lead aggiornato ("Dal 2022 a oggi, ogni edizione…").
- Card identiche alla home (`.fc-edizione-image`, solo anno, attaccate).

### Pulizia
- Rimosso GSAP scroll-hijack, pin, wheel/touch handler, mobile reverse-gate.
- Rimosse dalla home: sezioni Numeri, Edizione 2026, Partner/Sponsor, Chi siamo, Crescita, Quando, Vita, Anteprima Edizioni.
- Rimossa la voce "Sponsor" da navbar e footer.

---

## 🚧 Da fare (prima del go-live)

- **Cancellare file orfani** che il sandbox non ha potuto rimuovere:
  - `src/app/sponsor/page.tsx`
  - `src/content/sponsor.ts`
  - `src/components/home/sections/HomeChiSiamoSection.tsx`
  - `src/components/home/sections/HomeCrescitaSection.tsx`
  - `src/components/home/sections/HomeQuandoSection.tsx`
  - `src/components/home/sections/HomeVitaSection.tsx`
  - `src/components/home/sections/HomeAnteprimaEdizioniSection.tsx`
  - `src/components/home/sections/HomePartnerSection.tsx`
  - `src/components/home/sections/HomePartnerSponsorSection.tsx`
  - `src/components/home/sections/HomeSponsorMiniSection.tsx`
  - `src/components/home/sections/HomeNumeriSection.tsx`
  - `src/components/home/sections/HomeEdizione2026Section.tsx`
  - `src/components/home/useHomeHeroScroll.ts`
  - `src/components/home/home-hero-scroll-config.ts`
  - `src/components/hero/HeroBrandCenter.tsx`
- **Configurare Resend** (`.env.local` con `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO_*`) per attivare l'invio dei form `unisciti` e `contatti`.
- **Disinstallare `gsap`** se non serve più nemmeno per le pagine interne: `pnpm remove gsap`.
- **Pagine interne** — verificare estetica coerente col redesign home (`/blog`, `/contatti`, `/faq`, `/unisciti`, `/edizioni/[slug]`).
- **SEO** — metadati e Open Graph dedicati per home ed `/edizioni`.
- **Mobile QA** — la hero "muro di foto" funziona bene su mobile? Provare su iPhone reale.

---

## 💡 Idee future

- Slideshow crossfade come pattern alternativo per la hero (lasciato come opzione scartata nel turno di redesign, ma documentato).
- Pagina dedicata "Manifesto" se il claim cresce in importanza.
- Animazione di scroll-reveal (intersection observer) sui nodi della timeline esperienza.
- Sezione "Voci dei ragazzi" con quote brevi (1 frase + nome) — pattern editoriale che si sposa col tono attuale.
- Dark mode opzionale (palette già fc-dark/fc-light, costo basso).
