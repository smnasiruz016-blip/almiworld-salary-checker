# AlmiSalary Product Principles

**Version 1.0 — May 2026**
**Founder: smnasiruzzaman**
**Status: Active. These principles govern every product decision.**

---

## Preamble

This document inherits from the AlmiCV Product Principles. Where AlmiCV's principles speak about CVs, replace with "salary data" and they apply here. AlmiSalary is the second product in the AlmiWorld family; its principles are not separate from AlmiCV's — they extend them into the specific commitments salary data demands.

This document covers what AlmiSalary specifically promises that AlmiCV does not need to address: data integrity, sparse-data honesty, and the question of who pays.

---

## Section 1 — The Universally Human Foundation

### 1.1 — One question, asked by everyone

AlmiSalary serves one question, asked by everyone who works for money: **what should I actually be paid?**

A nurse in London asks it. A nurse in Manila moving to Riyadh asks it. A software engineer staying in Karachi asks it. A construction supervisor relocating from Dhaka to Doha asks it. The question is universal. The product must serve all of them, not just one.

### 1.2 — Universally human first, culturally specific second

Per AlmiCV §2.4: first build a salary product that works beautifully for everyone. Then layer on the specific cultural enhancements — migration corridor data, end-of-service bonus calculations, housing allowance ranges, family-status modifiers — that the universal product does not need but specific users genuinely require.

The headline of every AlmiSalary page must speak to a person, not to a category. Migration corridors appear in supporting copy and data, not in the headline.

### 1.3 — No motivational verbs

We do not use the words *discover, unlock, dream, transform, empower, journey, aspire,* or any other verb borrowed from Western motivational marketing. People searching for salary data are making financial decisions. They are intelligent adults. We respect them by being calm, specific, and useful.

### 1.4 — No defensive positioning

We do not position AlmiSalary against Glassdoor, PayScale, Indeed, or any other competitor. We do not say "the tools you've been using were not built for you." That language makes the user a victim and us their savior. Both framings violate AlmiCV §1.4. We simply build the better thing and let users find it.

---

## Section 2 — The Data Integrity Promise

### 2.1 — Show ranges, not fake precision

AlmiSalary will always show salary as a range, never as a single number.

A range is honest about what we know: that salary varies by employer, city, experience, certifications, negotiation, and a hundred other factors we cannot capture. A single number pretends a precision we do not have. People in any country know what range of salary they are earning in that country. We do not need to confuse them by showing fake numbers.

This commitment determines the entire UI. Calculator output, comparison charts, landing page summaries, downloadable reports — all show ranges.

### 2.2 — Range structure

Each range shows three points where the data supports it: a low end (representing junior/new entrants or unfavorable conditions), a midpoint (representing typical pay for the stated experience level), and a high end (representing senior/experienced or favorable conditions).

Where data does not support three points, we show fewer points honestly. Two points (low–high) is acceptable. A single point is not.

### 2.3 — Honest source labeling

Every salary range cites the basis of its number. Possible sources include: government labor statistics, professional association reports, public salary surveys, employer disclosures, user-contributed data (if and when we accept it), and our own modeling from related data.

A range derived from modeling is labeled as such. A range from a 2023 government report is labeled as such, with the year visible. We do not present old data as current, and we do not present modeled data as observed.

### 2.4 — Currency honesty

When a salary is converted from one currency to another, we show both the source currency amount and the converted amount, with the exchange rate and date of conversion visible. We do not silently convert and present the result as native.

Currency exchange rates are updated automatically where technically feasible. Where rates are static, the date they were last updated is visible.

### 2.5 — The parts most calculators skip

For many roles in many countries, base salary is only part of the actual compensation. Housing allowance, transportation allowance, end-of-service bonus, family status modifiers, schooling subsidy, repatriation ticket — these are not optional details. For a nurse moving from Manila to Riyadh, the housing allowance can be 30% of total compensation. A salary tool that hides this is not honest.

