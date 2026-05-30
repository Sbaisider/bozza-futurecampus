/**
 * Archivio annuale delle edizioni di Future Campus Fabriano.
 * Per aggiungere una nuova edizione: duplicare un oggetto e modificare i campi.
 * Le foto referenziate vanno caricate in /public/foto/ con lo stesso nome file.
 */

export type EdizioneAttivita = {
  titolo: string;
  descrizione: string;
};

export type EdizionePartner = {
  nome: string;
};

export type Edizione = {
  anno: number;
  slug: string; // usato in /edizioni/[slug]
  numeroEdizione: string; // "Prima edizione", "Quinta edizione"
  tema: string; // tag superiore alla copertina, breve
  titolo: string; // titolo della singola edizione
  sintesi: string; // 1-2 righe per il listing
  copertina: string; // path foto in /public/foto/
  paragrafiRacconto: string[]; // testi narrativi della pagina dettaglio
  periodo: string;
  partecipanti: number | string;
  classi: string[]; // beginner / master / advanced
  momentiChiave: EdizioneAttivita[];
  partner: EdizionePartner[];
  gallery: string[]; // path /foto/...
  isCorrente?: boolean;
};

/**
 * Pool di foto disponibili in /public/foto. Distribuite tra le edizioni a senso
 * (eventi più recenti = foto in numero maggiore). Possono essere riassegnate dall'utente.
 */
