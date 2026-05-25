/**
 * Attività delle classi di ciascuna edizione di Future Campus Fabriano.
 *
 *   Edizione  →  Classe (Beginner / Master / Advanced / Insieme)  →  Attività (n)
 *
 * "Insieme" è la classe trasversale: attività comuni a tutte le classi
 * (sul filesystem corrispondono alla cartella `tutti/`).
 *
 * Per riempire questo file:
 *   1. Identifica anno + classe (es. 2025 / Master).
 *   2. Aggiungi un oggetto Attivita all'array `attivita` della classe.
 *   3. Ogni attività deve avere ESATTAMENTE 5 path foto in `foto`.
 *   4. Le foto vanno in /public/edizioni/{anno}/fabriano/{classe-folder}/{slug-date}/{1..5}.jpg
 *      — usa `fotoAttivita(folder)` per evitare di scrivere a mano 5 path.
 *   5. `id` è uno slug url-safe (lowercase, trattini, niente accenti) —
 *      verrà usato nella query string della modale: ?attivita=visita-loccioni
 */

export type Attivita = {
  /** slug url-safe, deve essere UNICO dentro la stessa classe.
   *  Esempi: "visita-loccioni", "seminario-ai", "team-building-day-1". */
  id: string;
  /** Data ISO YYYY-MM-DD. Usata per l'ordinamento cronologico e nel calendario. */
  data: string;
  /** Data ISO di fine, OPZIONALE: solo per attività multi-giorno (es. Hackathon
   *  22-23 luglio → data: "2024-07-22", dataFine: "2024-07-23"). Il calendario
   *  mostra il dot su tutti i giorni nell'intervallo. */
  dataFine?: string;
  /** Titolo breve dell'attività. Va in card e in modale. */
  titolo: string;
  /** Descrizione opzionale (1–3 frasi). Se presente va nella modale sotto al titolo. */
  descrizione?: string;
  /** Classi AGGIUNTIVE che hanno partecipato a questa attività, oltre alla
   *  classe "principale" definita dall'array in cui è collocata. Esempio:
   *  L'impresa di ogni giorno · DUE è in Master ma ha visto la partecipazione
   *  anche di Advanced → extraClassi: ["Advanced"]. La cella mostra un dot per
   *  ciascuna classe e la modale elenca tutte le classi nel tag. */
  extraClassi?: ClasseNome[];
  /** Esattamente 5 path foto. */
  foto: string[];
};

/**
 * "Insieme" = classe trasversale (cartella `tutti/` su filesystem).
 * Usata per attività comuni a Beginner+Master+(Advanced).
 */
export type ClasseNome = "Beginner" | "Master" | "Advanced" | "Insieme";

export type ClasseAnnata = {
  classe: ClasseNome;
  attivita: Attivita[];
};

/**
 * Helper: data la cartella base di un'attività (es. "/edizioni/2023/fabriano/beginner/06_16_23SoftSkill"),
 * costruisce l'array dei 5 path foto. URL-encoding per segmento per gestire
 * caratteri speciali nei nomi cartella (es. `Faber+Diasen` → `Faber%2BDiasen`,
 * `CosaFaròDaGrande` → `CosaFar%C3%B2DaGrande`).
 *
 * @param ext "jpg" (default, edizione 2023) o "JPG" (edizione 2024) — i path
 *   sono case-sensitive su filesystem Linux/Vercel, quindi vanno rispettati.
 */
function foto5(folder: string, ext: "jpg" | "JPG" = "jpg"): string[] {
  const safe = folder.split("/").map(encodeURIComponent).join("/");
  return [1, 2, 3, 4, 5].map((n) => `${safe}/${n}.${ext}`);
}

/* ──────────────────────────────────────────────────────────────────────────
   2023 — Fabriano. Prima edizione con tre classi: Beginner, Master, Insieme
   (no Advanced: in quell'anno non esisteva ancora). 23 attività totali (9+9+5).
   Date estratte dai nomi cartella in
   /public/edizioni/2023/fabriano/{beginner|master|tutti}/MM_DD_YY{Titolo}/
   ─────────────────────────────────────────────────────────────────────── */

