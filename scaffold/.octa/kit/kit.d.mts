/**
 * Tipi del site kit `.octa` (OCTAGENCY). File generato da
 * github.com/OPVRA-Q/dotocta: NON modificare, si aggiorna con `octa kit sync`.
 */

export type KitRepo = {
  owner: string;
  name: string;
  /** Branch pubblicato in produzione. Default: `main`. */
  branch?: string;
  /** Cartella del progetto dentro il repo (es. `scaffold`), se non è la radice. */
  rootDir?: string;
};

export type KitOptions = {
  /** Contenuto di `.octa/octa.config.json` (import JSON). */
  manifest: unknown;
  repo: KitRepo;
  /**
   * Percorsi mai modificabili, in aggiunta a quelli fissi del kit (api, auth,
   * pagamenti, testi legali, configurazione…). Relativi alla radice del
   * progetto. Un percorso senza `*` vale come cartella.
   */
  deny?: string[];
  /**
   * File di contenuto del progetto (testi e dati, niente logica): lì sono
   * testo anche le frasi in elenchi e costanti. Relativi alla radice del progetto.
   */
  content?: string[];
  /**
   * Espressioni che segnano un testo regolato (`"€/min"`, `"IVA inclusa"`,
   * `"18+"`): un testo che ne contiene una non si cambia in automatico.
   * Almeno due caratteri l'una, o un simbolo (`"€"`); confronto senza maiuscole.
   */
  protect?: string[];
};

export declare const SITE_KIT_VERSION: string;

/**
 * Crea l'endpoint dei comandi `.octa` per una route di Next.js App Router.
 * Variabili d'ambiente lette alla richiesta: OCTA_PROJECT_TOKEN,
 * OCTA_GITHUB_TOKEN, OCTA_PROJECT_ID (facoltativa), OCTA_KIT_DISABLED.
 */
export declare function createOctaCommandRoute(options: KitOptions): {
  POST: (req: Request) => Promise<Response>;
};
