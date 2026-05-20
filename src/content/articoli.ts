/**
 * Articoli del blog Future Campus Fabriano.
 * Aggiungere oggetti nell'array per pubblicare nuovi pezzi.
 */

export type Articolo = {
  slug: string;
  titolo: string;
  sommario: string;
  data: string; // ISO date
  categoria: "Aggiornamenti" | "Storie" | "Territorio" | "Formazione";
  copertina: string;
  paragrafi: string[];
  autore?: string;
};

export const articoli: Articolo[] = [
  {
    slug: "future-campus-2026-iscrizioni-aperte",
    titolo: "Sono aperte le iscrizioni alla quinta edizione",
    sommario:
      "Dal 10 giugno parte il Future Campus 2026. Sei settimane, tre classi, una comunità che cresce ogni anno.",
    data: "2026-04-15",
    categoria: "Aggiornamenti",
    copertina: "/foto/8505.JPG",
    paragrafi: [
      "Anche quest'anno il Campus torna dalla metà di giugno fino a fine luglio, con sei settimane di attività gratuite dedicate ai ragazzi delle scuole superiori del territorio di Fabriano.",
      "Le tre classi — Beginner, Master e Advanced — riprendono insieme: chi è alla prima esperienza scopre il Campus dall'inizio, chi torna prosegue il percorso con attività più avanzate e responsabilità maggiori.",
      "Le iscrizioni si raccolgono dalla pagina Unisciti a noi: basta compilare il modulo con i propri dati e una breve motivazione.",
    ],
  },
  {
    slug: "edizione-2025-consegna-attestati",
    titolo: "Attestati ai 150 ragazzi del Future Campus 2025",
    sommario:
      "Si è chiusa il 23 luglio l'edizione 2025 con la consegna degli attestati a tutti i partecipanti delle tre classi.",
    data: "2025-07-23",
    categoria: "Aggiornamenti",
    copertina: "/foto/7578.JPG",
    paragrafi: [
      "Una platea di famiglie, istituzioni, imprenditori e coach ha accompagnato i 150 ragazzi del Campus 2025 nella consegna ufficiale degli attestati.",
      "Una stagione che ha visto seminari sull'intelligenza artificiale, simulazioni di colloqui di lavoro, visite in azienda, public speaking, problem solving e — per la prima volta — gli ex-Advanced trasformati in coach dei più giovani.",
    ],
  },
  {
    slug: "perche-un-campus-diverso",
    titolo: "Perché un campus diverso, e perché qui",
    sommario:
      "Dietro Future Campus c'è un'indagine sui giovani del territorio. E un'idea: ridare ai ragazzi fiducia nel futuro che hanno qui.",
    data: "2025-03-10",
    categoria: "Territorio",
    copertina: "/foto/3495.JPG",
    paragrafi: [
      "Un'indagine condotta tra i giovani del territorio ha restituito una fotografia spaccata in due: l'amore per la propria terra da una parte, la convinzione di doverla lasciare per realizzarsi dall'altra.",
      "Da quella riflessione è nato il Campus. Una sei settimane in cui i ragazzi entrano in contatto diretto con imprese, istituzioni e mestieri del territorio, per scoprire che le opportunità ci sono — e sono più vicine di quanto pensassero.",
      "Non si tratta di insegnare cose nuove: si tratta di farle vivere. È la differenza tra leggere un mestiere e vederlo, tra ascoltare un imprenditore e provarci.",
    ],
  },
  {
    slug: "premio-finanza-territorio-marche",
    titolo: "Future Campus premiato a 'Finanza e Territorio Marche'",
    sommario:
      "Primo premio nella sezione Cultura del concorso regionale: un riconoscimento al modello esperienziale del Campus.",
    data: "2024-10-12",
    categoria: "Aggiornamenti",
    copertina: "/foto/3400.JPG",
    paragrafi: [
      "Future Campus Fabriano ha conquistato il primo premio nella sezione Cultura del concorso Finanza e Territorio Marche.",
      "Un riconoscimento al lavoro di Confindustria Ancona, Fondazione Merloni, partner e coach che hanno costruito un modello esperienziale unico nel suo genere a livello regionale.",
    ],
  },
];

export function getArticoloBySlug(slug: string): Articolo | undefined {
  return articoli.find((a) => a.slug === slug);
}

export function getArticoliOrdinati(): Articolo[] {
  return [...articoli].sort((a, b) => (b.data > a.data ? 1 : -1));
}
