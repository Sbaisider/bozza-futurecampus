/**
 * Informazioni istituzionali di Future Campus Fabriano.
 * Fonti: Confindustria Ancona, Radio Gold, QdM Notizie, CentroPagina, Cronache Ancona.
 * Modificare qui per aggiornare i testi sul sito senza toccare i componenti.
 */

export const siteInfo = {
  nome: "Future Campus Fabriano",
  claim: "Non un semplice campus, ma una vera e propria esperienza di vita.",
  sottoclaim:
    "Sei settimane di formazione, contaminazione e scoperta per i ragazzi delle scuole superiori del territorio di Fabriano e dintorni.",
  marchioDi: "Confindustria Ancona — Comitato Territoriale Fabriano",
  edizioneCorrente: 2026,
  edizioneNumero: "Quinta edizione",
  periodoCorrente: "10 giugno – 23 luglio 2026",
  iscrizioniGratuite: true,
} as const;

export const cosaEFutureCampus = {
  shortLead:
    "Un percorso gratuito di formazione, orientamento e crescita per studenti delle scuole superiori del territorio di Fabriano.",
  long: [
    "Future Campus Fabriano è un progetto nato a febbraio 2022 dall'idea di Gabriele Micozzi e Federica Capriotti, sostenuto fin dal primo giorno dall'ingegner Francesco Merloni e oggi marchio di Confindustria Ancona.",
    "Sei settimane di attività tra giugno e luglio, due incontri a settimana, gratuiti, costruiti su una didattica esperienziale fatta di laboratori pratici, visite in azienda, simulazioni, incontri con imprenditori, coach e professionisti.",
    "L'obiettivo non è insegnare cose nuove: è far vivere esperienze. Toccare con mano il territorio e i suoi mestieri, riconoscere i propri talenti, costruire le competenze trasversali che la scuola da sola non insegna.",
  ],
  paroleChiave: [
    {
      titolo: "Esperienza",
      testo:
        "Imparare vivendo. I ragazzi non assistono a lezioni: mettono le mani in pasta dentro aziende, laboratori e progetti reali.",
    },
    {
      titolo: "Condivisione",
      testo:
        "Lavorare in gruppo è una delle competenze trasversali più difficili e più importanti. Qui si allena ogni giorno, dentro la squadra.",
    },
    {
      titolo: "Passione",
      testo:
        "L'energia positiva che si crea tra ragazzi, coach e imprenditori è il vero motore del Campus. Si vede in ogni attività.",
    },
    {
      titolo: "Contaminazione",
      testo:
        "Mondo della scuola e mondo del lavoro si incontrano. Imprenditori, istituzioni, esperti raccontano il proprio mestiere ai ragazzi e si lasciano interrogare da loro.",
    },
  ],
} as const;

export const padriFondatori = [
  {
    nome: "Gabriele Micozzi",
    ruolo: "Coach e docente di marketing",
    bio: "Esperto di marketing e formazione, è l'ideatore del format del Campus insieme a Federica Capriotti. Disegna ogni anno il percorso esperienziale dei ragazzi.",
  },
  {
    nome: "Federica Capriotti",
    ruolo: "Presidente Comitato Fabriano — Confindustria Ancona",
    bio: "Ha portato il progetto dentro Confindustria e ne è oggi la regia operativa. È nata da una sua intuizione la scelta di costruire un campus diverso da qualsiasi percorso di orientamento esistente.",
  },
  {
    nome: "Ing. Francesco Merloni",
    ruolo: "Padre ideale del Campus",
    bio: "Ha creduto e sostenuto il progetto fin dal primo giorno, attraverso la Fondazione Aristide Merloni. Il suo riconoscimento del ruolo dei giovani nel futuro del territorio è la cornice culturale del Campus.",
  },
] as const;

export const quandoSiSvolge = {
  periodo: "Da metà giugno a fine luglio, ogni anno.",
  dettaglio: "Sei settimane consecutive, due incontri a settimana, al termine dell'anno scolastico.",
  edizione2026: "L'edizione 2026 inizia il 10 giugno e si chiude il 23 luglio.",
} as const;

export const perchéEsiste = {
  lead:
    "Per i ragazzi che amano il proprio territorio ma non immaginano di costruirci il loro futuro.",
  paragrafi: [
    "Da un'indagine sui giovani del territorio è emersa una gioventù spaccata in due: da un lato l'amore per la propria terra, dall'altro la convinzione di doverla lasciare per realizzarsi.",
    "Future Campus nasce per ricucire quella spaccatura: mostrare che il territorio offre opportunità reali, far conoscere ai ragazzi le imprese, gli imprenditori, le istituzioni e i mestieri del posto, restituire loro fiducia nel futuro.",
    "Per noi è un investimento concreto sui giovani — perché il futuro del territorio passa da loro.",
  ],
} as const;

export const riconoscimenti = [
  {
    anno: 2024,
    titolo: "Primo premio — sezione Cultura",
    fonte: 'Concorso "Finanza e Territorio Marche"',
  },
] as const;
