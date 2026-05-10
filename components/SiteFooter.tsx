"use client";

import { useState } from "react";

export function SiteFooter() {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <footer>
      <a href="https://almiworld.com" className="footer-logo" aria-label="AlmiWorld home">
        {!imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://almiworld.com/wp-content/uploads/2026/04/almi-latest.png"
            alt="AlmiWorld"
            onError={() => setImgFailed(true)}
          />
        )}
        {imgFailed && (
          <span className="footer-logo-text" style={{ display: "block" }}>
            <strong>AlmiWorld</strong>
          </span>
        )}
      </a>
      <p style={{ marginTop: "0.5rem", marginBottom: "0.8rem" }}>
        Your Global Career Platform
      </p>
      <p>
        <a href="https://almiworld.com">Home</a>
        <a href="https://almijob.almiworld.com">Job Finder</a>
        <a href="https://almicv.almiworld.com">CV Builder</a>
        <a href="https://almicv.almiworld.com/resume-score">ATS Checker</a>
        <a href="https://almistudy.almiworld.com">Universities</a>
        <a href="https://almiworld.com/ebooks-2/">eBooks</a>
      </p>
      <p style={{ marginTop: "0.6rem", fontSize: "0.7rem", opacity: 0.5 }}>
        © 2026 AlmiWorld · Salary data is indicative. Actual salaries vary by employer and location.
      </p>
    </footer>
  );
}
