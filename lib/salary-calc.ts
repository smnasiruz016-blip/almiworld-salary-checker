/**
 * Pure helper functions extracted from the legacy inline `<script>`.
 *
 * Faithful port — no logic changes:
 *   • `findRoleMatch` keeps the 6-pass algorithm including the final
 *     fallback that returns `ROLE_LABELS[0]` (nurse). That makes the
 *     `if (!role)` branch in the consumer effectively unreachable; the
 *     consumer keeps the alert anyway to mirror legacy behavior. Both
 *     are tracked as a follow-up for Phase 2.
 *   • `fmt` rounds *after* the currency-rate multiply, matching legacy
 *     line 502. Tiny precision drift on non-USD output is intentional.
 */

import {
  CURRENCY_RATES,
  CURRENCY_SYMBOLS,
  ROLE_ALIASES,
  ROLE_LABELS,
  SALARY_DATA,
  type BaseRole,
  type Country,
  type Currency,
  type Role,
  type RoleLabel,
  type SalaryRange,
} from "./salary-data";

export function fmt(usd: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "$";
  const rate = CURRENCY_RATES[currency] ?? 1;
  return symbol + Math.round(usd * rate).toLocaleString();
}

/** Resolve a role to its base role for lookups (alias-aware). */
export function resolveBaseRole(role: Role): BaseRole {
  if (role in ROLE_ALIASES) {
    return ROLE_ALIASES[role as keyof typeof ROLE_ALIASES];
  }
  return role as BaseRole;
}

/** Look up a salary range. Falls back to UK if the country has no
 *  data for the role — matches legacy `d[c]||d['uk']`. */
export function getSalaryRange(role: Role, country: Country): SalaryRange | null {
  const base = resolveBaseRole(role);
  const byCountry = SALARY_DATA[base];
  if (!byCountry) return null;
  return byCountry[country] ?? byCountry.uk;
}

export interface RoleMatch {
  role: RoleLabel;
  exact: boolean;
}

/**
 * Six-pass closest-match algorithm. Verbatim port of the legacy
 * `findRoleMatch`. Always returns a result for non-empty queries
 * because Pass 6 falls back to `ROLE_LABELS[0]`.
 */
export function findRoleMatch(query: string): RoleMatch | null {
  if (!query) return null;
  const q = query.toLowerCase().trim();

  // Pass 1: exact label match
  for (const r of ROLE_LABELS) {
    if (r.label.toLowerCase() === q) return { role: r, exact: true };
  }
  // Pass 2: keyword exact match
  for (const r of ROLE_LABELS) {
    for (const k of r.keywords) {
      if (k === q) return { role: r, exact: true };
    }
  }
  // Pass 3: substring match in keywords (either direction)
  for (const r of ROLE_LABELS) {
    for (const k of r.keywords) {
      if (k.indexOf(q) !== -1 || q.indexOf(k) !== -1) {
        return { role: r, exact: false };
      }
    }
  }
  // Pass 4: substring match in label
  for (const r of ROLE_LABELS) {
    if (r.label.toLowerCase().indexOf(q) !== -1) return { role: r, exact: false };
  }
  // Pass 5: word-overlap fallback
  const qWords = q.split(/\s+/);
  let bestScore = 0;
  let bestRole: RoleLabel | null = null;
  for (const r of ROLE_LABELS) {
    const allText = (r.label + " " + r.keywords.join(" ")).toLowerCase();
    let score = 0;
    for (const w of qWords) {
      if (w.length >= 3 && allText.indexOf(w) !== -1) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestRole = r;
    }
  }
  if (bestRole) return { role: bestRole, exact: false };

  // Pass 6: ultimate fallback — first label (nurse).
  return { role: ROLE_LABELS[0], exact: false };
}

/** Suggestions for the typeahead dropdown — up to 8 matches. */
export function getSuggestions(query: string): RoleLabel[] {
  if (!query) return ROLE_LABELS.slice(0, 8);
  const q = query.toLowerCase().trim();
  const matches: RoleLabel[] = [];
  for (const r of ROLE_LABELS) {
    const allText = (r.label + " " + r.keywords.join(" ")).toLowerCase();
    if (allText.indexOf(q) !== -1) matches.push(r);
  }
  return matches.slice(0, 8);
}
