"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = (fd.get("email") || "").toString().trim();
    const website = (fd.get("website") || "").toString();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://almicv.almiworld.com/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "almisalary", website }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data: { error?: string } = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <section className="newsletter-strip" aria-labelledby="newsletter-title">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <h2 id="newsletter-title">Stay in the loop</h2>
          <p>Be the first to know about new salary data, country expansions, and tools.</p>
        </div>
        {success ? (
          <p className="newsletter-success">Thanks! You&apos;re on the list.</p>
        ) : (
          <form className="newsletter-form" onSubmit={onSubmit} noValidate>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="honeypot"
            />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              maxLength={254}
              placeholder="your@email.com"
              autoComplete="email"
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        {error && (
          <p className="newsletter-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
