# Future Campus Fabriano — Sito web

Sito ufficiale del Future Campus Fabriano, marchio di Confindustria Ancona — Comitato Territoriale Fabriano. Progetto Next.js 16 + React 19 + Tailwind 4.

## Struttura

```
/                       Home (hero editorial + manifesto + esperienza timeline + edizioni + CTA)
/edizioni               Archivio annuale (card minimal: blur default + hover sharp/zoom)
/edizioni/[anno]        Dettaglio singola edizione
/blog                   Indice articoli
/blog/[slug]            Articolo
/unisciti               Iscrizione al Campus + form
/contatti               Email + form contatto
/faq                    Domande frequenti
```

Lo scroll è quello nativo del browser. La hero è una sezione `100svh` standard che scorre via verso l'alto; la navbar appare quando lo scroll supera il 90% dell'altezza hero.

## Avvio locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000.

## Contenuti

I contenuti del sito vivono in `src/content/`:

- `info.ts` — istituzionale, claim, padri fondatori, perché esiste
- `edizioni.ts` — archivio annuale con gallery e partner
- `articoli.ts` — articoli del blog
- `faq.ts` — domande frequenti per argomento
- `contatti.ts` — email pubblica e configurazione destinazione

> `sponsor.ts` non è più referenziato dalla home né dalla navigazione; mantienilo solo se hai bisogno dei dati altrove.

Per pubblicare una nuova edizione o un articolo basta aggiungere un oggetto all'array corrispondente.

Le foto vanno caricate in `/public/foto/` e referenziate per path (es. `"/foto/8505.JPG"`).

## Email — configurazione Resend

I form di iscrizione e contatto inviano le email tramite [Resend](https://resend.com).

1. Crea un account su https://resend.com
2. Verifica il dominio `futurecampus.it` (sezione Domains)
3. Genera una API key (sezione API Keys)
4. Copia `.env.example` in `.env.local` e compila:

```
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=Future Campus <no-reply@futurecampus.it>
EMAIL_TO_ISCRIZIONI=iscrizioni@futurecampus.it
EMAIL_TO_CONTATTI=info@futurecampus.it
```

Finché le variabili non sono impostate, i form funzionano graficamente ma stampano il payload in console (modalità sviluppo, nessun invio reale).

## Brand system

I colori, font e direzione stilistica sono documentati in `docs/future-campus-brand-system.md`.

## Build di produzione

```bash
npm run build
npm start
```
