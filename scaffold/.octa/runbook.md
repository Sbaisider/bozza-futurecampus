# Runbook — Sito Future Campus Fabriano (www.futurecampus.it)

## Stack

- Next.js 16 (App Router), pubblicato su Vercel (progetto `bozza-futurecampus`)
- Repository: github.com/Sbaisider/bozza-futurecampus, cartella `scaffold/`
- Produzione = branch `main`: ogni commit lì viene pubblicato da Vercel in 1-3 minuti

## Come arrivano le modifiche

Il cliente scrive a Octapus nella chat di OCTAGENCY. La richiesta viene classificata per difficoltà:

| Difficoltà      | Esempi                                                                 | Chi la fa                                                                                              |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Semplice**    | cambiare un testo, un orario, un numero di telefono, un prezzo scritto | **Octapus** con `update_copy`: prepara la modifica, il cliente la approva, il sito si aggiorna da solo |
| **Intermedia**  | lo stesso testo in più punti, una nuova sezione, una nuova immagine    | **il team**: Octapus apre un ticket. Per il testo ripetuto c'è `update_copy_everywhere`                |
| **Complessa**   | restyling, nuove pagine o funzioni, pagamenti, aree riservate          | **il team**, con preventivo                                                                            |

## Cosa fa `update_copy`

Sostituisce un testo con un altro e registra UN commit su `main`. Parte solo se:

- il cliente ha approvato la proposta (vede il testo di adesso e quello nuovo);
- il testo attuale compare in **un solo punto** dei file qui sotto;
- il punto è testo che si legge sul sito: testo fra i tag, attributi come `alt` e `title`,
  valori di chiavi come `title`, `description`, `label`. Mai classi CSS, link, codice,
  argomenti di funzioni, configurazione, valori inviati da un modulo;
- quel testo non è usato anche dal programma come chiave o termine di confronto, nemmeno nei
  file che il connettore non può modificare (li legge apposta per controllare).

Se una di queste condizioni manca non viene scritto nulla e la richiesta passa al team.

Prima ancora di chiedere l'approvazione, OCTAGENCY fa la stessa verifica senza scrivere
(`check_copy`): se il testo non si trova o compare in più punti, Octapus lo dice subito al
cliente (gli chiede la frase intera o la pagina, oppure passa al team) invece di fargli
approvare una modifica che non partirebbe.

File in cui può cercare:

- `src/app/**`
- `src/components/**`
- `src/content/**`

File di soli testi e dati (lì sono testo anche le frasi in elenchi e costanti):

- `src/content/**`

Mai modificabili in questo progetto:

- `src/app/studio/**`

Testi regolati (un testo che contiene una di queste espressioni lo cambia una persona):

- (nessuno)

In più il kit blocca sempre, comunque sia scritto lo scope: cartelle `api`, `auth`, `admin`,
`staff`, `account`, `checkout`, pagamenti, analytics; testi legali e consensi (`privacy`,
`cookie`, `termini`, banner dei cookie, verifica dell'età); file come `stripe.ts`, `actions.ts`,
`CheckoutForm.tsx`, middleware e configurazione; file con `"use server"`; test, `.octa/` e `.github/`.

## Reti di sicurezza

- Prima di registrare il commit il file modificato viene rianalizzato: deve avere la stessa
  struttura di prima, con un solo testo cambiato.
- Ogni commit del connettore porta la riga `Octa-Command-Id`. Se la sua pubblicazione fallisce,
  `.github/workflows/octa-guard.yml` lo annulla e apre una segnalazione: il sito resta sull'ultima
  versione buona.
- Interruttore: `OCTA_KIT_DISABLED=1` nelle variabili di Vercel spegne l'endpoint (serve un Redeploy).

## Collegamento a OCTAGENCY

- Endpoint comandi: `https://www.futurecampus.it/api/octa/command`
- Monitoraggio: modalità `http` (è la piattaforma a controllare che il sito risponda)
- Variabili d'ambiente, **solo su Vercel**, mai in un file:
  - `OCTA_PROJECT_TOKEN` — token del progetto, mostrato una sola volta alla creazione in OCTAGENCY
  - `OCTA_GITHUB_TOKEN` — token GitHub con scrittura sui contenuti di questo repository
  - `OCTA_PROJECT_ID` — facoltativa: id del progetto in OCTAGENCY, per rifiutare i comandi di un altro progetto
- Finché `OCTA_PROJECT_TOKEN` non c'è, l'endpoint risponde 503 e non fa nulla.

## Note del progetto

- Gli articoli del blog stanno in Sanity (CMS), non nel repo: Octapus non li trova e passa la richiesta al team.
- Edizioni, attività e recapiti stanno in `src/content/`.
- Il repository è pubblico: il manifest non contiene segreti, ma nessun token va mai scritto in un file.
