"use client";

/**
 * Calendario mensile delle attività di un'edizione di Future Campus.
 *
 * Renderizza una griglia 7×N per ogni mese in cui ricadono attività
 * (di solito Giugno + Luglio). Ogni giorno con attività mostra un dot
 * colorato in base alla classe (Beginner verde, Master viola, Advanced
 * coral, Insieme ambra). Click sul giorno apre una modale a schermo
 * intero con il carosello delle 5 foto, titolo, data e descrizione.
 *
 * Lo stato della modale è locale (no URL sync) — l'integrazione con
 * `?attivita=slug` può essere aggiunta dopo come polish.
 */

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";

import type { AttivitaConClasse, ClasseNome } from "@/content/edizioni-attivita";

const FONT_DISPLAY = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

/* ──────────────────────────────────────────────────────────────────────────
   Mappa classe → colore dot (consistent fra calendario e modale).
   ─────────────────────────────────────────────────────────────────────── */
const CLASSE_COLOR: Record<ClasseNome, string> = {
  Beginner: "#1D9E75", // teal-ish green
  Master: "#7F77DD", // purple
  Advanced: "#D85A30", // coral
  Insieme: "#EF9F27", // amber
};

const MESI_IT = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const GIORNI_SETTIMANA_IT = ["L", "M", "M", "G", "V", "S", "D"];

/** Tutte le classi di un'attività (principale + extraClassi se presente). */
function classiOf(a: AttivitaConClasse): ClasseNome[] {
  return a.extraClassi && a.extraClassi.length > 0
    ? [a.classe, ...a.extraClassi]
    : [a.classe];
}

/** Converte "2023-06-16" → { y: 2023, m: 5, d: 16 } (mese 0-indexed). */
function parseISO(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map((s) => Number(s));
  return { y, m: m - 1, d };
}

/** Numero giorni di un mese (0-indexed). */
function daysInMonth(year: number, monthIdx: number): number {
  return new Date(year, monthIdx + 1, 0).getDate();
}

/** Giorno della settimana (0 = lunedì) del primo del mese. */
function firstWeekdayMondayBased(year: number, monthIdx: number): number {
  // JS Date: 0 = Sunday, 1 = Mon, ..., 6 = Sat. Convertiamo a 0 = Mon, 6 = Sun.
  const js = new Date(year, monthIdx, 1).getDay();
  return (js + 6) % 7;
}

/** Formatta data ISO → "16 giugno 2023" */
function formatItaDate(iso: string): string {
  const { y, m, d } = parseISO(iso);
  return `${d} ${MESI_IT[m].toLowerCase()} ${y}`;
}

/** Range ita: "22–23 luglio 2024" (stesso mese) o "30 giugno – 2 luglio 2024" (mesi diversi). */
function formatItaDateRange(data: string, dataFine?: string): string {
  if (!dataFine) return formatItaDate(data);
  const s = parseISO(data);
  const e = parseISO(dataFine);
  if (s.y === e.y && s.m === e.m) {
    return `${s.d}–${e.d} ${MESI_IT[s.m].toLowerCase()} ${s.y}`;
  }
  return `${s.d} ${MESI_IT[s.m].toLowerCase()} – ${e.d} ${MESI_IT[e.m].toLowerCase()} ${s.y}`;
}

type Props = {
  attivita: AttivitaConClasse[];
  /** ID dell'edizione (usato in aria-label). */
  anno: number;
};

