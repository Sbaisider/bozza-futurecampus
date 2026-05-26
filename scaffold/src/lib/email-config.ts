/**
 * Configurazione invio email tramite Resend.
 *
 * Setup richiesto (file .env.local):
 *   RESEND_API_KEY=re_xxxxx
 *   EMAIL_FROM=Future Campus <no-reply@futurecampus.it>
 *   EMAIL_TO_ISCRIZIONI=iscrizioni@futurecampus.it
 *   EMAIL_TO_CONTATTI=info@futurecampus.it
 *
 * Per ottenere RESEND_API_KEY: account su https://resend.com, sezione API keys.
 * Per "From" è necessario verificare il dominio in Resend.
 */

export type EmailMode = "live" | "console";

export function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const toIscrizioni = process.env.EMAIL_TO_ISCRIZIONI?.trim();
  const toContatti = process.env.EMAIL_TO_CONTATTI?.trim();

  const isLive = Boolean(apiKey && from && (toIscrizioni || toContatti));

  return {
    mode: (isLive ? "live" : "console") as EmailMode,
    apiKey: apiKey ?? "",
    from: from ?? "Future Campus <no-reply@futurecampus.it>",
    toIscrizioni: toIscrizioni ?? "iscrizioni@futurecampus.it",
    toContatti: toContatti ?? "info@futurecampus.it",
  };
}

/**
 * Invia un'email via Resend con fetch (no SDK per non aggiungere dipendenze).
 * In modalità "console" (env non configurato), logga in console invece di inviare:
 * comodo per lo sviluppo locale prima di avere la API key.
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const cfg = getEmailConfig();

  if (cfg.mode === "console") {
    // eslint-disable-next-line no-console
    console.info(
      "[email/console] mock send (configurare RESEND_API_KEY in .env.local per invio reale)",
      { to, subject, replyTo },
    );
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.apiKey}`,
      },
      body: JSON.stringify({
        from: cfg.from,
        to: [to],
        subject,
        html,
        reply_to: replyTo,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${detail.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "errore sconosciuto" };
  }
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