const BASE_2023 = "/edizioni/2023/fabriano";

const ATTIVITA_2023_BEGINNER: Attivita[] = [
  {
    id: "soft-skill",
    data: "2023-06-16",
    titolo: "Soft Skill",
    foto: foto5(`${BASE_2023}/beginner/06_16_23SoftSkill`),
  },
  {
    id: "clementi",
    data: "2023-06-19",
    titolo: "Clementi",
    foto: foto5(`${BASE_2023}/beginner/06_19_23Clementi`),
  },
  {
    id: "sicurezza-beginner",
    data: "2023-06-22",
    titolo: "Sicurezza",
    foto: foto5(`${BASE_2023}/beginner/06_22_23Sicurezza`),
  },
  {
    id: "comunicazione",
    data: "2023-06-26",
    titolo: "Comunicazione",
    foto: foto5(`${BASE_2023}/beginner/06_26_23Comunicazione`),
  },
  {
    id: "fondazione-merloni",
    data: "2023-06-30",
    titolo: "Fondazione Merloni",
    foto: foto5(`${BASE_2023}/beginner/06_30_23FondazioneMerloni`),
  },
  {
    id: "fantastico-mondo-numeri",
    data: "2023-07-03",
    titolo: "Il fantastico mondo dei numeri",
    foto: foto5(`${BASE_2023}/beginner/07_03_23IlFantasticoMondoDeiNumeri`),
  },
  {
    id: "elica",
    data: "2023-07-11",
    titolo: "Elica",
    foto: foto5(`${BASE_2023}/beginner/07_11_23Elica`),
  },
  {
    id: "problem-solving",
    data: "2023-07-14",
    titolo: "Problem Solving",
    foto: foto5(`${BASE_2023}/beginner/07_14_23ProblemSolving`),
  },
  {
    id: "cosa-voglio-fare-da-grande",
    data: "2023-07-17",
    titolo: "Cosa voglio fare da grande",
    foto: foto5(`${BASE_2023}/beginner/07_17_23CosaVoglioFareDaGrande`),
  },
];

const ATTIVITA_2023_MASTER: Attivita[] = [
  {
    id: "un-viaggio-senza-fine",
    data: "2023-06-15",
    titolo: "Un viaggio senza fine",
    foto: foto5(`${BASE_2023}/master/06_15_23UnViaggioSenzaFine`),
  },
  {
    id: "univpm",
    data: "2023-06-21",
    titolo: "UNIVPM",
    foto: foto5(`${BASE_2023}/master/06_21_23UNIVPM`),
  },
  {
    id: "carisma-power",
    data: "2023-06-28",
    titolo: "Carisma Power",
    foto: foto5(`${BASE_2023}/master/06_28_23CarismaPower`),
  },
  {
    id: "sicurezza-master",
    data: "2023-06-29",
    titolo: "Sicurezza",
    foto: foto5(`${BASE_2023}/master/06_29_23Sicurezza`),
  },
  {
    id: "orienteering",
    data: "2023-07-04",
    titolo: "Orienteering",
    foto: foto5(`${BASE_2023}/master/07_04_23Orienteering`),
  },
  {
    id: "ariston-giorno-1",
    data: "2023-07-12",
    titolo: "Ariston · giorno 1",
    foto: foto5(`${BASE_2023}/master/07_12_23Ariston`),
  },
  {
    id: "ariston-giorno-2",
    data: "2023-07-13",
    titolo: "Ariston · giorno 2",
    foto: foto5(`${BASE_2023}/master/07_13_23Ariston`),
  },
  {
    id: "cosa-faro-da-grande",
    data: "2023-07-18",
    titolo: "Cosa farò da grande",
    foto: foto5(`${BASE_2023}/master/07_18_23CosaFaròDaGrande`),
  },
  {
    id: "golf-antognolla",
    data: "2023-07-20",
    titolo: "Golf Antognolla",
    foto: foto5(`${BASE_2023}/master/07_20_23GolfAntognolla`),
  },
];

