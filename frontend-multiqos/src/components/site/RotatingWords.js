"use client";

import { useEffect, useState } from "react";

// Highlighted phrase in the hero that cycles through a few words (multiqos style).
// Screen readers get the first phrase only; reduced motion keeps it still.
export default function RotatingWords({ words, interval = 2600, className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`rotating ${className}`}>
      <span className="visually-hidden">{words[0]}</span>
      <span className="rotating__track" aria-hidden="true">
        {words.map((w, i) => (
          <span key={w} className={`rotating__word ${i === index ? "is-active" : ""}`}>
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
