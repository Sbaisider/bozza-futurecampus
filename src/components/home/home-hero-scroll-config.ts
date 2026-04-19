/**
 * Distanza di scroll mentre la hero è pinata (range in cui lo scrub GSAP è attivo).
 */
export const HERO_PIN_END = "+=100vh";

/** Durata del passaggio hero → Esperienza con un solo gesto (wheel / swipe): più alto = più lento e fluido. */
export const HERO_ONE_GESTURE_SCROLL_SEC = 5

/** Durata minima (secondi) se si completa solo una parte del pin. */
export const HERO_ONE_GESTURE_MIN_SEC = 3

/** Scala finale del titolo (valori altissimi “finiscono” lo zoom subito e lasciano scroll vuoto) */
export const HERO_TITLE_SCALE_MAX = 100;
