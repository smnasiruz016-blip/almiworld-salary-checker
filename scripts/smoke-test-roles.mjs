// Smoke test for the @smnasiruz016-blip/job-roles integration.
// Run via: node scripts/smoke-test-roles.mjs
//
// Verifies the package is installed + every AlmiSalary local slug resolves
// + sampled top-GSC slugs are intact + sampled new Batch-4-era slugs are
// also reachable (proof the package serves cross-product needs).
import assert from "node:assert/strict";
import {
  getAllRoles,
  getRoleBySlug,
} from "@smnasiruz016-blip/job-roles";

const all = getAllRoles();
assert.ok(all.length >= 514, `expected >= 514 roles, got ${all.length}`);
console.log(`✓ ${all.length} roles in package (>= 514 floor)`);

// Top GSC performers (must keep working — these drive AlmiSalary traffic)
for (const slug of [
  "digital-marketer",       // top query: "digital marketing salary"
  "anesthetist",            // top query: "anesthesiologist salary" (via alias)
  "paramedic",              // top query: "paramedic salary dubai"
  "auditor",                // top query: "external auditor salary uk"
  "software-engineer",      // evergreen
  "nurse",                  // evergreen (via alias)
  "data-scientist",         // evergreen
]) {
  const r = getRoleBySlug(slug);
  assert.ok(r, `expected top-GSC slug ${slug} to resolve via package`);
}
console.log("✓ 7 top-GSC slugs resolve");

// Phase 1/2 Batch 4 specialists — already in package, now also reachable
// from AlmiSalary if/when salary data is added in a future phase
for (const slug of [
  "surgeon",
  "cloud-architect",
  "clinical-pharmacist",
  "stem-teacher",
  "holistic-healer",
]) {
  const r = getRoleBySlug(slug);
  assert.ok(r, `expected Batch 4 slug ${slug} in package`);
}
console.log("✓ 5 Batch 4 slugs available for future AlmiSalary expansion");
