import { NextResponse } from "next/server";

import { escapeHtml, getEmailConfig, sendEmail } from "@/lib/email-config";
import { clientIp, rateLimit } from "@/lib/rate-limit";

type ContattoPayload = {
  nome?: string;
  email?: string;
  oggetto?: string;
  messaggio?: string;
  website?: string; // honeypot
};

const MAX_BODY_BYTES = 100_000;

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  const limit = rateLimit(`contatti:${clientIp(req)}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Troppe richieste. Riprova tra poco." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload troppo grande" }, { status: 413 });
  }

  let body: ContattoPayload;
  try {
    body = (await req.json()) as ContattoPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON non valido" }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const nome = (body.nome ?? "").trim();
  const email = (body.email ?? "").trim();
  const oggetto = (body.oggetto ?? "").trim() || "Messaggio dal sito";
  const messaggio = (body.messaggio ?? "").trim();

  const errori: string[] = [];
  if (nome.length < 2) errori.push("nome");
  if (!isEmail(email)) errori.push("email");
  if (messaggio.length < 10) errori.push("messaggio (almeno 10 caratteri)");
  if (messaggio.length > 4000) errori.push("messaggio (troppo lungo)");

  if (errori.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Campi non validi: ${errori.join(", ")}` },
      { status: 400 },
    );
  }

  const cfg = getEmailConfig();

  const html = `
    <div style="font-family:Manrope,system-ui,sans-serif; color:#070808; line-height:1.55;">
      <p style="color:#244c90; letter-spacing:.2em; text-transform:uppercase; font-size:11px; margin:0 0 6px;">Future Campus — Nuovo messaggio</p>
      <h1 style="font-family:Montserrat,system-ui,sans-serif; font-size:22px; margin:0 0 18px;">${escapeHtml(oggetto)}</h1>
      <table style="border-collapse:collapse; font-size:14px;">
        <tr><td style="padding:6px 14px 6px 0; color:#77819a;">Da</td><td>${escapeHtml(nome)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0; color:#77819a;">Email</td><td>${escapeHtml(email)}</td></tr>
      </table>
      <div style="margin-top:18px;">
        <p style="color:#77819a; font-size:12px; letter-spacing:.18em; text-transform:uppercase; margin:0 0 6px;">Messaggio</p>
        <p style="background:#f3f5f7; padding:14px 16px; border-radius:10px; margin:0; white-space:pre-wrap;">${escapeHtml(messaggio)}</p>
      </div>
    </div>
  `;

  const result = await sendEmail({
    to: cfg.toContatti,
    subject: `[Sito] ${oggetto} — ${nome}`,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
