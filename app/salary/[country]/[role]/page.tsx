import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ReviewDialog } from "@/components/ReviewDialog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import {
  getAllLandingParams,
  getLandingPageData,
  type LandingPageData,
} from "@/lib/landing-page-data";
import { slugToCountry, slugToRole } from "@/lib/page-slugs";

type Params = { country: string; role: string };

export function generateStaticParams() {
  return getAllLandingParams();
}

function rolePlural(roleDisplay: string): string {
  const primary = roleDisplay.split(/\s\(|\s\//)[0].trim();
  return primary + "s";
}

function buildSubhead(d: LandingPageData): string {
  const plural = rolePlural(d.roleDisplay);
  if (d.gulfComponents) {
    return `What ${plural} earn in ${d.countryName} — base pay, housing allowance where applicable, and end-of-service bonus where applicable. Ranges shown for ${plural} already living in ${d.countryName} and for those moving from abroad.`;
  }
  return `What ${plural} earn in ${d.countryName}. Ranges shown for ${plural} already living in ${d.countryName} and for those moving from abroad.`;
}

function buildTitle(d: LandingPageData): string {
  return `${d.roleDisplay} salary in ${d.countryName} — AlmiSalary`;
}

function buildMetaDescription(d: LandingPageData): string {
  const sub = buildSubhead(d);
  if (sub.length <= 160) return sub;
  // Cut at the last full sentence ending under 160 chars.
  const truncated = sub.slice(0, 160);
  const lastStop = Math.max(truncated.lastIndexOf("."), truncated.lastIndexOf(" — "));
  return lastStop > 80 ? truncated.slice(0, lastStop + 1) : truncated.slice(0, 157) + "…";
}

function canonicalUrl(d: LandingPageData): string {
  return `https://almisalary.almiworld.com/salary/${d.countrySlug}/${d.roleSlug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country: countrySlug, role: roleSlug } = await params;
  const country = slugToCountry(countrySlug);
  const role = slugToRole(roleSlug);
  if (!country || !role) return {};

  const d = getLandingPageData(country, role);
  const title = buildTitle(d);
  const description = buildMetaDescription(d);
  const url = canonicalUrl(d);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
  };
}

function fmt(amount: number, symbol: string): string {
  return symbol + amount.toLocaleString();
}

function Breadcrumb({ d }: { d: LandingPageData }) {
  return (
    <nav className="lp-breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">›</span>
      <span>Salary</span>
      <span aria-hidden="true">›</span>
      <span>{d.countryName}</span>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{d.roleDisplay}</span>
    </nav>
  );
}

function ClosestMatchBanner({ d }: { d: LandingPageData }) {
  if (!d.closestMatch || !d.closestMatchBaseRoleDisplay) return null;
  return (
    <div className="lp-closest-banner" role="note">
      We don&apos;t have direct data for <strong>{d.roleDisplay}</strong> in{" "}
      <strong>{d.countryName}</strong> yet. The numbers below are estimated from{" "}
      <strong>{d.closestMatchBaseRoleDisplay}</strong> salaries, which we judge follow
      a similar pattern in this country — but they are not direct measurements for{" "}
      {d.roleDisplay}.
    </div>
  );
}

function SalaryRange({ d }: { d: LandingPageData }) {
  return (
    <section
      className={`lp-range${d.closestMatch ? " lp-range-cm" : ""}`}
      aria-labelledby="lp-range-title"
    >
      <h2 id="lp-range-title" className="lp-section-title">
        Annual salary range
      </h2>
      <div className="lp-range-grid">
        <div className="lp-range-cell">
          <div className="lp-range-label">Low</div>
          <div className="lp-range-native">{fmt(d.rangeNative.low, d.nativeSymbol)}</div>
          <div className="lp-range-usd">≈ ${d.rangeUsdDisplay.low.toLocaleString()} USD</div>
        </div>
        <div className="lp-range-cell lp-range-cell-mid">
          <div className="lp-range-label">Mid</div>
          <div className="lp-range-native">{fmt(d.rangeNative.mid, d.nativeSymbol)}</div>
          <div className="lp-range-usd">≈ ${d.rangeUsdDisplay.mid.toLocaleString()} USD</div>
        </div>
        <div className="lp-range-cell">
          <div className="lp-range-label">High</div>
          <div className="lp-range-native">{fmt(d.rangeNative.high, d.nativeSymbol)}</div>
          <div className="lp-range-usd">≈ ${d.rangeUsdDisplay.high.toLocaleString()} USD</div>
        </div>
      </div>
      <p className="lp-range-meta">
        <span>Source: {d.sourceLabel}</span>
        <span>Last reviewed: {d.lastReviewed}</span>
      </p>
    </section>
  );
}

function CompensationBreakdown({ d }: { d: LandingPageData }) {
  if (!d.gulfComponents) return null;
  return (
    <section className="lp-section" aria-labelledby="lp-breakdown-title">
      <h2 id="lp-breakdown-title" className="lp-section-title">
        Compensation components beyond base
      </h2>
      <p className="lp-prose">
        For many roles in {d.countryName}, base salary is only part of the actual
        compensation package. The components below typically appear separately and
        can materially change total pay — particularly for {rolePlural(d.roleDisplay)} arriving
        from abroad. AlmiSalary does not yet publish ranges for these components;
        the salary range above is for base pay only.
      </p>
      <ul className="lp-component-list">
        <li>
          <strong>Housing allowance.</strong> Often paid as a separate monthly amount or
          provided as employer-arranged accommodation. For some roles this can be 20–30%
          of total compensation.
        </li>
        <li>
          <strong>End-of-service bonus.</strong> A statutory gratuity calculated from years
          of continuous service, paid on contract completion. Rules vary by country.
        </li>
        <li>
          <strong>Repatriation flight.</strong> Annual return ticket to home country, or
          a flight allowance equivalent, common in Gulf contracts.
        </li>
        <li>
          <strong>Health cover.</strong> Employer-provided health insurance for the worker
          and sometimes immediate family.
        </li>
      </ul>
      <p className="lp-prose-faint">
        We surface these as concepts so you have the language to ask a recruiter
        specifically about each component. We do not estimate amounts here because we
        do not yet have direct data on them.
      </p>
    </section>
  );
}

function NearbyCountries({ d }: { d: LandingPageData }) {
  if (d.nearbyCountryLinks.length === 0) return null;
  const plural = rolePlural(d.roleDisplay);
  return (
    <section className="lp-section" aria-labelledby="lp-nearby-title">
      <h2 id="lp-nearby-title" className="lp-section-title">
        Same role in nearby countries
      </h2>
      <p className="lp-prose-faint">
        Comparable {plural.toLowerCase()} salary ranges in countries that share
        geography or migration corridors with {d.countryName}.
      </p>
      <ul className="lp-link-list">
        {d.nearbyCountryLinks.map((l) => (
          <li key={l.country}>
            <Link href={l.href}>
              {d.roleDisplay} in {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RelatedRoles({ d }: { d: LandingPageData }) {
  if (d.relatedRoleLinks.length === 0) return null;
  return (
    <section className="lp-section" aria-labelledby="lp-related-title">
      <h2 id="lp-related-title" className="lp-section-title">
        Related roles in {d.countryName}
      </h2>
      <ul className="lp-link-list">
        {d.relatedRoleLinks.map((l) => (
          <li key={l.role}>
            <Link href={l.href}>
              {l.label} in {d.countryName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CrossProductCta({ d }: { d: LandingPageData }) {
  return (
    <section className="lp-cta" aria-labelledby="lp-cta-title">
      <p id="lp-cta-title" className="lp-cta-text">
        {d.cta}
      </p>
      <a
        href="https://almicv.almiworld.com"
        className="lp-cta-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        almicv.almiworld.com →
      </a>
    </section>
  );
}

function StructuredData({ d }: { d: LandingPageData }) {
  const url = canonicalUrl(d);
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${d.roleDisplay} salary in ${d.countryName}`,
    description: buildSubhead(d),
    datePublished: `${d.lastReviewed}-01-01`,
    dateModified: `${d.lastReviewed}-01-01`,
    author: {
      "@type": "Organization",
      name: "AlmiSalary",
      url: "https://almisalary.almiworld.com",
    },
    publisher: {
      "@type": "Organization",
      name: "AlmiWorld",
      url: "https://almiworld.com",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
  };
  return (
    <script
      type="application/ld+json"
      // The JSON we serialize never contains user input, so dangerouslySetInnerHTML is safe here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default async function LandingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { country: countrySlug, role: roleSlug } = await params;
  const country = slugToCountry(countrySlug);
  const role = slugToRole(roleSlug);
  if (!country || !role) notFound();

  const d = getLandingPageData(country, role);
  const subhead = buildSubhead(d);

  return (
    <>
      <SiteNav />
      <main className="lp-main">
        <Breadcrumb d={d} />
        <header className="lp-header">
          <h1 className="lp-h1">
            {d.roleDisplay} salary in {d.countryName}
          </h1>
          <p className="lp-subhead">{subhead}</p>
          <p className="lp-hero-note">
            Updated {d.lastReviewed} · Based on government &amp; industry data
          </p>
        </header>
        <ClosestMatchBanner d={d} />
        <SalaryRange d={d} />
        <CompensationBreakdown d={d} />
        <NearbyCountries d={d} />
        <RelatedRoles d={d} />
        <CrossProductCta d={d} />
      </main>
      <NewsletterForm />
      <ReviewDialog />
      <SiteFooter />
      <StructuredData d={d} />
    </>
  );
}
