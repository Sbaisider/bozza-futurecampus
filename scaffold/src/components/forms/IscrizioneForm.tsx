"use client";

import { useState, type FormEvent } from "react";

import { FieldLabel, Honeypot, TextArea, TextInput } from "./FormFields";

type Status = "idle" | "sending" | "ok" | "error";

export function IscrizioneForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nome: String(data.get("nome") ?? ""),
      cognome: String(data.get("cognome") ?? ""),
      dataNascita: String(data.get("dataNascita") ?? ""),
      email: String(data.get("email") ?? ""),
      telefono: String(data.get("telefono") ?? ""),
      motivazione: String(data.get("motivazione") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/iscrizione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Errore durante l'invio");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Errore di rete. Riprova tra qualche istante.");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-fc-primary/20 bg-white px-6 py-8 text-[14px] font-extralight leading-relaxed text-fc-dark"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        <p
          className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Iscrizione ricevuta
        </p>
        <h3
          className="mt-3 text-[22px] font-black leading-tight tracking-tight text-fc-dark"
          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
        >
          Grazie, ci siamo!
        </h3>
        <p className="mt-3">
          Abbiamo ricevuto la tua candidatura. L'organizzazione del Campus ti ricontatterà dalla casella ufficiale per i prossimi passaggi.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-[12px] font-extralight tracking-[0.18em] text-fc-primary uppercase transition-colors hover:text-fc-accent"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Iscrivere un altro partecipante →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Honeypot />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="nome">Nome</FieldLabel>
          <TextInput id="nome" name="nome" type="text" autoComplete="given-name" required minLength={2} />
        </div>
        <div>
          <FieldLabel htmlFor="cognome">Cognome</FieldLabel>
          <TextInput id="cognome" name="cognome" type="text" autoComplete="family-name" required minLength={2} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="dataNascita">Data di nascita</FieldLabel>
          <TextInput id="dataNascita" name="dataNascita" type="date" required />
        </div>
        <div>
          <FieldLabel htmlFor="telefono">Telefono</FieldLabel>
          <TextInput id="telefono" name="telefono" type="tel" autoComplete="tel" required minLength={6} placeholder="Es. +39 333 1234567" />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <TextInput id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div>
        <FieldLabel htmlFor="motivazione">Perché vuoi iscriverti al Campus?</FieldLabel>
        <TextArea
          id="motivazione"
          name="motivazione"
          rows={6}
          required
          minLength={10}
          maxLength={4000}
          placeholder="Raccontaci chi sei, cosa ti aspetti dal Campus, perché ti piacerebbe partecipare."
        />
      </div>

      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          {errorMsg}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center rounded-full bg-fc-primary px-6 py-3.5 text-[12px] font-black tracking-[0.18em] text-white uppercase shadow-sm transition hover:bg-fc-accent disabled:opacity-60 sm:w-auto"
          style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
        >
          {status === "sending" ? "Invio in corso…" : "Invia iscrizione"}
        </button>
        <p
          className="mt-3 text-[11px] font-extralight leading-relaxed text-fc-secondary sm:max-w-md"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Inviando il modulo dichiari di aver preso visione dell'informativa privacy. Conserveremo i tuoi dati solo per la gestione dell'iscrizione al Campus.
        </p>
      </div>
    </form>
  );
}
