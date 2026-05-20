/**
 * FAQ raggruppate per argomento.
 * Le risposte possono contenere un link interno (linkTo) ad altre pagine del sito.
 */

export type FaqItem = {
  domanda: string;
  risposta: string;
  linkTo?: { href: string; label: string };
};

export type FaqGruppo = {
  titolo: string;
  voci: FaqItem[];
};

export const faqGruppi: FaqGruppo[] = [
  {
    titolo: "Partecipazione",
    voci: [
      {
        domanda: "Chi può partecipare al Future Campus?",
        risposta:
          "Il Campus è rivolto agli studenti delle scuole superiori del territorio di Fabriano. È pensato in particolare per ragazzi e ragazze interessati a conoscere il mondo del lavoro, le imprese del territorio e a sviluppare competenze trasversali.",
      },
      {
        domanda: "Quanto costa partecipare?",
        risposta:
          "Future Campus è totalmente gratuito per i partecipanti. È sostenuto da Confindustria Ancona, dalla Fondazione Aristide Merloni e da una rete di partner istituzionali e territoriali.",
      },
      {
        domanda: "Come si fa a iscriversi?",
        risposta:
          "Basta compilare il modulo nella pagina Unisciti a noi con i propri dati e una breve motivazione. Verrai ricontattato dall'organizzazione per i passaggi successivi.",
        linkTo: { href: "/unisciti", label: "Vai al modulo di iscrizione" },
      },
      {
        domanda: "Ci sono criteri di selezione?",
        risposta:
          "La selezione tiene conto della motivazione, dell'età e del posto disponibile sulle tre classi. Ti chiediamo solo di essere chiaro sul perché vuoi partecipare nel modulo di iscrizione.",
      },
    ],
  },
  {
    titolo: "Quando e dove",
    voci: [
      {
        domanda: "Quando si svolge il Campus?",
        risposta:
          "Sei settimane consecutive nei mesi di giugno e luglio, due incontri a settimana. L'edizione 2026 parte il 10 giugno e si chiude il 23 luglio.",
      },
      {
        domanda: "Dove si svolgono gli incontri?",
        risposta:
          "Gli incontri si svolgono a Fabriano, principalmente nei locali messi a disposizione da BPER Banca per la mostra Creativity in Fabriano. Sono inoltre previste visite alle aziende del territorio e occasionali trasferte.",
      },
      {
        domanda: "Quanto durano gli incontri settimanali?",
        risposta:
          "Sono previsti due appuntamenti a settimana, in orari pomeridiani, per consentire ai partecipanti di conciliare il Campus con le proprie attività estive.",
      },
    ],
  },
  {
    titolo: "Il percorso",
    voci: [
      {
        domanda: "Come funzionano le tre classi (Beginner, Master, Advanced)?",
        risposta:
          "Chi è alla prima esperienza entra nella Beginner: team building, primi laboratori, incontri con coach. I ragazzi che hanno già fatto la Beginner accedono alla Master, con due giorni intensivi in azienda per costruire un progetto reale. L'Advanced è per chi torna per il terzo anno: l'energia di gruppo diventa il motore di ogni attività.",
      },
      {
        domanda: "Cosa si impara concretamente?",
        risposta:
          "Public speaking, problem solving, lavoro in team, gestione del progetto, basi di intelligenza artificiale, sicurezza sul lavoro, simulazioni di colloqui di lavoro. E si conoscono dal vivo imprenditori, professionisti e istituzioni del territorio.",
      },
      {
        domanda: "Si riceve un attestato finale?",
        risposta:
          "Sì, al termine delle sei settimane viene consegnato a tutti i partecipanti un attestato di partecipazione, con il riconoscimento di Confindustria Ancona.",
      },
    ],
  },
  {
    titolo: "Altre informazioni",
    voci: [
      {
        domanda: "Non posso partecipare a tutti gli incontri: posso comunque iscrivermi?",
        risposta:
          "La partecipazione regolare è fortemente consigliata, perché il Campus è un percorso costruito sulla continuità del gruppo. Eventuali assenze isolate sono ammesse, ma il valore vero del percorso emerge se lo si vive interamente.",
      },
      {
        domanda: "Posso suggerire un'azienda o un esperto da coinvolgere?",
        risposta:
          "Sì, ogni anno il Campus integra nuovi imprenditori, professionisti e realtà del territorio. Puoi proporli scrivendoci tramite la pagina Contatti.",
        linkTo: { href: "/contatti", label: "Vai a Contatti" },
      },
      {
        domanda: "Dove trovo le edizioni passate?",
        risposta:
          "Nella sezione Edizioni del sito trovi l'archivio anno per anno, con i numeri, i temi, le attività e le gallery fotografiche di ciascuna edizione.",
        linkTo: { href: "/edizioni", label: "Vai all'archivio delle edizioni" },
      },
    ],
  },
];