export function CalendarioEdizione({ attivita, anno }: Props) {
  /* ── Classi effettivamente presenti nelle attività di quest'edizione.
        Include sia la classe principale che eventuali extraClassi (attività
        condivise). Esempio 2023: ["Beginner","Master","Insieme"] (no Advanced). */
  const classiPresenti = useMemo<ClasseNome[]>(() => {
    const set = new Set<ClasseNome>();
    for (const a of attivita) for (const c of classiOf(a)) set.add(c);
    return (["Beginner", "Master", "Advanced", "Insieme"] as ClasseNome[]).filter(
      (c) => set.has(c),
    );
  }, [attivita]);

  /* ── Raggruppa attività per mese (chiave "YYYY-MM") ───────────────── */
  const mesi = useMemo(() => {
    const byMonth = new Map<string, AttivitaConClasse[]>();
    for (const a of attivita) {
      const key = a.data.slice(0, 7); // "2023-06"
      const arr = byMonth.get(key) ?? [];
      arr.push(a);
      byMonth.set(key, arr);
    }
    return [...byMonth.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, list]) => {
        const { y, m } = parseISO(`${key}-01`);
        return { year: y, monthIdx: m, attivita: list };
      });
  }, [attivita]);

  /* ── Stato modale: lista attività del giorno cliccato + indice attività
        attualmente visualizzata + indice foto. Lista null = chiusa. ────── */
  const [openActivities, setOpenActivities] = useState<AttivitaConClasse[] | null>(null);
  const [openIdx, setOpenIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const aperta = openActivities?.[openIdx] ?? null;

  const close = useCallback(() => {
    setOpenActivities(null);
    setOpenIdx(0);
    setPhotoIdx(0);
  }, []);

  const openDay = useCallback((acts: AttivitaConClasse[]) => {
    if (acts.length === 0) return;
    setOpenActivities(acts);
    setOpenIdx(0);
    setPhotoIdx(0);
  }, []);

  const selectActivity = useCallback((i: number) => {
    setOpenIdx(i);
    setPhotoIdx(0);
  }, []);

  const next = useCallback(() => {
    if (!aperta) return;
    setPhotoIdx((i) => (i + 1) % aperta.foto.length);
  }, [aperta]);

  const prev = useCallback(() => {
    if (!aperta) return;
    setPhotoIdx((i) => (i - 1 + aperta.foto.length) % aperta.foto.length);
  }, [aperta]);

  /* ── Tastiera: Esc chiude, ← → naviga foto ─────────────────────────── */
  useEffect(() => {
    if (!aperta) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aperta, close, next, prev]);

  /* ── Body scroll lock quando la modale è aperta ────────────────────── */
  useEffect(() => {
    if (!aperta) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [aperta]);

  return (
    <section
      className="bg-fc-light px-5 py-12 md:px-8 md:py-16"
      aria-label={`Calendario delle attività dell'edizione ${anno}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Titolo + legenda */}
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[2rem] font-black leading-none tracking-tight text-fc-dark md:text-[2.75rem]"
            style={FONT_DISPLAY}
          >
            Il calendario del {anno}
          </h2>
          <Legenda classi={classiPresenti} />
        </div>

        {/* Una griglia per ogni mese */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {mesi.map((m) => (
            <MeseGriglia
              key={`${m.year}-${m.monthIdx}`}
              year={m.year}
              monthIdx={m.monthIdx}
              attivita={m.attivita}
              onSelect={openDay}
            />
          ))}
        </div>
      </div>

      {/* Modale fotostorie a schermo intero. Apre TUTTE le attività del
          giorno cliccato; se >1, mostra tab strip per switchare. */}
      {openActivities && aperta ? (
        <ModaleAttivita
          attivitaList={openActivities}
          currentIdx={openIdx}
          onSelectActivity={selectActivity}
          photoIdx={photoIdx}
          onClose={close}
          onNext={next}
          onPrev={prev}
          onJump={setPhotoIdx}
        />
      ) : null}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Legenda colori — mostra solo le classi effettivamente presenti nei dati.
   ─────────────────────────────────────────────────────────────────────── */
function Legenda({ classi }: { classi: ClasseNome[] }) {
  if (classi.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-fc-secondary md:text-[13px]">
      {classi.map((c) => (
        <li key={c} className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: CLASSE_COLOR[c] }}
          />
          {c}
        </li>
      ))}
    </ul>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Griglia di un singolo mese (7 colonne, N righe).
   ─────────────────────────────────────────────────────────────────────── */
type MeseProps = {
  year: number;
  monthIdx: number;
  attivita: AttivitaConClasse[];
  /** Riceve TUTTE le attività del giorno cliccato (modale gestisce switch). */
  onSelect: (acts: AttivitaConClasse[]) => void;
};

function MeseGriglia({ year, monthIdx, attivita, onSelect }: MeseProps) {
  const offset = firstWeekdayMondayBased(year, monthIdx);
  const days = daysInMonth(year, monthIdx);

  // Mappa giorno → attività. Per attività multi-giorno (con dataFine) il dot
  // viene replicato su ogni giorno nell'intervallo che ricade in QUESTO mese.
  // Il rendering supporta più dot per cella (max ~3 prima di affollarsi).
  const byDay = useMemo(() => {
    const m = new Map<number, AttivitaConClasse[]>();
    const lastDayOfMonth = daysInMonth(year, monthIdx);
    for (const a of attivita) {
      const start = parseISO(a.data);
      const end = a.dataFine ? parseISO(a.dataFine) : start;
      // Giorno di partenza per QUESTO mese: 1 se l'attività era iniziata prima,
      // altrimenti start.d. Giorno di fine: end.d se nello stesso mese, altrimenti
      // ultimo giorno del mese corrente.
      const fromDay =
        start.y < year || (start.y === year && start.m < monthIdx) ? 1 : start.d;
      const toDay =
        end.y > year || (end.y === year && end.m > monthIdx) ? lastDayOfMonth : end.d;
      for (let d = fromDay; d <= toDay; d++) {
        const arr = m.get(d) ?? [];
        arr.push(a);
        m.set(d, arr);
      }
    }
    return m;
  }, [attivita, year, monthIdx]);

  // Costruisci le celle: leading blanks + giorni
  const totalCells = offset + days;
  const rows = Math.ceil(totalCells / 7);
  const cells: ({ day: number; acts: AttivitaConClasse[] } | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push({ day: d, acts: byDay.get(d) ?? [] });
  while (cells.length < rows * 7) cells.push(null);

  return (
    <div>
      <h3
        className="mb-3 text-[1rem] font-semibold tracking-tight text-fc-dark md:text-[1.125rem]"
        style={FONT_DISPLAY}
      >
        {MESI_IT[monthIdx]} {year}
      </h3>
      {/* Header giorni settimana */}
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase tracking-wider text-fc-secondary md:text-[11px]">
        {GIORNI_SETTIMANA_IT.map((g, i) => (
          <div key={i} className="py-1">
            {g}
          </div>
        ))}
      </div>
      {/* Griglia celle */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) {
            return <div key={i} aria-hidden className="aspect-square" />;
          }
          const hasAct = cell.acts.length > 0;
          return (
            <DayCell
              key={i}
              day={cell.day}
              acts={cell.acts}
              onSelect={hasAct ? () => onSelect(cell.acts) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

function DayCell({
  day,
  acts,
  onSelect,
}: {
  day: number;
  acts: AttivitaConClasse[];
  onSelect?: () => void;
}) {
  const isInteractive = !!onSelect;
  const base =
    "relative aspect-square rounded-md border border-fc-soft/40 bg-white p-1.5 text-left text-[11px] text-fc-secondary transition md:p-2 md:text-[12px]";
  const interactive =
    "hover:border-fc-primary/60 hover:bg-fc-primary/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-primary/40 cursor-pointer";
  const empty = "opacity-70";

  // Tutti i dot da mostrare: per ogni attività una "stripe" colorata; se
  // l'attività è multi-classe (extraClassi), una stripe per ciascuna classe.
  const dots = acts.flatMap((a) =>
    classiOf(a).map((c) => ({ key: `${a.id}-${c}`, color: CLASSE_COLOR[c] })),
  );

  const content = (
    <>
      <span className="block font-medium text-fc-dark">{day}</span>
      {dots.length > 0 && (
        <div className="absolute inset-x-1.5 bottom-1.5 flex gap-1 md:inset-x-2 md:bottom-2">
          {dots.map((d) => (
            <span
              key={d.key}
              aria-hidden
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: d.color }}
            />
          ))}
        </div>
      )}
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`${base} ${interactive}`}
        aria-label={`${day}: ${acts
          .map((a) => `${a.titolo} (${classiOf(a).join(", ")})`)
          .join(", ")}`}
      >
        {content}
      </button>
    );
  }
  return <div className={`${base} ${empty}`}>{content}</div>;
}

/* ──────────────────────────────────────────────────────────────────────────
   Modale fotostorie: overlay + tab strip (se multi-attività) + carosello.
   Tutte le foto di tutte le attività della giornata sono montate in DOM →
   sia il cambio foto che il cambio attività sono istantanei.
   ─────────────────────────────────────────────────────────────────────── */
type ModaleProps = {
  attivitaList: AttivitaConClasse[];
  currentIdx: number;
  onSelectActivity: (i: number) => void;
  photoIdx: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJump: (i: number) => void;
};

function ModaleAttivita({
  attivitaList,
  currentIdx,
  onSelectActivity,
  photoIdx,
  onClose,
  onNext,
  onPrev,
  onJump,
}: ModaleProps) {
  const attivita = attivitaList[currentIdx];
  const multi = attivitaList.length > 1;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={attivita.titolo}
      className="fixed inset-0 z-50 flex items-center justify-center bg-fc-dark/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-fc-dark text-white shadow-2xl md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsante chiudi */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-fc-dark/70 text-white ring-1 ring-white/20 transition hover:bg-fc-dark"
        >
          <span aria-hidden className="text-xl leading-none">
            ×
          </span>
        </button>

        {/* Tab strip: visibile solo se la giornata ha più di un'attività.
            Padding-right per non finire sotto al pulsante chiudi. */}
        {multi && (
          <div className="z-10 flex flex-wrap gap-2 border-b border-white/10 bg-fc-dark px-5 py-3 pr-14 md:px-6">
            {attivitaList.map((a, i) => {
              const active = i === currentIdx;
              const classi = classiOf(a);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onSelectActivity(i)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] transition md:text-[13px] ${
                    active
                      ? "bg-white/15 text-white ring-1 ring-white/30"
                      : "bg-white/5 text-fc-soft ring-1 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  <span aria-hidden className="flex gap-0.5">
                    {classi.map((c) => (
                      <span
                        key={c}
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: CLASSE_COLOR[c] }}
                      />
                    ))}
                  </span>
                  <span className="opacity-80">{classi.join(" · ")}</span>
                  <span aria-hidden className="opacity-40">·</span>
                  <span className={active ? "font-medium" : ""}>{a.titolo}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Carosello: per OGNI attività e OGNI sua foto montiamo un'Image
            (stack di N×5 elementi assoluti). Solo la (currentIdx, photoIdx)
            è opaca → switch attività E switch foto istantanei. */}
        <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 10" }}>
          {attivitaList.flatMap((act, aIdx) =>
            act.foto.map((src, fIdx) => {
              const isVisible = aIdx === currentIdx && fIdx === photoIdx;
              return (
                <div
                  key={`${act.id}-${fIdx}`}
                  aria-hidden={!isVisible}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={
                      isVisible
                        ? `${act.titolo} — foto ${fIdx + 1} di ${act.foto.length}`
                        : ""
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 1024px"
                    quality={75}
                    priority={aIdx === 0 && fIdx === 0}
                    loading={aIdx === 0 && fIdx === 0 ? undefined : "eager"}
                    className="object-contain"
                  />
                </div>
              );
            }),
          )}
          {attivita.foto.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Foto precedente"
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-fc-dark/60 text-white ring-1 ring-white/15 transition hover:bg-fc-dark/90"
              >
                <span aria-hidden>‹</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Foto successiva"
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-fc-dark/60 text-white ring-1 ring-white/15 transition hover:bg-fc-dark/90"
              >
                <span aria-hidden>›</span>
              </button>
            </>
          )}
          {/* Dot indicatori foto */}
          {attivita.foto.length > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {attivita.foto.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onJump(i)}
                  aria-label={`Vai alla foto ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === photoIdx ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Meta + descrizione */}
        {/* Meta + descrizione */}
        <div className="flex-1 overflow-y-auto px-5 py-5 md:px-8 md:py-6">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] text-fc-soft md:text-[13px]">
            {classiOf(attivita).map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
                style={{
                  backgroundColor: `${CLASSE_COLOR[c]}22`,
                  color: CLASSE_COLOR[c],
                }}
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: CLASSE_COLOR[c] }}
                />
                {c}
              </span>
            ))}
            <span className="ml-1">
              {formatItaDateRange(attivita.data, attivita.dataFine)}
            </span>
          </div>
          <h3
            className="text-[1.5rem] font-black leading-tight tracking-tight md:text-[2rem]"
            style={FONT_DISPLAY}
          >
            {attivita.titolo}
          </h3>
          {attivita.descrizione ? (
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-fc-soft md:text-[15px]">
              {attivita.descrizione}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
