import { FilmEdizione } from "@/components/site/FilmEdizione";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { getUltimoFilm } from "@/content/edizioni";

/**
 * Film dell'ultima edizione: subito dopo il Manifesto, sullo stesso fondo
 * bianco (il manifesto dice cos'è il Campus, il film lo fa vedere).
 * Si aggiorna da solo: prende l'edizione più recente che ha `film` in
 * `content/edizioni.ts`. Se nessuna edizione ha un film, la sezione sparisce.
 */
export function HomeFilmSection() {
  const ultimo = getUltimoFilm();
  if (!ultimo) return null;
  const { film, anno } = ultimo;

  return (
    <section
      aria-label={`Il film dell'edizione ${anno}`}
      className="relative z-10 bg-fc-white"
    >
      <div className="mx-auto max-w-5xl px-5 pb-20 sm:pb-28 md:px-8 md:pb-36 lg:pb-44">
        <SectionEyebrow label={`Il film · Edizione ${anno}`} title={film.titolo} />
        <Reveal delay={260} className="mt-8 sm:mt-10 md:mt-14">
          <FilmEdizione film={film} anno={anno} className="rounded-md" />
        </Reveal>
      </div>
    </section>
  );
}
