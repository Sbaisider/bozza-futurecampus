/**
 * Dati di contatto pubblici e configurazione email del sito.
 * NB: questa email viene mostrata sul sito.
 * Per l'invio reale del form, vedi /src/lib/email-config.ts e variabili env.
 */

export const contatti = {
  emailPubblica: "info@futurecampusfabriano.it",
  emailIscrizioni: "iscrizioni@futurecampusfabriano.it",
  sedeAttivita: "Fabriano (AN) — locali Creativity in Fabriano, BPER Banca",
  organizzazione: "Confindustria Ancona — Comitato Territoriale Fabriano",
} as const;