const ATTIVITA_2023_INSIEME: Attivita[] = [
  {
    id: "giornata-iniziale",
    data: "2023-06-13",
    titolo: "Giornata iniziale",
    foto: foto5(`${BASE_2023}/tutti/06_13_23GiornataIniziale`),
  },
  {
    id: "faber-diasen",
    data: "2023-06-20",
    titolo: "Faber + Diasen",
    foto: foto5(`${BASE_2023}/tutti/06_20_23Faber+Diasen`),
  },
  {
    id: "dimensioni-nascoste",
    data: "2023-07-05",
    titolo: "Dimensioni nascoste",
    foto: foto5(`${BASE_2023}/tutti/07_05_23DimensioniNascoste`),
  },
  {
    id: "ai-its",
    data: "2023-07-06",
    titolo: "AI · ITS",
    foto: foto5(`${BASE_2023}/tutti/07_06_23AI_ITS`),
  },
  {
    id: "giornata-finale",
    data: "2023-07-19",
    titolo: "Giornata finale",
    foto: foto5(`${BASE_2023}/tutti/07_19_23GiornataFinale`),
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   2024 — Fabriano. Terza edizione: nasce la classe Advanced. 29 attività
   totali (12 Beginner + 11 Master + 1 Advanced + 5 Insieme). Foto in .JPG
   (maiuscolo). L'Hackathon (22-23 luglio) è l'unica attività multi-giorno.
   ─────────────────────────────────────────────────────────────────────── */

const BASE_2024 = "/edizioni/2024/fabriano";

const ATTIVITA_2024_BEGINNER: Attivita[] = [
  {
    id: "intro-soft-skill",
    data: "2024-06-14",
    titolo: "Intro Soft Skill + Janus Basket",
    foto: foto5(`${BASE_2024}/beginner/06_14_24IntroSofSkill+JanusBasket`, "JPG"),
  },
  {
    id: "elica-bs",
    data: "2024-06-18",
    titolo: "Elica BS",
    foto: foto5(`${BASE_2024}/beginner/06_18_24Elica_BS`, "JPG"),
  },
  {
    id: "sicurezza-ast",
    data: "2024-06-19",
    titolo: "Sicurezza + AST",
    foto: foto5(`${BASE_2024}/beginner/06_19_24Sicurezza+AST`, "JPG"),
  },
  {
    id: "comunicazione",
    data: "2024-06-26",
    titolo: "Comunicazione",
    foto: foto5(`${BASE_2024}/beginner/06_26_24Comunicazione`, "JPG"),
  },
  {
    id: "fondazione-merloni",
    data: "2024-06-27",
    titolo: "Fondazione Merloni",
    foto: foto5(`${BASE_2024}/beginner/06_27_24FondazioneMerloni`, "JPG"),
  },
  {
    id: "fantastico-mondo-numeri",
    data: "2024-07-01",
    titolo: "Il fantastico mondo dei numeri + Werner + Comune",
    foto: foto5(
      `${BASE_2024}/beginner/07_01_24IlFantasticoMondoDeiNumeri+Werner+Comune`,
      "JPG",
    ),
  },
  {
    id: "electrolux-airforce",
    data: "2024-07-02",
    titolo: "Electrolux + AirForce",
    foto: foto5(`${BASE_2024}/beginner/07_02_24Electrolux+AirForce`, "JPG"),
  },
  {
    id: "cyberbullismo-problem-solving",
    data: "2024-07-03",
    titolo: "Cyberbullismo + Problem Solving",
    foto: foto5(`${BASE_2024}/beginner/07_03_24Cyberbullismo+ProblemSolving`, "JPG"),
  },
  {
    id: "ai-domus",
    data: "2024-07-09",
    titolo: "AI + Domus",
    foto: foto5(`${BASE_2024}/beginner/07_09_24AI+Domus`, "JPG"),
  },
  {
    id: "cosa-voglio-fare-da-grande",
    data: "2024-07-10",
    titolo: "Cosa voglio fare da grande",
    foto: foto5(`${BASE_2024}/beginner/07_10_24CosaVoglioFareDaGrande`, "JPG"),
  },
  {
    id: "sostenibilita",
    data: "2024-07-16",
    titolo: "Sostenibilità",
    foto: foto5(`${BASE_2024}/beginner/07_16_24Sostenibilità`, "JPG"),
  },
  {
    id: "rossi-faber-videomaker",
    data: "2024-07-18",
    titolo: "Rossi Faber + Video Maker",
    foto: foto5(`${BASE_2024}/beginner/07_18_24RossiFaber+VideoMaker`, "JPG"),
  },
];

const ATTIVITA_2024_MASTER: Attivita[] = [
  {
    id: "un-viaggio-scortichini-werner",
    data: "2024-06-13",
    titolo: "Un viaggio… Scortichini + Werner",
    foto: foto5(`${BASE_2024}/master/06_13_24Unviaggio...Scortichini+Werner`, "JPG"),
  },
  {
    id: "marbre",
    data: "2024-06-18",
    titolo: "Marbre",
    foto: foto5(`${BASE_2024}/master/06_18_24Marbre`, "JPG"),
  },
  {
    id: "univpm",
    data: "2024-06-20",
    titolo: "UNIVPM",
    foto: foto5(`${BASE_2024}/master/06_20_24UNIVPM`, "JPG"),
  },
  {
    id: "impresa-di-ogni-giorno-due",
    data: "2024-06-28",
    titolo: "L'impresa di ogni giorno · DUE",
    extraClassi: ["Advanced"],
    foto: foto5(`${BASE_2024}/master/06_28_24L'ImpresaDiOgniGiornoDUE`, "JPG"),
  },
  {
    id: "carisma-power",
    data: "2024-07-02",
    titolo: "Carisma Power",
    foto: foto5(`${BASE_2024}/master/07_02_24CarismaPower`, "JPG"),
  },
  {
    id: "consapevolezza-se",
    data: "2024-07-03",
    titolo: "Consapevolezza di sé",
    foto: foto5(`${BASE_2024}/master/07_03_24ConsapevolezzaSe`, "JPG"),
  },
  {
    id: "la-creativita",
    data: "2024-07-08",
    titolo: "La creatività",
    foto: foto5(`${BASE_2024}/master/07_08_24LaCreatività`, "JPG"),
  },
  {
    id: "project-work-ariston",
    data: "2024-07-11",
    titolo: "Project Work Ariston",
    foto: foto5(`${BASE_2024}/master/07_11_24ProjectWorkAriston`, "JPG"),
  },
  {
    id: "lean-game-ariston",
    data: "2024-07-12",
    titolo: "Lean Game Ariston",
    foto: foto5(`${BASE_2024}/master/07_12_24LeanGameAriston`, "JPG"),
  },
  {
    id: "impresa-di-ogni-giorno-tre-caritas",
    data: "2024-07-15",
    titolo: "L'impresa di ogni giorno · TRE — Caritas",
    foto: foto5(`${BASE_2024}/master/07_15_24L'ImpresaDiOgniGiornoTRECaritas`, "JPG"),
  },
  {
    id: "mani-in-pasta",
    data: "2024-07-16",
    titolo: "Mani in pasta",
    foto: foto5(`${BASE_2024}/master/07_16_24ManiInPasta`, "JPG"),
  },
];

const ATTIVITA_2024_ADVANCED: Attivita[] = [
  {
    id: "public-speaking-mitama",
    data: "2024-07-04",
    titolo: "Public Speaking + Mitama",
    foto: foto5(`${BASE_2024}/advanced/07_04_24PublicSpeaking+Mitama`, "JPG"),
  },
];

const ATTIVITA_2024_INSIEME: Attivita[] = [
  {
    id: "giornata-inaugurale",
    data: "2024-06-12",
    titolo: "Giornata inaugurale",
    foto: foto5(`${BASE_2024}/tutti/06_12_24GiornataInaugurale`, "JPG"),
  },
  {
    id: "impresa-di-ogni-giorno-uno",
    data: "2024-06-17",
    titolo: "L'impresa di ogni giorno · UNO",
    foto: foto5(`${BASE_2024}/tutti/06_17_24L'impresaDiOgniGiornoUNO`, "JPG"),
  },
  {
    id: "dimensioni-nascoste",
    data: "2024-07-05",
    titolo: "Dimensioni nascoste",
    foto: foto5(`${BASE_2024}/tutti/07_05_24DimensioniNascoste`, "JPG"),
  },
  {
    id: "hackathon",
    data: "2024-07-22",
    dataFine: "2024-07-23",
    titolo: "Hackathon",
    foto: foto5(`${BASE_2024}/tutti/07_22-23_24Hackathon`, "JPG"),
  },
  {
    id: "giornata-finale",
    data: "2024-07-24",
    titolo: "Giornata finale",
    foto: foto5(`${BASE_2024}/tutti/07_24_24GiornataFinale`, "JPG"),
  },
];

/**
 * Indice: chiave = anno (stringa, es. "2025"), valore = elenco classi
 * con relative attività. Lasciare `attivita: []` per le classi che non
 * hanno ancora contenuti — la pagina mostrerà uno stato vuoto coerente.
 */
export const edizioniAttivita: Record<string, ClasseAnnata[]> = {
  "2022": [{ classe: "Beginner", attivita: [] }],

  "2023": [
    { classe: "Beginner", attivita: ATTIVITA_2023_BEGINNER },
    { classe: "Master", attivita: ATTIVITA_2023_MASTER },
    { classe: "Insieme", attivita: ATTIVITA_2023_INSIEME },
  ],

  "2024": [
    { classe: "Beginner", attivita: ATTIVITA_2024_BEGINNER },
    { classe: "Master", attivita: ATTIVITA_2024_MASTER },
    { classe: "Advanced", attivita: ATTIVITA_2024_ADVANCED },
    { classe: "Insieme", attivita: ATTIVITA_2024_INSIEME },
  ],

  "2025": [
    { classe: "Beginner", attivita: [] },
    { classe: "Master", attivita: [] },
    { classe: "Advanced", attivita: [] },
  ],

  "2026": [
    { classe: "Beginner", attivita: [] },
    { classe: "Master", attivita: [] },
    { classe: "Advanced", attivita: [] },
  ],
};

/* ──────────────────────────────────────────────────────────────────────────
   Helpers di lookup — usati dalla pagina /edizioni/[anno] e dalla modale.
   ─────────────────────────────────────────────────────────────────────── */

/** Ritorna l'elenco classi di un'edizione, o array vuoto. */
export function getClassiPerAnno(anno: string | number): ClasseAnnata[] {
  return edizioniAttivita[String(anno)] ?? [];
}

/**
 * Ritorna le attività di una singola classe in un anno, ORDINATE per data
 * ascendente. Se la classe non esiste, ritorna undefined.
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

/**
 * Tutte le attività di un'edizione, appiattite e ordinate per data,
 * ognuna arricchita con la classe di appartenenza. Usata dal calendario
 * unico mensile.
 */
export type AttivitaConClasse = Attivita & { classe: ClasseNome };

export function getAttivitaPerAnno(anno: string | number): AttivitaConClasse[] {
  const classi = getClassiPerAnno(anno);
  const all: AttivitaConClasse[] = [];
  for (const { classe, attivita } of classi) {
    for (const a of attivita) all.push({ ...a, classe });
  }
  return all.sort((a, b) => a.data.localeCompare(b.data));
}

/** Ritorna una singola attività via anno + id (cerca su tutte le classi). */
export function getAttivitaById(
  anno: string | number,
  id: string,
): AttivitaConClasse | undefined {
  return getAttivitaPerAnno(anno).find((a) => a.id === id);
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
  if (lower === "insieme") return "Insieme";
  return undefined;
}
