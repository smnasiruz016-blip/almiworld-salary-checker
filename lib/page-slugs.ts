/**
 * Slug utilities for programmatic landing pages at /salary/{country}/{role}.
 *
 * Slugs are derived from the canonical names in `lib/salary-data.ts` —
 * we do not invent new identifiers (per Phase 2B brief).
 *
 * Role slug: from the role KEY (snake_case → kebab-case).
 *   software_engineer → software-engineer
 *   data_scientist    → data-scientist
 *
 * Country slug: from `COUNTRY_NAMES`, lowercased and kebab-cased.
 *   "United Kingdom" → "united-kingdom"
 *   "Saudi Arabia"   → "saudi-arabia"
 *   "South Korea"    → "south-korea"
 *
 * Override: the `uae` key's display name is "UAE / Dubai" which would
 * produce the awkward slug "uae-dubai". For SEO-canonical reasons we
 * use "united-arab-emirates" instead. Display copy still says "UAE"
 * or "Dubai" where appropriate — only the URL changes.
 */

import {
  COUNTRY_NAMES,
  ROLE_DISPLAY,
  type Country,
  type Role,
} from "./salary-data";

const COUNTRY_SLUG_OVERRIDES: Partial<Record<Country, string>> = {
  uae: "united-arab-emirates",
};

function defaultCountrySlug(country: Country): string {
  return COUNTRY_NAMES[country].toLowerCase().replace(/\s+/g, "-");
}

export function countryToSlug(country: Country): string {
  return COUNTRY_SLUG_OVERRIDES[country] ?? defaultCountrySlug(country);
}

export function roleToSlug(role: Role): string {
  return role.replace(/_/g, "-");
}

const COUNTRY_KEYS = Object.keys(COUNTRY_NAMES) as Country[];
const ROLE_KEYS = Object.keys(ROLE_DISPLAY) as Role[];

const SLUG_TO_COUNTRY: Record<string, Country> = Object.fromEntries(
  COUNTRY_KEYS.map((c) => [countryToSlug(c), c]),
);

const SLUG_TO_ROLE: Record<string, Role> = Object.fromEntries(
  ROLE_KEYS.map((r) => [roleToSlug(r), r]),
);

export function slugToCountry(slug: string): Country | null {
  return SLUG_TO_COUNTRY[slug] ?? null;
}

export function slugToRole(slug: string): Role | null {
  return SLUG_TO_ROLE[slug] ?? null;
}

export function allCountrySlugs(): readonly string[] {
  return Object.keys(SLUG_TO_COUNTRY);
}

export function allRoleSlugs(): readonly string[] {
  return Object.keys(SLUG_TO_ROLE);
}
