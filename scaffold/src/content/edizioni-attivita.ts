/**
 * Attività delle classi di ciascuna edizione di Future Campus Fabriano.
 *
 *   Edizione  →  Classe (Beginner / Master / Advanced)  →  Attività (n)
 *
 * Per riempire questo file:
 *   1. Identifica anno + classe (es. 2025 / Master).
 *   2. Aggiungi un oggetto Attivita all'array `attivita` della classe.
 *   3. Ogni attività deve avere ESATTAMENTE 5 path foto in `foto`.
 *   4. Le foto vanno caricate in /public/foto/ con lo stesso nome file.
 *   5. `id` è uno slug url-safe (lowercase, trattini, niente accenti) —
 *      verrà usato nella query string della modale, es:
 *        /edizioni/2025/master?attivita=visita-loccioni
 *
 * Esempio (commentato in fondo) per il primo inserimento.
 */

export type Attivita = {
  /** slug url-safe, deve essere UNICO dentro la stessa classe.
   *  Esempi: "visita-loccioni", "seminario-ai", "team-building-day-1". */
  id: string;
  /** Data ISO YYYY-MM-DD. Usata per l'ordinamento cronologico. */
  data: string;
  /** Titolo breve dell'attività. Va in card e in modale. */
  titolo: string;
  /** Descrizione breve (1–3 frasi). Va nella modale sotto al titolo. */
  descrizione: string;
  /** Esattamente 5 path foto, es. ["/foto/1287.JPG", ...]. */
  foto: string[];
};

export type ClasseNome = "Beginner" | "Master" | "Advanced";

export type ClasseAnnata = {
  classe: ClasseNome;
  attivita: Attivita[];
};

/**
 * Indice: chiave = anno (stringa, es. "2025"), valore = elenco classi
 * con relative attività. Lasciare `attivita: []` per le classi che non
 * hanno ancora contenuti — la pagina mostrerà uno stato vuoto coerente.
 */
export const edizioniAttivita: Record<string, ClasseAnnata[]> = {
  "2022": [
    { classe: "Beginner", attivita: [] },
  ],

  "2023": [
    { classe: "Beginner", attivita: [] },
    { classe: "Master",   attivita: [] },
  ],

  "2024": [
    { classe: "Beginner", attivita: [] },
    { classe: "Master",   attivita: [] },
    { classe: "Advanced", attivita: [] },
  ],

  "2025": [
    { classe: "Beginner", attivita: [] },
    {
      classe: "Master",
      attivita: [
        // ─── ESEMPIO — sostituire con i dati reali e duplicare per ogni attività ───
        // {
        //   id: "visita-loccioni",
        //   data: "2025-06-18",
        //   titolo: "Visita Loccioni",
        //   descrizione:
        //     "Una giornata in azienda con il gruppo Loccioni: tour della fabbrica, " +
        //     "incontro con il team R&D e simulazione di un progetto interno.",
        //   foto: [
        //     "/foto/XXXX.JPG",
        //     "/foto/XXXX.JPG",
        //     "/foto/XXXX.JPG",
        //     "/foto/XXXX.JPG",
        //     "/foto/XXXX.JPG",
        //   ],
        // },
      ],
    },
    { classe: "Advanced", attivita: [] },
  ],

  "2026": [
    { classe: "Beginner", attivita: [] },
    { classe: "Master",   attivita: [] },
    { classe: "Advanced", attivita: [] },
  ],
};

/* ──────────────────────────────────────────────────────────────────────────
   Helpers di lookup — usati dalla pagina /edizioni/[anno]/[classe] e dalla
   modale. Tenuti qui per evitare duplicazione nelle pagine.
   ─────────────────────────────────────────────────────────────────────── */

/** Ritorna l'elenco classi di un'edizione, o array vuoto. */
export function getClassiPerAnno(anno: string | number): ClasseAnnata[] {
  return edizioniAttivita[String(anno)] ?? [];
}

/**
 * Ritorna le attività di una singola classe in un anno, ORDINATE per data
 * ascendente. Se la classe non esiste, ritorna undefined.
 *
 * Confronto case-insensitive sulla classe per tolleranza ai param URL.
 */
export function getAttivitaPerClasse(
  anno: string | number,
  classe: string,
): Attivita[] | undefined {
  const classi = getClassiPerAnno(anno);
  const target = classe.toLowerCase();
  const match = classi.find((c) => c.classe.toLowerCase() === target);
  if (!match) return undefined;
  return [...match.attivita].sort((a, b) => a.data.localeCompare(b.data));
}

/** Ritorna una singola attività via anno + classe + id, o undefined. */
export function getAttivita(
  anno: string | number,
  classe: string,
  id: string,
): Attivita | undefined {
  const attivita = getAttivitaPerClasse(anno, classe);
  if (!attivita) return undefined;
  return attivita.find((a) => a.id === id);
}

/**
 * Slug "ufficiale" usato negli URL per ciascuna classe. Lowercased, niente
 * spazi/accenti. Centralizzato qui per evitare divergenze fra componenti.
 */
export function classeToSlug(classe: ClasseNome): string {
  return classe.toLowerCase();
}

/** Inverso di classeToSlug, con fallback. */
export function slugToClasse(slug: string): ClasseNome | undefined {
  const lower = slug.toLowerCase();
  if (lower === "beginner") return "Beginner";
  if (lower === "master") return "Master";
  if (lower === "advanced") return "Advanced";
  return undefined;
}
