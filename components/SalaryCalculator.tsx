"use client";

import { useEffect, useRef, useState } from "react";
import {
  COMPARE_LIST,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  DEMAND,
  EXPERIENCE_LABELS,
  EXPERIENCE_MODIFIERS,
  EXPERIENCE_OPTIONS,
  ROLE_DISPLAY,
  ROLE_LABELS,
  TREND,
  type Country,
  type Currency,
  type Experience,
  type Role,
  type RoleLabel,
} from "@/lib/salary-data";
import {
  findRoleMatch,
  fmt,
  getSalaryRange,
  getSuggestions,
  resolveBaseRole,
  type RoleMatch,
} from "@/lib/salary-calc";

interface ResultState {
  role: Role;
  roleLabel: string;
  country: Country;
  countryLabel: string;
  experience: Experience;
  currency: Currency;
  low: number;
  mid: number;
  high: number;
  monthly: number;
  hourly: number;
  demand: string;
  trend: string;
  dotPercent: number;
  compareRows: ReadonlyArray<{
    country: Country;
    name: string;
    flag: string;
    salary: number;
    barPercent: number;
    isYou: boolean;
  }>;
  matchInfo: RoleMatch | null;
  typedLabel: string;
}

const POPULAR: ReadonlyArray<{ role: Role; country: Country; label: string }> = [
  { role: "nurse", country: "uk", label: "Nurse — UK" },
  { role: "software_engineer", country: "usa", label: "Engineer — USA" },
  { role: "teacher", country: "australia", label: "Teacher — Australia" },
  { role: "doctor", country: "uae", label: "Doctor — UAE" },
  { role: "nurse", country: "norway", label: "Nurse — Norway" },
  { role: "software_engineer", country: "germany", label: "Developer — Germany" },
  { role: "nurse", country: "iceland", label: "Nurse — Iceland" },
  { role: "chef", country: "switzerland", label: "Chef — Switzerland" },
  { role: "data_scientist", country: "singapore", label: "Data Scientist — Singapore" },
  { role: "electrician", country: "australia", label: "Electrician — Australia" },
  { role: "accountant", country: "canada", label: "Accountant — Canada" },
  { role: "driver", country: "germany", label: "Truck Driver — Germany" },
  { role: "pharmacist", country: "uk", label: "Pharmacist — UK" },
  { role: "teacher", country: "uae", label: "Teacher — UAE" },
];