AlmiSalary surfaces these components where they apply. We do not pretend the gross monthly figure is the whole story when it is not.

---

## Section 3 — The Sparse Data Promise

### 3.1 — When we don't have the data, we say so

For many country and role combinations, we will not have direct data, especially in AlmiSalary's early years. We do not invent numbers to fill in gaps.

When a user requests a country/role combination we lack:

1. We surface the **closest available match** — the same role in a culturally and economically similar country, or a similar role in the same country, or both.
2. We show a clear message explaining what we are doing: "We don't have direct data for {role} in {country} yet. The numbers below are from {closest match}, which may be a useful reference point but is not the same."
3. We invite the user to wait, or to consider the closest match as a directional indicator only.

### 3.2 — Closest match is a tool, not a substitute

Showing closest-match data is a service we provide *with* a transparency message, not *instead of* one. The user must always know they are seeing closest-match data, not direct data, and must be able to tell the difference at a glance.

The visual treatment of closest-match data must differ from direct data — different background, different label, different framing. A user who skims the page must not mistake one for the other.

### 3.3 — We earn data over time

Sparse data is a starting state, not a permanent one. AlmiSalary's roadmap includes growing direct data coverage through: government source ingestion, professional association reports, partnerships with credible labor organizations (where they exist), and — eventually, with appropriate safeguards — user-contributed data.

We never make user-contributed data the primary source for a country/role pair. It supplements and validates other sources; it does not replace them.

### 3.4 — Pages are still useful when data is thin

A landing page for a country/role with thin data still provides value: it surfaces the closest-match information, it explains the components of compensation typical for that role, it links to related roles in the same country and the same role in nearby countries. The page is honest about its limitations and useful within them.

We do not hide pages with thin data. We do not pretend to have what we don't. We do both.

---

## Section 4 — The Independence Promise

### 4.1 — We do not take money from employers

AlmiSalary will never accept payment from employers, recruiters, staffing agencies, manpower agencies, or any party whose interest is in influencing the salary numbers we publish. Not for "verified employer" badges. Not for "featured listings." Not for "sponsored data updates." Not for any reason.

This is non-negotiable. The moment AlmiSalary takes employer money, the data bends — subtly at first, structurally over time. Glassdoor took the money and the data bent. We will not.

### 4.2 — Why this matters

The people who use AlmiSalary are often making decisions worth tens or hundreds of thousands of dollars over the course of a career. A nurse deciding whether to accept a contract in Saudi Arabia is making a multi-year financial commitment based partly on what she believes the role pays. If the salary data she sees has been quietly inflated by an employer who paid for "verified placement," she signs a contract for less than she should have. Her financial life is materially worse because we sold the answer to the question she trusted us with.

We do not do that. Ever.

### 4.3 — How AlmiSalary earns its keep

AlmiSalary stays free for users. It earns through:

- **Passive advertising** (such as Google AdSense) on informational pages, clearly distinguished from data and never on the calculator surface itself.
- **Cross-promotion of other AlmiWorld products** — AlmiCV when the user is ready to apply, AlmiJob when ready to search, AlmiStudy when researching where to qualify.
- **No premium AlmiSalary tier** that gates accuracy. Premium features may exist (saved comparisons, alerts, exports) but the core data is free at full quality for everyone.

We are honest about the ad surface. Ads on a page do not influence what data appears on that page. Ads are ads. Data is data. We do not blur this.

### 4.4 — The promise of fair distance

AlmiSalary maintains fair distance from every party whose interest could influence the data: employers, recruiters, governments seeking to suppress reports of low wages, and even cooperating partners who provide useful information. We accept data from many sources. We do not accept payment from any source whose interest is in a particular number.

This sometimes means saying no to revenue. We will say no.

---

## Section 5 — The User Voice Promise

### 5.1 — Calm, specific, useful

Every AlmiSalary page reads as if written by someone who respects the reader's time and intelligence. No exclamation marks. No urgency tactics. No "limited time" framing. No tricks.

