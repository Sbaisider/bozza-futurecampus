# Setup Sanity — Guida operativa

Tutto il codice è già pronto. Mancano 4 passi (10 minuti totali) per attivare il CMS.

---

## 1. Crea il progetto Sanity

1. Vai su https://www.sanity.io/manage
2. **Create new project**
3. Compila:
   - Project name: `Future Campus Fabriano`
   - Use the default dataset configuration → **Yes** (dataset `production`, visibility `Public`)
4. Apri il progetto appena creato e copia il **Project ID** (campo in alto, 8 caratteri tipo `a1b2c3d4`).

---

## 2. Configura le variabili d'ambiente

1. Nella cartella `scaffold/` crea un file `.env.local` (se non esiste) e incolla:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=il_tuo_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-24
```

> Sostituisci `il_tuo_project_id` col valore copiato al punto 1.

2. Salva. (Il file `.env.local` è già nel `.gitignore`, non finirà mai su git.)

---

## 3. Installa le dipendenze

Doppio click su `install-sanity.cmd` nella cartella `futurecampus/`. Oppure dal terminale (dentro `scaffold/`):

```bash
pnpm add sanity@latest next-sanity@latest @sanity/image-url@latest @sanity/vision@latest @portabletext/react@latest styled-components@latest
```

Richiede ~1 minuto.

---

## 4. Autorizza il dominio dello Studio (CORS)

Lo Studio gira a `http://localhost:3000/studio` (dev) e `https://futurecampusfabriano.it/studio` (prod). Sanity richiede di aggiungerli alla whitelist:

1. Su https://www.sanity.io/manage → tuo progetto → tab **API**
2. **CORS origins** → **Add CORS origin**
3. Aggiungi:
   - `http://localhost:3000` (allow credentials: sì)
   - L'URL del sito in produzione (es. `https://futurecampusfabriano.it`) quando il sito è live

---

## 5. Apri lo Studio e pubblica il primo articolo

1. Avvia il dev server: `pnpm dev`
2. Apri http://localhost:3000/studio
3. La prima volta: login con il tuo account Sanity (lo stesso del Manage)
4. **Create** → **Articolo**
5. Compila i campi (titolo, sommario, data, categoria, copertina, corpo) e clicca **Publish**
6. Vai su http://localhost:3000/blog → l'articolo è online

---

## Come funziona dopo il setup

- **Per pubblicare**: vai su `/studio`, scrivi l'articolo, click "Publish". L'articolo è online entro 60 secondi (su Vercel con webhook può essere istantaneo).
- **Per modificare**: stesso flow. Sanity tiene la cronologia delle versioni, puoi sempre tornare indietro.
- **Per invitare altri editor**: Sanity Manage → **Members** → **Invite member**. Hanno bisogno solo dell'email.
- **Le immagini** caricate da Studio passano dal CDN di Sanity (resize automatico, formato WebP/AVIF, niente bisogno di `optimize:images`).

---

## Migrare i 4 articoli esistenti

Quando lo Studio sarà attivo, ti basta ricreare manualmente i 4 articoli che oggi sono hardcoded in `src/content/articoli.ts`. Sono pochi e li trovi nel file. Poi puoi cancellare `articoli.ts`.

In alternativa, posso fare uno script di import che li carica via API: dimmi se serve.

---

## Pannello editor in 1 immagine mentale

```
┌──────────────────────────────────────┐
│  ✦ Future Campus Fabriano · Studio   │
│  ┌─────────────┬──────────────────┐  │
│  │ Articoli    │ + Crea articolo  │  │
│  │             │                  │  │
│  │ ▸ Open Day  │  Titolo          │  │
│  │   2026      │  ░░░░░░░░░░░░░   │  │
│  │ ▸ Attestati │  Sommario        │  │
│  │   2025      │  ░░░░░░░░░░░░░   │  │
│  │ ▸ Perché un │  Data: 15/05/26  │  │
│  │   campus    │  Categoria:      │  │
│  │   diverso   │  ◉ Aggiornamenti │  │
│  │ ▸ Premio    │  Copertina:      │  │
│  │   2024      │  [drop image]    │  │
│  │             │  Corpo:          │  │
│  │             │  ┌──────────────┐│  │
│  │             │  │ B  I  H2  ◦  ││  │
│  │             │  │              ││  │
│  │             │  │  scrivi qui  ││  │
│  │             │  └──────────────┘│  │
│  │             │     [Publish]    │  │
│  └─────────────┴──────────────────┘  │
└──────────────────────────────────────┘
```

Pratico, veloce, niente codice.
