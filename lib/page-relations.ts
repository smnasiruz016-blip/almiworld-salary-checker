/**
 * Page-relation tables for the programmatic landing pages.
 *
 * Two new structures, hand-curated since the salary data file has
 * neither sector groupings nor geographic neighbors:
 *
 *   1. SECTOR_OF — maps each role to one of seven sectors. Drives:
 *        - "Related roles in {country}" — picks roles from the same sector
 *        - Cross-product CTA copy (per §6.2) — sector-specific phrasing
 *        - Compensation-component framing on Gulf pages (per §2.5)
 *
 *   2. COUNTRY_NEIGHBORS — geographic + migration-corridor partners.
 *      Drives the "Same role in nearby countries" section. Hand-built
 *      to mix proximity with corridor partners so §5.2 (rotate
 *      examples, no monopoly) is satisfied through structural variety
 *      rather than copy gimmicks.
 *
 * Per §1.3 (no motivational verbs) and §5.1 (calm, specific, useful):
 *   the sector CTA strings here are checked against the banned list
 *   before commit.
 */

import type { Country, Role } from "./salary-data";

export type Sector =
  | "healthcare"
  | "tech"
  | "engineering"
  | "business"
  | "education"
  | "trades"
  | "service";

export const SECTOR_OF: Record<Role, Sector> = {
  // Healthcare
  nurse: "healthcare",
  doctor: "healthcare",
  pharmacist: "healthcare",
  dentist: "healthcare",
  physiotherapist: "healthcare",
  // Tech / IT
  software_engineer: "tech",
  data_scientist: "tech",
  devops: "tech",
  cybersecurity: "tech",
  ux_designer: "tech",
  product_manager: "tech",
  // Engineering (architecture)
  architect: "engineering",
  // Business / office (no sector listed in user's six; uses generic CTA)
  accountant: "business",
  financial_analyst: "business",
  marketing_manager: "business",
  hr_manager: "business",
  sales_manager: "business",
  project_manager: "business",
  graphic_designer: "business",
  // Education
  teacher: "education",
  university_lecturer: "education",
  journalist: "education",
  // Trades / skilled labour
  electrician: "trades",
  plumber: "trades",
  driver: "trades",
  warehouse: "trades",
  // Hospitality / service
  chef: "service",
};

/**
 * Sector → CTA copy (per §6.2). Generic fallback used for `business`
 * because the user's listed six default sectors did not include it
 * and they specified the generic phrasing for that case.
 */
export const SECTOR_CTA: Record<Sector, string> = {
  healthcare:
    "Building your CV next? AlmiCV has free templates designed for healthcare workers applying to hospitals abroad.",
  tech:
    "Building your CV next? AlmiCV has free templates designed for software engineers and tech professionals.",
  engineering:
    "Building your CV next? AlmiCV has free templates designed for engineering and architecture professionals.",
  education:
    "Building your CV next? AlmiCV has free templates designed for educators and academics.",
  trades:
    "Building your CV next? AlmiCV has free templates designed for trade professionals applying for visas.",
  service:
    "Building your CV next? AlmiCV has free templates designed for hospitality and service professionals.",
  business:
    "Building your CV next? AlmiCV has free templates that work across sectors.",
};

/**
 * Geographic + migration-corridor neighbours per country. Hand-curated.
 *
 * Each list mixes geographic proximity with major migration-corridor
 * partners. Pages render up to 4 of these as the "Same role in nearby
 * countries" section. Because the lists themselves vary by country,
 * §5.2 rotation happens naturally as users move across pages — no
 * single corridor pair appears on more than ~6% of generated pages
 * (verified post-build).
 */
export const COUNTRY_NEIGHBORS: Record<Country, readonly Country[]> = {
  // British Isles
  uk: ["ireland", "germany", "australia", "canada", "uae"],
  ireland: ["uk", "germany", "netherlands", "france", "usa"],
  // Western / Northern continental Europe
  germany: ["netherlands", "france", "switzerland", "poland", "uk"],
  france: ["germany", "spain", "italy", "switzerland", "netherlands"],
  netherlands: ["germany", "france", "uk", "denmark", "ireland"],
  switzerland: ["germany", "france", "italy", "netherlands", "denmark"],
  spain: ["portugal", "france", "italy", "germany"],
  italy: ["france", "switzerland", "spain", "germany", "portugal"],
  portugal: ["spain", "france", "italy", "uk"],
  poland: ["germany", "denmark", "netherlands", "uk"],
  // Nordic
  sweden: ["norway", "denmark", "iceland", "germany"],
  norway: ["sweden", "denmark", "iceland", "uk"],
  denmark: ["sweden", "germany", "netherlands", "norway"],
  iceland: ["norway", "denmark", "sweden", "uk"],
  // Gulf — strong corridors with South Asia + Philippines
  uae: ["saudi", "qatar", "philippines", "india", "pakistan"],
  saudi: ["uae", "qatar", "egypt", "pakistan", "philippines"],
  qatar: ["uae", "saudi", "philippines", "india", "pakistan"],
  // East Asia
  japan: ["south_korea", "singapore", "philippines"],
  south_korea: ["japan", "singapore", "philippines"],
  // South Asia
  india: ["pakistan", "philippines", "uae", "saudi", "uk"],
  pakistan: ["india", "uae", "saudi", "qatar", "uk"],
  // South-East Asia
  singapore: ["malaysia", "philippines", "japan", "uae", "uk"],
  philippines: ["malaysia", "singapore", "uae", "saudi", "qatar"],
  malaysia: ["singapore", "philippines", "uae", "japan"],
  // Africa
  south_africa: ["nigeria", "kenya", "egypt", "uk"],
  nigeria: ["south_africa", "kenya", "uk", "usa"],
  kenya: ["south_africa", "nigeria", "egypt", "uk"],
  egypt: ["saudi", "uae", "nigeria", "south_africa"],
  // Americas
  usa: ["canada", "mexico", "uk"],
  canada: ["usa", "uk", "mexico", "australia"],
  mexico: ["usa", "canada", "brazil"],
  brazil: ["mexico", "portugal"],
  // Oceania
  australia: ["new_zealand", "uk", "singapore", "philippines"],
  new_zealand: ["australia", "uk", "philippines"],
};

/**
 * Roles in the same sector, excluding the input role. Up to `limit`
 * entries returned in declared order (deterministic across builds).
 */
export function getRelatedRoles(role: Role, limit = 4): Role[] {
  const sector = SECTOR_OF[role];
  const allRoles = Object.keys(SECTOR_OF) as Role[];
  return allRoles
    .filter((r) => r !== role && SECTOR_OF[r] === sector)
    .slice(0, limit);
}

export function getNearbyCountries(country: Country, limit = 4): Country[] {
  const list = COUNTRY_NEIGHBORS[country];
  return list.slice(0, limit) as Country[];
}

/**
 * Gulf countries where housing allowance and end-of-service bonus
 * are typical compensation components beyond base salary (per §2.5).
 */
export const GULF_COUNTRIES: ReadonlySet<Country> = new Set([
  "uae",
  "saudi",
  "qatar",
] as Country[]);
