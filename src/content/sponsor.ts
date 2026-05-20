/**
 * Sponsor, partner istituzionali e sostenitori del Future Campus Fabriano.
 * Categoria: 'promotore' (organizzano), 'istituzionale', 'territoriale', 'sostenitore'.
 */

export type Sponsor = {
  nome: string;
  categoria: "promotore" | "istituzionale" | "territoriale" | "sostenitore";
  descrizione?: string;
};

export const sponsor: Sponsor[] = [
  {
    nome: "Confindustria Ancona",
    categoria: "promotore",
    descrizione:
      "Comitato Territoriale Fabriano. Future Campus è oggi un marchio di Confindustria Ancona.",
  },
  {
    nome: "Fondazione Aristide Merloni",
    categoria: "promotore",
    descrizione:
      "Ha sostenuto il progetto fin dalla prima edizione, su impulso dell'ing. Francesco Merloni.",
  },
  {
    nome: "Camera di Commercio delle Marche",
    categoria: "istituzionale",
    descrizione:
      "Ha reso possibili attività di alto livello, tra cui un viaggio a Bruxelles per la classe Advanced.",
  },
  {
    nome: "Regione Marche",
    categoria: "istituzionale",
    descrizione:
      "Ha aperto le porte del Consiglio regionale ai ragazzi e sostiene il progetto come modello formativo.",
  },
  {
    nome: "Comune di Fabriano",
    categoria: "istituzionale",
    descrizione:
      "Presente nei momenti chiave del Campus, accompagna il progetto sul territorio.",
  },
  {
    nome: "Caritas Diocesi di Fabriano-Matelica",
    categoria: "territoriale",
    descrizione:
      "Sostiene il Campus dal 2024 sotto la guida di Don Marco Strona.",
  },
  {
    nome: "BPER Banca",
    categoria: "sostenitore",
    descrizione:
      "Concede gratuitamente i locali sede della mostra Creativity in Fabriano per le attività del Campus.",
  },
];

export const categorieSponsor: Record<Sponsor["categoria"], string> = {
  promotore: "Promotori",
  istituzionale: "Istituzioni",
  territoriale: "Partner territoriali",
  sostenitore: "Sostenitori",
};

export function getSponsorByCategoria(
  cat: Sponsor["categoria"],
): Sponsor[] {
  return sponsor.filter((s) => s.categoria === cat);
}
