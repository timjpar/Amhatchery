/**
 * Minimal fixed-window rate limiter held in process memory.
 *
 * Deliberately dependency-free. The trade-off is real and worth stating: the
 * map lives in one serverless instance, so it resets on cold start and is not
 * shared across regions or concurrent instances. It reliably stops casual
 * scripted abuse of the contact form; it does not stop a distributed attacker.
 * The durable backstop is a spend limit on the Vercel account.
 */

/** Cap on tracked keys, so a caller rotating IPs can't grow the map unbounded. */
const MAX_TRACKED_KEYS = 10_000;

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the caller may retry. Only meaningful when `ok` is false. */
  retryAfter: number;
}

export function rateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  // Drop wholly-expired entries before doing anything else, so the map stays
  // proportional to live traffic rather than to total keys ever seen.
  for (const [k, times] of hits) {
    const live = times.filter((t) => t > cutoff);
    if (live.length === 0) hits.delete(k);
    else hits.set(k, live);
  }

  // Pruning can still leave the map large under a rotating-key flood. Evict
  // insertion-oldest first (Map preserves insertion order) to bound memory.
  if (hits.size >= MAX_TRACKED_KEYS) {
    for (const k of hits.keys()) {
      hits.delete(k);
      if (hits.size < MAX_TRACKED_KEYS) break;
    }
  }

  const times = hits.get(key) ?? [];
  if (times.length >= max) {
    const retryAfter = Math.max(1, Math.ceil((times[0] + windowMs - now) / 1000));
    return { ok: false, retryAfter };
  }

  times.push(now);
  hits.set(key, times);
  return { ok: true, retryAfter: 0 };
}
