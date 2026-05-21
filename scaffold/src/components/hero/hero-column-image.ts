/**
 * Parametri solo per le foto nelle colonne hero: ottimizzazione Next leggera.
 * `sizes` piccolo → l’ottimizzatore genera varianti a risoluzione ridotta.
 */
export const HERO_COLUMN_IMAGE_QUALITY = 52;

/** Larghezza display stimata (colonne strette); non influisce sul layout, solo sul srcset */
export const HERO_COLUMN_IMAGE_SIZES =
  "(max-width: 640px) 36vw, (max-width: 1024px) 18vw, 200px";
