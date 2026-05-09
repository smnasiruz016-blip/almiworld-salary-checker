"use client";

import { useEffect, useRef, useState } from "react";

export function ReviewDialog() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [improvement, setImprovement] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function open() {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }

  function close() {
    dialogRef.current?.close();
  }

  // Click on backdrop closes the dialog. Native <dialog> behaviour:
  // a click on the dialog element itself (not its children) lands on
  // the backdrop area when displayed via showModal().
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    function onClick(e: MouseEvent) {
      if (e.target === dlg) dlg?.close();
    }
    dlg.addEventListener("click", onClick);
    return () => dlg.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const website = (fd.get("website") || "").toString();
    const trimmedComment = comment.trim();
    const trimmedName = displayName.trim();
    if (trimmedComment.length < 10) {
      setError("Please share at least 10 characters of feedback.");
      return;
    }
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://almicv.almiworld.com/api/public/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: trimmedComment,
          improvement: improvement.trim() || undefined,
          displayName: trimmedName,
          source: "almisalary",
          website,
        }),
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
    <>
      <section className="review-strip" aria-labelledby="review-title">
        <div className="review-inner">
          <h2 id="review-title" className="sr-only">
            Share your experience
          </h2>
          <button
            type="button"
            className="review-trigger"
            aria-haspopup="dialog"
            aria-controls="review-dialog"
            onClick={open}
          >
            <div className="review-trigger-icon" aria-hidden="true">
              ★
            </div>
            <div className="review-trigger-text">
              <strong>Share your experience</strong>
              <span>Help us improve AlmiSalary. Your feedback shapes what we build next.</span>
            </div>
            <span className="review-trigger-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </section>

      <dialog id="review-dialog" ref={dialogRef} aria-labelledby="review-dialog-title">
        {success ? (
          <div className="review-success">
            <h3>JazakAllah khair!</h3>
            <p>We read every review. Thank you for sharing your experience.</p>
            <button
              type="button"
              className="review-success-close"
              onClick={close}
            >
              Close
            </button>
          </div>
        ) : (
          <form id="review-form" onSubmit={onSubmit}>
            <button
              type="button"
              className="review-dialog-close"
              aria-label="Close"
              onClick={close}
            >
              ✕
            </button>
            <h3 id="review-dialog-title">Share your experience</h3>
            <p className="review-dialog-sub">Your feedback shapes what we build next.</p>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="honeypot"
            />

            <fieldset className="rating-group" role="radiogroup" aria-label="Rating">
              <legend className="sr-only">Rating</legend>
              {[1, 2, 3, 4, 5].map((n) => (
                <label
                  key={n}
                  className={`star-label${n <= rating ? " filled" : ""}`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={n}
                    checked={rating === n}
                    onChange={() => setRating(n)}
                    required={n === 1}
                  />
                  <span aria-hidden="true">★</span>
                  <span className="sr-only">
                    {n} {n === 1 ? "star" : "stars"}
                  </span>
                </label>
              ))}
            </fieldset>

            <label htmlFor="review-name">Your name</label>
            <input
              id="review-name"
              name="displayName"
              type="text"
              required
              maxLength={80}
              placeholder="How should we credit you?"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <label htmlFor="review-comment">
              Your review <span className="char-count">{comment.length} / 2000</span>
            </label>
            <textarea
              id="review-comment"
              name="comment"
              required
              minLength={10}
              maxLength={2000}
              rows={4}
              placeholder="What did you check with AlmiSalary? What worked well?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <label htmlFor="review-improvement">
              What could we improve? <span className="optional">(optional)</span>
            </label>
            <textarea
              id="review-improvement"
              name="improvement"
              maxLength={2000}
              rows={3}
              placeholder="Optional — share ideas to make AlmiSalary better"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
            />

            {error && (
              <p className="review-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="review-submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
