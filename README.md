# Future Campus Fabriano — Sito web

Sito ufficiale del Future Campus Fabriano, marchio di Confindustria Ancona — Comitato Territoriale Fabriano. Progetto Next.js 16 + React 19 + Tailwind 4.

## Struttura

```
/                       Home (media-first, con scroll GSAP)
/edizioni               Archivio annuale
/edizioni/[anno]        Dettaglio singola edizione
/blog                   Indice articoli
/blog/[slug]            Articolo
/unisciti               Iscrizione al Campus + form
/sponsor                Partner e sostenitori
/contatti               Email + form contatto
/faq                    Domande frequenti
```

## Avvio locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000.

## Contenuti

I contenuti del sito vivono in `src/content/`:

- `info.ts` — istituzionale, padri fondatori, perché esiste
- `edizioni.ts` — archivio annuale con gallery e partner
- `articoli.ts` — articoli del blog
- `sponsor.ts` — partner divisi per categoria
- `faq.ts` — domande frequenti per argomento
- `contatti.ts` — email pubblica e configurazione destinazione

Per pubblicare una nuova edizione o un articolo basta aggiungere un oggetto all'array corrispondente.

Le foto vanno caricate in `/public/foto/` e referenziate per path (es. `"/foto/8505.JPG"`).

## Email — configurazione Resend

I form di iscrizione e contatto inviano le email tramite [Resend](https://resend.com).

1. Crea un account su https://resend.com
2. Verifica il dominio `futurecampusfabriano.it` (sezione Domains)
3. Genera una API key (sezione API Keys)
4. Copia `.env.example` in `.env.local` e compila:

```
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=Future Campus <no-reply@futurecampusfabriano.it>
EMAIL_TO_ISCRIZIONI=iscrizioni@futurecampusfabriano.it
EMAIL_TO_CONTATTI=info@futurecampusfabriano.it
```

Finché le variabili non sono impostate, i form funzionano graficamente ma stampano il payload in console (modalità sviluppo, nessun invio reale).

## Brand system

I colori, font e direzione stilistica sono documentati in `docs/future-campus-brand-system.md`.

## Build di produzione

```bash
npm run build
npm start
```
