"use client";

import { useState, type FormEvent } from "react";

import { FieldLabel, Honeypot, TextArea, TextInput } from "./FormFields";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
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
      email: String(data.get("email") ?? ""),
      oggetto: String(data.get("oggetto") ?? ""),
      messaggio: String(data.get("messaggio") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contatti", {
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
        className="rounded-2xl border border-fc-primary/20 bg-white px-6 py-7 text-[14px] font-extralight leading-relaxed text-fc-dark"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        <p
          className="text-[10px] font-extralight uppercase tracking-[0.32em] text-fc-primary"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Messaggio inviato
        </p>
        <p className="mt-3">Grazie! Ti risponderemo dalla casella ufficiale del Campus appena possibile.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-[12px] font-extralight tracking-[0.18em] text-fc-primary uppercase transition-colors hover:text-fc-accent"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          Invia un altro messaggio →
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
          <TextInput id="nome" name="nome" type="text" autoComplete="name" required minLength={2} />
        </div>
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <TextInput id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="oggetto">Oggetto</FieldLabel>
        <TextInput id="oggetto" name="oggetto" type="text" placeholder="Es. Informazioni, collaborazione, partnership…" />
      </div>

      <div>
        <FieldLabel htmlFor="messaggio">Messaggio</FieldLabel>
        <TextArea id="messaggio" name="messaggio" rows={6} required minLength={10} maxLength={4000} />
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-fc-primary px-6 py-3.5 text-[12px] font-black tracking-[0.18em] text-white uppercase shadow-sm transition hover:bg-fc-accent disabled:opacity-60 sm:w-auto"
        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
      >
        {status === "sending" ? "Invio in corso…" : "Invia messaggio"}
      </button>
    </form>
  );
}
