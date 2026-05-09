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
        <div className="hero-badge">🌍 Free · No signup · 50+ Countries</div>
        <h1>
          What Should You
          <br />
          Earn <em>Worldwide?</em>
        </h1>
        <p>
          Real salary data for 100+ job roles across 50+ countries. Know your worth
          before your next interview.
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
          <h4>Plan your move</h4>
          <p>See how much more you could earn by working abroad in your target country.</p>
        </div>
        <div className="info-card">
          <div className="info-icon">💰</div>
          <h4>Negotiate better</h4>
          <p>Know your market value before your next interview. Never undersell yourself again.</p>
        </div>
      </div>

      <NewsletterForm />
      <ReviewDialog />
      <SiteFooter />
    </>
  );
}