export function SalaryCalculator() {
  const [roleText, setRoleText] = useState("");
  const [roleHidden, setRoleHidden] = useState<Role | "">("");
  const [country, setCountry] = useState<Country | "">("");
  const [experience, setExperience] = useState<Experience>("mid");
  const [currency, setCurrency] = useState<Currency>("USD");

  const [suggestions, setSuggestions] = useState<RoleLabel[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [result, setResult] = useState<ResultState | null>(null);

  const roleWrapRef = useRef<HTMLDivElement | null>(null);
  const checkerRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Click-outside handler closes the suggestions box, mirroring the
  // legacy `document.addEventListener('click', ...)` behavior.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!roleWrapRef.current) return;
      if (!roleWrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function refreshSuggestions(query: string) {
    setSuggestions(getSuggestions(query));
    setShowSuggestions(true);
  }

  function pickSuggestion(s: RoleLabel) {
    setRoleText(s.label);
    setRoleHidden(s.key);
    setShowSuggestions(false);
  }

  function runCheck(opts?: { roleOverride?: Role; countryOverride?: Country; labelOverride?: string }) {
    const effectiveRoleHidden = opts?.roleOverride ?? roleHidden;
    const effectiveCountry = opts?.countryOverride ?? country;
    const effectiveText = opts?.labelOverride ?? roleText;

    if (!effectiveText && !effectiveRoleHidden) {
      alert("Please type a job role and select a country.");
      return;
    }
    if (!effectiveCountry) {
      alert("Please type a job role and select a country.");
      return;
    }

    let role: Role | "" = effectiveRoleHidden;
    let matchInfo: RoleMatch | null = null;
    const typedLabel = effectiveText;

    if (!role) {
      matchInfo = findRoleMatch(effectiveText);
      if (matchInfo) role = matchInfo.role.key;
    }
    if (!role) {
      // Unreachable in practice — findRoleMatch's Pass 6 always returns
      // ROLE_LABELS[0]. Kept verbatim with the legacy script for parity.
      alert("Sorry, we could not find a close match. Please try a different term.");
      return;
    }

    const base = getSalaryRange(role, effectiveCountry as Country);
    if (!base) return;

    const m = EXPERIENCE_MODIFIERS[experience] ?? 1;
    const low = Math.round(base[0] * m);
    const mid = Math.round(base[1] * m);
    const high = Math.round(base[2] * m);

    const baseRole = resolveBaseRole(role);
    const roleLabel = ROLE_DISPLAY[role] ?? role;
    const countryLabel = COUNTRY_NAMES[effectiveCountry as Country] ?? effectiveCountry;

    const dotPercent = high === low ? 50 : ((mid - low) / (high - low)) * 100;

    const compareCountries = (
      COMPARE_LIST[baseRole] ?? (["usa", "uk", "australia", "germany", "india", "uae"] as Country[])
    )
      .filter((c) => c !== effectiveCountry)
      .slice(0, 5);
    const ordered: Country[] = [effectiveCountry as Country, ...compareCountries];
    const compareSalaries = ordered.map((c) => {
      const r = getSalaryRange(role, c);
      return r ? Math.round(r[1] * m) : 0;
    });
    const maxSalary = Math.max(...compareSalaries);
    const compareRows = ordered.map((c, i) => ({
      country: c,
      name: COUNTRY_NAMES[c] ?? c,
      flag: COUNTRY_FLAGS[c] ?? "🌐",
      salary: compareSalaries[i],
      barPercent: maxSalary > 0 ? (compareSalaries[i] / maxSalary) * 100 : 0,
      isYou: c === effectiveCountry,
    }));

    setResult({
      role,
      roleLabel,
      country: effectiveCountry as Country,
      countryLabel,
      experience,
      currency,
      low,
      mid,
      high,
      monthly: mid / 12,
      hourly: mid / 2080,
      demand: DEMAND[baseRole] ?? "Moderate →",
      trend: TREND[baseRole] ?? "+6%",
      dotPercent,
      compareRows,
      matchInfo,
      typedLabel,
    });

    // Defer scroll until after the results node renders.
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function quick(role: Role, c: Country) {
    const label = ROLE_LABELS.find((r) => r.key === role)?.label ?? role;
    setRoleHidden(role);
    setRoleText(label);
    setCountry(c);
    setExperience((prev) => prev); // explicit no-op; keep current experience
    setCurrency((prev) => prev);
    runCheck({ roleOverride: role, countryOverride: c, labelOverride: label });
    requestAnimationFrame(() => {
      checkerRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <>
      <div className="checker" ref={checkerRef}>
        <div className="checker-card">
          <div className="checker-form">
            <div className="field">
              <label>
                Job Role <span className="field-hint">— type any role or pick from list</span>
              </label>
              <div className="role-input-wrap" ref={roleWrapRef}>
                <input
                  type="text"
                  placeholder="Type any job role (e.g., Welder, Yoga Instructor)"
                  autoComplete="off"
                  value={roleText}
                  onFocus={() => refreshSuggestions(roleText)}
                  onChange={(e) => {
                    setRoleText(e.target.value);
                    setRoleHidden("");
                    refreshSuggestions(e.target.value);
                  }}
                />
                <div className={`role-suggestions${showSuggestions ? " show" : ""}`}>
                  {suggestions.length === 0 ? (
                    <div className="role-suggestion-empty">
                      No exact match — we&apos;ll show closest data when you search
                    </div>
                  ) : (
                    suggestions.map((s) => (
                      <div
                        key={s.key}
                        className="role-suggestion"
                        onClick={() => pickSuggestion(s)}
                      >
                        {s.label}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="field">
              <label>Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as Country | "")}
              >
                <option value="">Select country...</option>
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value as Experience)}
              >
                {EXPERIENCE_OPTIONS.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="check-btn"
              onClick={() => runCheck()}
            >
              💰 Check Salary Now — Free
            </button>
          </div>

          <div
            id="results"
            ref={resultsRef}
            className={result ? "show" : ""}
          >
            {result && (
              <>
                {result.matchInfo && !result.matchInfo.exact && (
                  <div className="match-banner show">
                    We don&apos;t have specific salary data for &ldquo;
                    <strong>{result.typedLabel}</strong>&rdquo; yet. Showing closest match:{" "}
                    <strong>{result.matchInfo.role.label}</strong>.
                  </div>
                )}

                <div className="result-header">
                  <div className="result-title">
                    <h2>
                      {result.roleLabel} · {result.countryLabel}
                    </h2>
                    <p>
                      {EXPERIENCE_LABELS[result.experience]} · Annual in {result.currency} · 2025
                    </p>
                  </div>
                  <div className="result-salary">
                    <div className="salary-amount">{fmt(result.mid, result.currency)}</div>
                    <div className="salary-period">median annual salary</div>
                  </div>
                </div>

                <div className="range-wrap">
                  <div className="range-labels">
                    <span>Low</span>
                    <span>Median</span>
                    <span>High</span>
                  </div>
                  <div className="range-track">
                    <div className="range-fill" />
                    <div
                      className="range-dot"
                      style={{ left: `${result.dotPercent}%` }}
                    />
                  </div>
                  <div className="range-vals">
                    <span>{fmt(result.low, result.currency)}</span>
                    <span className="mid">{fmt(result.mid, result.currency)}</span>
                    <span>{fmt(result.high, result.currency)}</span>
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="sl">Monthly</div>
                    <div className="sv sv-green">{fmt(result.monthly, result.currency)}</div>
                  </div>
                  <div className="stat-box">
                    <div className="sl">Hourly (est.)</div>
                    <div className="sv sv-blue">{fmt(result.hourly, result.currency)}</div>
                  </div>
                  <div className="stat-box">
                    <div className="sl">Job Demand</div>
                    <div className="sv sv-green">{result.demand}</div>
                  </div>
                  <div className="stat-box">
                    <div className="sl">5yr Growth</div>
                    <div className="sv sv-gold">{result.trend}</div>
                  </div>
                </div>

                <div className="compare-wrap">
                  <div className="compare-title">🌍 Same role in other countries</div>
                  <div>
                    {result.compareRows.map((row) => (
                      <div
                        key={row.country}
                        className={`compare-row${row.isYou ? " c-you" : ""}`}
                      >
                        <span className="c-flag">{row.flag}</span>
                        <span className="c-name">
                          {row.name}
                          {row.isYou ? " ◀ you" : ""}
                        </span>
                        <div className="c-bar">
                          <div className="c-track">
                            <div
                              className="c-fill"
                              style={{ width: `${row.barPercent}%` }}
                            />
                          </div>
                        </div>
                        <span className="c-sal">{fmt(row.salary, result.currency)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="upsells">
                  <a href="https://almijob.almiworld.com" className="upsell">
                    <div className="upsell-tag">🔍 Job Finder</div>
                    <h4>Find Jobs at This Salary</h4>
                    <p>Search 596 job sources across 200+ countries.</p>
                    <span className="upsell-arr">→ Search Jobs</span>
                  </a>
                  <a href="https://almicv.almiworld.com" className="upsell">
                    <div className="upsell-tag">📄 CV Builder</div>
                    <h4>Build a CV for This Role</h4>
                    <p>Professional ATS-optimised CV in minutes.</p>
                    <span className="upsell-arr">→ Build My CV</span>
                  </a>
                  <a href="https://almiworld.com/ebooks-2/" className="upsell">
                    <div className="upsell-tag">📘 Guide — $9</div>
                    <h4>Salary Negotiation Guide</h4>
                    <p>Get paid exactly what you deserve.</p>
                    <span className="upsell-arr">→ Get Ebook</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="popular">
        <div className="popular-title">Popular searches</div>
        <div className="tags">
          {POPULAR.map((p) => (
            <span
              key={`${p.role}-${p.country}`}
              className="tag"
              onClick={() => quick(p.role, p.country)}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
