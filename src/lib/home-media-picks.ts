/**
 * Seleziona foto/video per le sezioni homepage (ordine stabile da cartelle).
 */
export type HomeMediaPicks = {
  /** Video per carosello orizzontale sezione Esperienza (MP4 preferiti). */
  esperienzaVideos: string[];
  /** Foto per marquee (fallback se non ci sono video). */
  esperienzaPhotos: string[];
  /** Foto principale (prima in cartella). */
  esperienzaSpotlightPhoto: string | null;
  /** Due foto sotto la principale, affiancate (2ª e 3ª in cartella). */
  esperienzaPhotoRow: [string | null, string | null];
  crescitaBackdrop: string | null;
  vitaGallery: string[];
};

export function pickHomeMedia(
  fotoPaths: string[],
  videoPaths: string[],
): HomeMediaPicks {
  const vids = [...videoPaths];
  const mp4s = vids.filter((v) => /\.mp4$/i.test(v)).sort();
  const esperienzaVideos =
    mp4s.length > 0 ? mp4s : vids.sort();

  const fotos = [...fotoPaths];

  const esperienzaSpotlightPhoto = fotos[0] ?? null;
  const esperienzaPhotoRow: [string | null, string | null] = [
    fotos[1] ?? null,
    fotos[2] ?? null,
  ];
  const esperienzaPhotos = fotos.slice(3, 6);

  const crescitaBackdrop =
    fotos[6] ?? fotos[3] ?? esperienzaSpotlightPhoto;

  const vitaGallery =
    fotos.length > 7
      ? fotos.slice(7, 13)
      : fotos.length > 3
        ? fotos.slice(3, Math.min(9, fotos.length))
        : fotos;

  return {
    esperienzaVideos,
    esperienzaPhotos,
    esperienzaSpotlightPhoto,
    esperienzaPhotoRow,
    crescitaBackdrop,
    vitaGallery,
  };
}