export const edizioni: Edizione[] = [
  {
    anno: 2022,
    slug: "2022",
    numeroEdizione: "Prima edizione",
    tema: "L'inizio",
    titolo: "Il primo Campus, l'idea che diventa realtà",
    sintesi:
      "Cinquanta ragazzi, una sola classe, sei settimane di scoperta. La prima volta di Future Campus.",
    copertina: "/edizioni/copertine/copertina2022.JPG",
    paragrafiRacconto: [
      "Era il 10 giugno 2022 e nessuno sapeva cosa aspettarsi. Cinquanta ragazzi delle scuole superiori, un format mai sperimentato, un'idea condivisa: provare a fare formazione in modo diverso, dove l'esperienza vale più del libro di testo.",
      "Da quel primo gruppo è nato tutto. Alcuni di quei ragazzi sono tornati ogni anno, prima come allievi della classe master, poi come coach dei più giovani.",
    ],
    periodo: "10 giugno – 23 luglio 2022",
    partecipanti: 50,
    classi: ["Beginner"],
    momentiChiave: [
      {
        titolo: "Avvio del format esperienziale",
        descrizione: "Definita la metodologia che ancora oggi è la firma del Campus.",
      },
      {
        titolo: "Prime visite aziendali",
        descrizione: "I ragazzi entrano nelle imprese del territorio e incontrano gli imprenditori.",
      },
      {
        titolo: "Consegna degli attestati",
        descrizione: "Il primo gruppo conclude il percorso con un evento dedicato.",
      },
    ],
    partner: [
      { nome: "Confindustria Ancona" },
      { nome: "Fondazione Aristide Merloni" },
    ],
    gallery: [
      "/foto/520.JPG",
      "/foto/360.JPG",
      "/foto/916.JPG",
      "/foto/809.JPG",
      "/foto/153.JPG",
      "/foto/133.JPG",
      "/foto/26.JPG",
    ],
  },
  {
    anno: 2023,
    slug: "2023",
    numeroEdizione: "Seconda edizione",
    tema: "La crescita",
    titolo: "Nascono le due classi: Beginner e Master",
    sintesi:
      "I primi ragazzi chiedono di continuare. Si aprono due classi parallele e il Campus raddoppia.",
    copertina: "/edizioni/copertine/copertina2023.JPG",
    paragrafiRacconto: [
      "La sorpresa è arrivata a fine 2022: i ragazzi della prima edizione hanno chiesto di non interrompere il percorso. Così è nata la classe Master, accanto a una nuova Beginner di ingressi.",
      "Quarantadue iscritti nella sola Beginner, più i veterani del Master: il Campus passa da un'idea fragile a una formula riconoscibile, ripetibile, desiderata.",
    ],
    periodo: "Giugno – luglio 2023",
    partecipanti: 50,
    classi: ["Beginner", "Master", "Insieme"],
    momentiChiave: [
      {
        titolo: "Apertura della classe Master",
        descrizione:
          "Per la prima volta i veterani della prima edizione continuano il percorso con attività di livello avanzato.",
      },
      {
        titolo: "Più aziende coinvolte",
        descrizione: "Cresce la rete di imprese del territorio che apre le porte ai ragazzi.",
      },
      {
        titolo: "Nuovi incontri con coach e professionisti",
        descrizione: "Il programma si arricchisce di testimonianze e laboratori esperienziali.",
      },
    ],
    partner: [
      { nome: "Confindustria Ancona" },
      { nome: "Fondazione Aristide Merloni" },
      { nome: "Comune di Fabriano" },
    ],
    gallery: [
      "/foto/1287.JPG",
      "/foto/1294.JPG",
      "/foto/1670.JPG",
      "/foto/1682.JPG",
      "/foto/1686.JPG",
      "/foto/1841.JPG",
      "/foto/1893.JPG",
      "/foto/2007.JPG",
    ],
  },
  {
    anno: 2024,
    slug: "2024",
    numeroEdizione: "Terza edizione",
    tema: "Il riconoscimento",
    titolo: "Tre classi, oltre 100 ragazzi, un premio nazionale",
    sintesi:
      "La formula si consolida con la classe Advanced. Future Campus vince il premio Cultura del concorso Finanza e Territorio Marche.",
    copertina: "/edizioni/copertine/copertina2024.JPG",
    paragrafiRacconto: [
      "Con l'edizione 2024 il Campus si struttura definitivamente: tre classi parallele — Beginner, Master, Advanced — e oltre cento ragazzi coinvolti per tutta l'estate.",
      "Per la classe Beginner, giochi indoor e outdoor di team building. Per la Master, due giorni intensivi dentro un'azienda per costruire e presentare un progetto vero. Per l'Advanced, l'energia di gruppo diventa il filo conduttore di ogni attività, inclusa una giornata a Bruxelles ospiti della Camera di Commercio delle Marche.",
      "A coronare l'edizione, il primo premio nella sezione Cultura del concorso Finanza e Territorio Marche.",
    ],
    periodo: "Giugno – luglio 2024",
    partecipanti: "100+",
    classi: ["Beginner", "Master", "Advanced", "Insieme"],
    momentiChiave: [
      {
        titolo: "Nasce la classe Advanced",
        descrizione: "Il terzo livello del percorso si apre ai ragazzi che hanno già fatto Beginner e Master.",
      },
      {
        titolo: "Viaggio a Bruxelles",
        descrizione: "La classe Advanced vola a Bruxelles, grazie alla Camera di Commercio delle Marche.",
      },
      {
        titolo: "Premio Cultura — Finanza e Territorio Marche",
        descrizione: "Future Campus vince il primo premio nazionale per la sezione Cultura.",
      },
      {
        titolo: "Seminari su AI, sicurezza e project management",
        descrizione: "Il programma si apre a temi più tecnici, con esperti di settore.",
      },
    ],
    partner: [
      { nome: "Confindustria Ancona" },
      { nome: "Fondazione Aristide Merloni" },
      { nome: "Camera di Commercio delle Marche" },
      { nome: "Caritas Diocesi di Fabriano-Matelica" },
      { nome: "Regione Marche" },
      { nome: "Comune di Fabriano" },
      { nome: "BPER Banca" },
    ],
    gallery: [
      "/foto/3400.JPG",
      "/foto/3495.JPG",
      "/foto/2820.JPG",
      "/foto/2934.JPG",
      "/foto/2661.JPG",
      "/foto/2438.JPG",
      "/foto/2175.JPG",
      "/foto/3730.JPG",
      "/foto/5026.JPG",
      "/foto/5356.JPG",
    ],
  },
  {
    anno: 2025,
    slug: "2025",
    numeroEdizione: "Quarta edizione",
    tema: "L'energia di 150",
    titolo: "Centocinquanta ragazzi, le tre classi a pieno regime",
    sintesi:
      "Centocinquanta partecipanti, gli ex-Advanced diventano coach dei più giovani: il Campus è ormai una comunità.",
    copertina: "/edizioni/copertine/copertina2025.JPG",
    paragrafiRacconto: [
      "Centocinquanta ragazzi divisi in Beginner, Master e Advanced. E in più, i veterani della classe Advanced del 2024 tornano come coach per i più giovani: il Campus è diventato una comunità che si autoalimenta.",
      "Seminari su intelligenza artificiale e sicurezza sul lavoro, simulazioni di colloqui, visite alle imprese, incontri con istituzioni, public speaking, problem solving. Al termine, gli attestati a tutti i 150 partecipanti.",
    ],
    periodo: "Giugno – 23 luglio 2025",
    partecipanti: 150,
    classi: ["Beginner", "Master", "Advanced", "Insieme"],
    momentiChiave: [
      {
        titolo: "Ex Advanced diventano coach",
        descrizione: "I ragazzi che hanno completato i tre livelli rientrano come coach dei più giovani.",
      },
      {
        titolo: "Seminario sull'intelligenza artificiale",
        descrizione: "Una giornata dedicata all'AI e al suo impatto sul mondo del lavoro.",
      },
      {
        titolo: "Public speaking, problem solving, colloqui",
        descrizione: "Le competenze trasversali al centro del programma, con simulazioni e laboratori.",
      },
      {
        titolo: "Consegna degli attestati ai 150 ragazzi",
        descrizione: "Un evento finale con istituzioni, famiglie e partner.",
      },
    ],
    partner: [
      { nome: "Confindustria Ancona" },
      { nome: "Fondazione Aristide Merloni" },
      { nome: "Camera di Commercio delle Marche" },
      { nome: "Caritas Diocesi di Fabriano-Matelica" },
      { nome: "Regione Marche" },
      { nome: "Comune di Fabriano" },
      { nome: "BPER Banca" },
    ],
    gallery: [
      "/foto/7075.JPG",
      "/foto/7133.JPG",
      "/foto/7578.JPG",
      "/foto/8494.JPG",
      "/foto/8505.JPG",
      "/foto/6084.JPG",
      "/foto/5607.JPG",
      "/foto/13454.JPG",
      "/foto/1287.JPG",
    ],
  },
  {
    anno: 2026,
    slug: "2026",
    numeroEdizione: "Quinta edizione",
    tema: "Adesso",
    titolo: "L'edizione che parte il 10 giugno 2026",
    sintesi:
      "Tre classi, sei settimane, una comunità che cresce ogni anno. Iscrizioni aperte.",
    copertina: "/foto/8505.JPG",
    paragrafiRacconto: [
      "La quinta edizione del Future Campus parte il 10 giugno 2026 e si chiude il 23 luglio. Sei settimane di attività gratuite per i ragazzi delle scuole superiori del territorio di Fabriano.",
      "Tre classi parallele — Beginner, Master, Advanced — e tutto ciò che ha reso il Campus un punto di riferimento: laboratori, visite aziendali, incontri con imprenditori, coach motivazionali, seminari, viaggi.",
    ],
    periodo: "10 giugno – 23 luglio 2026",
    partecipanti: "Iscrizioni aperte",
    classi: ["Beginner", "Master", "Advanced"],
    momentiChiave: [
      {
        titolo: "Avvio quinta edizione",
        descrizione: "Il 10 giugno si parte con tre classi in parallelo per sei settimane.",
      },
      {
        titolo: "Pre-iscrizioni aperte",
        descrizione: "Per partecipare basta inviare la propria candidatura dalla pagina Unisciti a noi.",
      },
    ],
    partner: [
      { nome: "Confindustria Ancona" },
      { nome: "Fondazione Aristide Merloni" },
      { nome: "Camera di Commercio delle Marche" },
      { nome: "Caritas Diocesi di Fabriano-Matelica" },
      { nome: "Regione Marche" },
      { nome: "Comune di Fabriano" },
      { nome: "BPER Banca" },
    ],
    gallery: [],
    isCorrente: true,
  },
];

export function getEdizioneBySlug(slug: string): Edizione | undefined {
  return edizioni.find((e) => e.slug === slug);
}

export function getEdizioniOrdinate(direction: "asc" | "desc" = "desc"): Edizione[] {
  return [...edizioni].sort((a, b) =>
    direction === "desc" ? b.anno - a.anno : a.anno - b.anno,
  );
}

export function getEdizioneCorrente(): Edizione {
  return edizioni.find((e) => e.isCorrente) ?? edizioni[edizioni.length - 1];
}