The voice is the same voice as AlmiCV's, applied to salary data: calm, specific, useful. A user who reads ten AlmiSalary pages in a single research session must feel that each one served them, that none manipulated them, and that the same hand wrote all of them.

### 5.2 — Specific examples, not abstract categories

When we name examples, we name specific situations: "a nurse in Manila considering Riyadh," "an accountant already working in Dubai," "an engineer in Lahore looking at Manchester." We do not say "for the migrant workforce" as if "migrants" were one undifferentiated category. People are specific. Our copy reflects that.

We rotate which corridors we name across pages, so that no one corridor monopolizes the surface. A Filipino nurse, a Pakistani engineer, an Indian doctor, a Bangladeshi accountant, a Nepalese hospitality worker, a Kenyan teacher, a Sri Lankan technician — all appear. None is "the example." All are.

### 5.3 — Cross-cultural footing

AlmiSalary respects the religions, family structures, and lifestyle patterns of its users. We do not assume Western family configurations when discussing family status modifiers. We acknowledge that for many users, sending money home is a defining feature of working abroad, and we surface remittance-relevant data (such as currency stability, banking access, transfer fees) where it materially affects salary value.

---

## Section 6 — The Cross-Product Promise

### 6.1 — One family, one voice

AlmiSalary is one of several products in AlmiWorld. Its visual identity, its tone, its data principles, and its commitments to users are consistent with AlmiCV's and will be consistent with AlmiJob, AlmiStudy, and any future product. A user who lands on any AlmiWorld product and clicks through to another must feel they are still with the same company, the same hands, the same promises.

### 6.2 — Cross-product flow is service, not capture

When AlmiSalary suggests AlmiCV ("Building your CV next? AlmiCV has free templates designed for healthcare workers applying to Gulf hospitals."), the suggestion serves the user at the moment of intent. It does not interrupt research. It does not pop up modally. It does not gate salary data behind a CV signup. It appears at the natural transition point — after the salary question is answered, when the next question is "how do I apply?" — and never before.

### 6.3 — No dark patterns across products

The principles AlmiCV commits to (no fake urgency, no manipulative comparisons, no patronizing copy) apply equally when AlmiSalary references AlmiCV. We do not use cross-product surfaces to do what we would not do on a single-product surface.

---

## Section 7 — The Data Update Promise

### 7.1 — Visible currency

Every salary data point on AlmiSalary shows the date of the source data and the date of last review. A user who sees "Updated October 2024" knows what they are looking at and can judge accordingly.

### 7.2 — Update cadence

Salary data is reviewed at least annually for every published country/role combination. High-volatility corridors (currencies under pressure, regulatory changes, new minimum wage laws) are reviewed more often.

We do not hide the date. We do not relabel old data as fresh. If a country/role has not been reviewed in 18 months, the page says so visibly, with a note that the data may have shifted.

### 7.3 — Corrections are public

When we discover that a published salary range was wrong, we update it and note the correction visibly on the page, with the date of the correction. We do not silently change numbers. Users who relied on the wrong data deserve to know that we caught the error and corrected it.

---

## Section 8 — The Founder's Promise

This document is a covenant between AlmiSalary and the people we serve. As long as I am the founder, these principles are non-negotiable. They will not be diluted for revenue, for investors, for partnerships, or for convenience.

Specifically:

- **No employer money.** Ever. No exceptions for "ethical" employers, no exceptions for "vetted" partners, no exceptions for revenue pressure.
- **No fake precision.** Single-number salaries are off-limits regardless of how much cleaner they would look in marketing.
- **No invented data.** Sparse data is handled with closest-match transparency, never by guessing.
- **No motivational fluff.** Calm, specific, useful — always.
- **No manipulation of users at the moment they trust us.** Especially not at the moment a user is making a major financial decision based on what AlmiSalary tells them.

If AlmiSalary ever betrays these principles, that betrayal is a failure of the founder and must be reversed publicly.

---

*End of document. Living version. Future versions document principle additions or refinements with explicit rationale.*
