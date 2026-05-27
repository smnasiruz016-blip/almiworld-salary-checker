/**
 * AlmiSalary — adapter over @smnasiruz016-blip/job-roles.
 *
 * Phase 3 integration target: zero URL surface change. The package becomes
 * available for metadata enrichment (industry, collar, search volume hint),
 * but `lib/salary-data.ts` remains the canonical source of truth for:
 *   - which slugs generate URLs (ROLE_DISPLAY keys → 72 entries)
 *   - role display names (h1, meta title)
 *   - SALARY_DATA numerical values
 *   - ROLE_ALIASES mapping (aliases → BaseRole for salary calc)
 *
 * The package adds:
 *   - Cross-product slug allowlist sanity check at build time
 *     (`assertSlugCoverage` — throws if any AlmiSalary slug disappears
 *      from a future package release)
 *   - Optional metadata lookup via `getPackageRole(role)` for SEO copy
 *     and structured data
 *
 * Future phases may flip the source of truth so the package drives both
 * slugs and display names; this file is the seam that makes that flip
 * a one-file change.
 */

import {
  getAllRoles,
  getRoleBySlug,
  Industry,
  CollarType,
  type JobRole,
} from "@smnasiruz016-blip/job-roles";

import { type Role, ROLE_DISPLAY } from "./salary-data";
import { roleToSlug } from "./page-slugs";

export { getAllRoles, getRoleBySlug, Industry, CollarType };
export type { JobRole };

/** Look up package metadata for an AlmiSalary local Role. Resolves through
 *  primary slugs AND alias-derived slugs (e.g. "nurse" → registered-nurse
 *  via the v0.1.2 alias). */
export function getPackageRole(role: Role): JobRole | undefined {
  return getRoleBySlug(roleToSlug(role));
}

/** Build-time guard: every local AlmiSalary slug must resolve via the
 *  package, otherwise a future package release could silently delete a
 *  GSC-indexed URL on next deploy. Called once at module load so any
 *  drift surfaces during `next build` rather than at request time. */
export function assertSlugCoverage(): void {
  const local = Object.keys(ROLE_DISPLAY) as Role[];
  const missing = local.filter((r) => !getRoleBySlug(roleToSlug(r)));
  if (missing.length > 0) {
    throw new Error(
      `[roles] ${missing.length} AlmiSalary local slugs not in @smnasiruz016-blip/job-roles: ` +
        missing.join(", ") +
        ". Package may need a v0.1.x+ release to add aliases for these.",
    );
  }
}

// Run the guard immediately on import so the next build fails fast if the
// package ever drops a slug AlmiSalary depends on. Cost is one Map lookup
// per slug at module init (~72 lookups, sub-ms).
assertSlugCoverage();
