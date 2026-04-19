/**
 * Seleziona foto/video per le sezioni homepage (ordine stabile da cartelle).
 */
export type HomeMediaPicks = {
  /** Video per carosello orizzontale sezione Esperienza (MP4 preferiti). */
  esperienzaVideos: string[];
  esperienzaPhotos: string[];
  crescitaBackdrop: string | null;
  vitaGallery: string[];
};

export function pickHomeMedia(
  fotoPaths: string[],
  videoPaths: string[],
): HomeMediaPicks {
  const vids = [...videoPaths];
  const mp4s = vids.filter((v) => /\.mp4$/i.test(v)).sort();
  /** Tutti gli MP4; se assenti, tutti i video compatibili. */
  const esperienzaVideos =
    mp4s.length > 0 ? mp4s : vids.sort();

  const fotos = [...fotoPaths];

  return {
    esperienzaVideos: esperienzaVideos,
    esperienzaPhotos: fotos.slice(0, 3),
    crescitaBackdrop: fotos[3] ?? fotos[0] ?? null,
    vitaGallery: fotos.slice(4, 10).length ? fotos.slice(4, 10) : fotos.slice(0, 6),
  };
}
