/**
 * Landing-page data composer for /salary/{country}/{role}.
 *
 * Assembles everything the dynamic route needs from the underlying
 * salary tables, slug helpers, and relation tables — into a single
 * object the page component renders without further data lookup.
 *
 * Doctrine notes:
 *   §2.1 — `low/mid/high` always present, never collapsed to a single number
 *   §2.3 — `sourceLabel` honestly cites the basis of the range:
 *            direct pages → "government & industry data, AlmiSalary review 2026"
 *            closest-match pages → "AlmiSalary modeling from {base-role} data"
 *   §2.5 — `gulfComponents: true` flips on housing/EOS qualitative section
 *   §3.1 — `closestMatch` set when the role is alias-resolved; banner copy
 *          uses the canonical "We don't have direct data ... yet" framing
 *   §7.1 — `lastReviewed` is exposed on every page
 */

import {
  COUNTRY_NAMES,
  CURRENCY_RATES,
  CURRENCY_SYMBOLS,
  ROLE_ALIASES,
  ROLE_DISPLAY,
  SALARY_DATA,
  type Country,
  type Currency,
  type Role,
  type SalaryRange,
} from "./salary-data";
import { resolveBaseRole } from "./salary-calc";
import {
  GULF_COUNTRIES,
  SECTOR_CTA,
  SECTOR_OF,
  getRelatedRoles,
  getNearbyCountries,
  type Sector,
} from "./page-relations";
import { countryToSlug, roleToSlug } from "./page-slugs";

/** Native currency per country. Where a country uses the same currency
 *  as another (Eurozone, USD-pegged), we keep the canonical mapping. */
export const COUNTRY_CURRENCY: Record<Country, Currency> = {
  uk: "GBP",
  ireland: "EUR",
  germany: "EUR",
  france: "EUR",
  netherlands: "EUR",
  spain: "EUR",
  italy: "EUR",
  portugal: "EUR",
  poland: "EUR",
  switzerland: "EUR",
  sweden: "EUR",
  norway: "EUR",
  denmark: "EUR",
  iceland: "ISK",
  usa: "USD",
  canada: "CAD",
  mexico: "USD",
  brazil: "USD",
  australia: "AUD",
  new_zealand: "AUD",
  uae: "AED",
  saudi: "AED",
  qatar: "AED",
  singapore: "SGD",
  malaysia: "USD",
  philippines: "USD",
  india: "USD",
  pakistan: "USD",
  japan: "USD",
  south_korea: "USD",
  south_africa: "USD",
  nigeria: "USD",
  kenya: "USD",
  egypt: "USD",
};

const LAST_REVIEWED = "2026";

export interface LandingPageData {
  country: Country;
  countryName: string;
  countrySlug: string;

  role: Role;
  roleDisplay: string;
  roleSlug: string;

  sector: Sector;
  cta: string;

  /** True for alias roles whose data is borrowed from a different base
   *  role (per §3.1). Drives the closest-match banner and visual style. */
  closestMatch: boolean;
  /** When closestMatch, this is the base role whose numbers are shown. */
  closestMatchBaseRole: Role | null;
  closestMatchBaseRoleDisplay: string | null;

  /** [low, mid, high] in USD. Native-currency values are computed
   *  via CURRENCY_RATES; both shown side by side per §2.4. */
  rangeUsd: SalaryRange;
  /** Native-currency display values, already rounded (per fmt() rules). */
  rangeNative: { low: number; mid: number; high: number };
  nativeCurrency: Currency;
  nativeSymbol: string;
  /** USD equivalent for the same range, rounded. Surfaced as a smaller
   *  line beneath the native figures per §2.4 (currency honesty). */
  rangeUsdDisplay: { low: number; mid: number; high: number };

  /** §2.5 Gulf-only flag. */
  gulfComponents: boolean;

  /** §2.3 source attribution string surfaced on the page. */
  sourceLabel: string;
  /** §7.1 last-reviewed year. */
  lastReviewed: string;

  /** Sister-pages: same role in nearby countries. */
  nearbyCountryLinks: ReadonlyArray<{
    country: Country;
    name: string;
    href: string;
  }>;

  /** Sister-pages: related roles in the same country. */
  relatedRoleLinks: ReadonlyArray<{
    role: Role;
    label: string;
    href: string;
  }>;
}

function nativeFigure(usdAmount: number, currency: Currency): number {
  const rate = CURRENCY_RATES[currency] ?? 1;
  return Math.round(usdAmount * rate);
}

export function getLandingPageData(country: Country, role: Role): LandingPageData {
  const baseRole = resolveBaseRole(role);
  const isAlias = role in ROLE_ALIASES;
  const range: SalaryRange = SALARY_DATA[baseRole][country];

  const nativeCurrency = COUNTRY_CURRENCY[country];
  const nativeSymbol = CURRENCY_SYMBOLS[nativeCurrency] ?? "$";
  const rangeNative = {
    low: nativeFigure(range[0], nativeCurrency),
    mid: nativeFigure(range[1], nativeCurrency),
    high: nativeFigure(range[2], nativeCurrency),
  };
  const rangeUsdDisplay = {
    low: range[0],
    mid: range[1],
    high: range[2],
  };

  const sector = SECTOR_OF[role];
  const cta = SECTOR_CTA[sector];

  const sourceLabel = isAlias
    ? `AlmiSalary modeling from ${ROLE_DISPLAY[baseRole]} data, reviewed ${LAST_REVIEWED}`
    : `Government & industry benchmarks, AlmiSalary review ${LAST_REVIEWED}`;

  const nearby = getNearbyCountries(country, 4);
  const related = getRelatedRoles(role, 4);

  return {
    country,
    countryName: COUNTRY_NAMES[country],
    countrySlug: countryToSlug(country),

    role,
    roleDisplay: ROLE_DISPLAY[role],
    roleSlug: roleToSlug(role),

    sector,
    cta,

    closestMatch: isAlias,
    closestMatchBaseRole: isAlias ? baseRole : null,
    closestMatchBaseRoleDisplay: isAlias ? ROLE_DISPLAY[baseRole] : null,

    rangeUsd: range,
    rangeNative,
    nativeCurrency,
    nativeSymbol,
    rangeUsdDisplay,

    gulfComponents: GULF_COUNTRIES.has(country),

    sourceLabel,
    lastReviewed: LAST_REVIEWED,

    nearbyCountryLinks: nearby.map((c) => ({
      country: c,
      name: COUNTRY_NAMES[c],
      href: `/salary/${countryToSlug(c)}/${roleToSlug(role)}`,
    })),

    relatedRoleLinks: related.map((r) => ({
      role: r,
      label: ROLE_DISPLAY[r],
      href: `/salary/${countryToSlug(country)}/${roleToSlug(r)}`,
    })),
  };
}

/**
 * Returns the full Cartesian product (role × country) — the static
 * params for the dynamic route. 27 roles × 34 countries = 918 pages.
 */
export function getAllLandingParams(): { country: string; role: string }[] {
  const allCountries = Object.keys(COUNTRY_NAMES) as Country[];
  const allRoles = Object.keys(ROLE_DISPLAY) as Role[];
  const out: { country: string; role: string }[] = [];
  for (const c of allCountries) {
    for (const r of allRoles) {
      out.push({ country: countryToSlug(c), role: roleToSlug(r) });
    }
  }
  return out;
}
