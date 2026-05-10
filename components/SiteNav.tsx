"use client";

import { useState } from "react";

export function SiteNav() {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <nav>
      <a href="https://almiworld.com" className="nav-logo" aria-label="AlmiWorld home">
        {!imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://almiworld.com/wp-content/uploads/2026/04/almi-latest.png"
            alt="AlmiWorld"
            onError={() => setImgFailed(true)}
          />
        )}
        {imgFailed && (
          <div className="nav-logo-text" style={{ display: "block" }}>
            Almi<span>World</span>
          </div>
        )}
      </a>
      <div className="nav-links">
        <a href="https://almiworld.com">Home</a>
        <a href="https://almijob.almiworld.com">Job Finder</a>
        <a href="https://almicv.almiworld.com">CV Builder</a>
        <a href="https://almicv.almiworld.com/resume-score">ATS Checker</a>
        <a href="https://almistudy.almiworld.com">Universities</a>
        <a href="https://almiworld.com/ebooks-2/">eBooks</a>
        <a href="https://almijob.almiworld.com" className="nav-cta">
          Find Jobs →
        </a>
      </div>
    </nav>
  );
}
