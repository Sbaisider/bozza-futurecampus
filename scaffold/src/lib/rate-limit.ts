/**
 * Rate limiter in-memory, senza dipendenze.
 *
 * NB: lo stato vive nel processo. In locale e su una singola istanza è preciso;
 * su Vercel (serverless) ogni istanza ha la sua Map, quindi la protezione è
 * "best-effort" — sufficiente a fermare spam ingenuo da un singolo IP. Per un
 * limite robusto e condiviso servirebbe uno store esterno (es. Upstash Redis).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

/** Pulizia periodica delle finestre scadute: evita crescita illimitata della Map. */
function sweep(now: number): void {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}

export type RateLimitResult = { ok: boolean; retryAfterSec: number };

/** Fixed-window: max `limit` richieste per `windowMs` per ciascuna `key`. */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }

  bucket.count += 1;
  return { ok: true, retryAfterSec: 0 };
}

/** Estrae l'IP del client dagli header del proxy (Vercel imposta x-forwarded-for). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
