# Roadmap — Future Campus Fabriano

Stato del sito, cosa è stato fatto, cosa resta. Aggiornare quando si conclude/avvia un blocco.

Ultimo aggiornamento: 25 maggio 2026.

---

## ✅ Fatto

### Blog → Sanity CMS (live)
- Progetto Sanity `kgdcsa4h` su dataset `production` (Public), Studio embeddato a `/studio`.
- Schema `Articolo`: titolo, slug, sommario, data, categoria (4 opzioni), copertina con hotspot, corpo PortableText (h2/h3, citazioni, liste, link, immagini inline), autore opzionale.
- Renderer `ArticoloBody` per il PortableText con stile coerente del sito.
- Pagine `/blog` e `/blog/[slug]` leggono via GROQ (ISR 60s) con immagini servite dal CDN `cdn.sanity.io` (resize automatico WebP/AVIF).
- 4 articoli iniziali migrati via script (`scripts/import-articoli.mjs`) — visibili sia su `/studio` sia su `/blog`.
- Guida operativa in [`docs/sanity-setup.md`](./sanity-setup.md).
- `src/content/articoli.ts` non più referenziato → orfano da cancellare.

### Hero editorial (home)
- Fascia bianca centrale full-width al ~50%; lettering `FUTURE / CAMPUS / FABRIANO` renderizzato 3 volte con `clip-path` in % della hero (bianco fuori dalla fascia, blu primario dentro).
- `viewBox` del lettering tarato per centrare visivamente la parola `CAMPUS` sull'asse della fascia.
- Foto di sfondo: 4 colonne verticali in marquee con direzioni alternate ↓↑↓↑, blur 4px, opacity 1, niente gap né rotazioni — muro pieno di foto senza sfondo blu visibile.
- Scroll nativo: hero `relative h-[100svh]` che scorre via naturalmente; nessun pin GSAP, nessun wheel-hijack.

### Navbar
- Logo emblema `fcf-emblem.png` (convertito da PDF) + lettering Manrope a fianco.
- Appare via fade+slide CSS appena scrolli oltre 48px (≈ la sua altezza).
- Link attivi: Edizioni · Blog · Contatti (rimossi Sponsor, Unisciti, FAQ).
- Mobile: bottone CTA "Contattaci" (era "Iscriviti", aggiornato).

### Sezioni home (ordine attuale)
1. **Hero**
2. **Manifesto** — claim grande Montserrat Black + sottoclaim Manrope ("…del territorio di Fabriano e dintorni"), niente eyebrow.
3. **Esperienza** — timeline orizzontale (4 nodi con linea bianca, scritte bianche, niente numeretti né descrizione introduttiva) su sfondo foto blurata + patina blu primary + zoom continuo lento (`fc-crescita-bg-zoom`).
4. **Padri Fondatori** — 3 card sobrie (Micozzi, Capriotti, Merloni) su `bg-fc-light`.
5. **Edizioni passate** — 4 card 2022→2025 attaccate (`gap-0`), solo l'anno bianco in basso. Foto blurate di default; al hover transizione fluida 1.5s (filter) + 4.5s (transform) verso sharp + zoom 1.14× (classe `.fc-edizione-image` in `globals.css`).
6. **CTA finale** — sfondo blu pieno, claim "Vuoi avere più informazioni riguardo il campus?" + un solo bottone "Contattaci".
7. **Footer** — `LetteringMark` inline al posto del logo PNG, 2 colonne (Sito + Contatti), niente più paragrafo Confindustria, niente partner né link `/sponsor` / `/unisciti` / `/faq`.

### Pagina `/edizioni`
- Hero con lead "Dal 2022 a oggi, ogni edizione del Future Campus ha aggiunto un capitolo nuovo…".
- 5 card edizioni a tutta larghezza (`md:grid-cols-5`), stesso pattern della home: `.fc-edizione-image` con blur default + hover sharp/zoom, solo l'anno bianco overlay.

### Pulizia
- Rimosso GSAP scroll-hijack, pin, wheel/touch handler, mobile reverse-gate.
- Rimosse dalla home: sezioni Numeri, Edizione 2026, Partner/Sponsor, Chi siamo, Crescita, Quando, Vita, Anteprima Edizioni.
- Rimossa la voce "Sponsor" da navbar e footer.
- Rimosse pagine `/unisciti` e `/faq` da navbar e footer (le route file restano da cancellare).

---

## 🚧 Da fare (prima del go-live)

- **Cancellare file/cartelle orfane** che il sandbox non ha potuto rimuovere:
  - **Pagine non più linkate** (rimosse da navbar + footer):
    - `src/app/sponsor/`
    - `src/app/unisciti/`
    - `src/app/faq/`
    - `src/content/sponsor.ts`
    - `src/content/faq.ts`
    - `src/content/articoli.ts` (sostituito da Sanity)
  - **Sezioni home orfane** (sostituite dal redesign):
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
  - **Hero + GSAP residui**:
    - `src/components/home/useHomeHeroScroll.ts`
    - `src/components/home/home-hero-scroll-config.ts`
    - `src/components/hero/HeroBrandCenter.tsx`
- **Revocare il `SANITY_API_WRITE_TOKEN`** da Sanity Manage (lo script di import è già stato lanciato, il token non serve più). API → Tokens → cestino accanto a "Import articoli".
- **Configurare Resend** (`.env.local` con `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO_CONTATTI`) per attivare l'invio del form contatti.
- **Disinstallare `gsap`** se non serve più nemmeno per le pagine interne: `pnpm remove gsap`.
- **Pagina `/contatti`** — verificare estetica coerente col redesign (è l'unica pagina interna ancora "vecchia").
- **Pagina `/edizioni/[slug]`** — controllare allineamento al nuovo design.
- **SEO** — metadati e Open Graph dedicati per home, `/edizioni`, `/blog`.
- **Mobile QA** — la hero "muro di foto" + la timeline orizzontale funzionano bene su mobile? Test su iPhone reale.
- **CORS produzione** — quando il sito andrà online, aggiungere il dominio (`https://futurecampusfabriano.it`) alla whitelist CORS di Sanity (Manage → API → CORS origins).

---

## 💡 Idee future

- **Webhook Sanity → Vercel** per invalidare la cache ISR immediatamente al "Publish" (oggi attende max 60s). Setup ~5 min su Vercel.
- **Sanity Presentation** (preview live degli articoli prima della pubblicazione) — utile se cresce la redazione.
- **Slideshow crossfade** come pattern alternativo per la hero (scartato a favore del collage attuale).
- **Animazione di scroll-reveal** (Intersection Observer) sui nodi della timeline esperienza.
- **Sezione "Voci dei ragazzi"** con quote brevi (1 frase + nome) — pattern editoriale coerente col tono attuale.
- **Dark mode opzionale** (palette già `fc-dark`/`fc-light`, costo basso).
- **Newsletter** — campo email nel footer per chi vuole essere avvisato delle nuove edizioni.
