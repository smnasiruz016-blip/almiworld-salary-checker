import { NewsletterForm } from "@/components/NewsletterForm";
import { ReviewDialog } from "@/components/ReviewDialog";
import { SalaryCalculator } from "@/components/SalaryCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export default function HomePage() {
  return (
    <>
      <SiteNav />

      <div className="hero">
        <div className="hero-badge">Free · No signup · 50+ countries</div>
        <h1>
          What you should
          <br />
          <em>actually</em> be paid
        </h1>
        <p>
          Honest salary ranges across 50+ countries and 100+ roles. Including the
          parts most calculators skip — housing allowances, end-of-service bonuses,
          and what the same job pays when you do it abroad instead of at home.
        </p>
        <div className="hero-note">Updated 2026 · Based on government &amp; industry data</div>
      </div>

      <SalaryCalculator />

      <div className="info-grid">
        <div className="info-card">
          <div className="info-icon">📊</div>
          <h4>Real salary data</h4>
          <p>Sourced from government labour stats, major job boards and industry surveys. Updated 2026.</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🌍</div>
          <h4>50+ countries</h4>
          <p>Compare salaries across Europe, Americas, Middle East, Asia and Africa in your currency.</p>
        </div>
        <div className="info-card">
          <div className="info-icon">💡</div>
          <h4>Built for migrating professionals too</h4>
          <p>
            Whether you&apos;re a nurse in Manila considering Riyadh, an engineer in
            Lahore looking at Manchester, or an accountant already working in Dubai
            — the numbers should be honest. Same data, your reality.
          </p>
        </div>
      </div>

      <NewsletterForm />
      <ReviewDialog />
      <SiteFooter />
    </>
  );
}
