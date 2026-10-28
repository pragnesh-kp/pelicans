"use client";

import { useEffect, useRef, useState } from "react";

// "500+", "60%", "6+", "1,200" -> counts up from 0 when it scrolls into view.
// The real value is in the HTML from the start (search engines, no JavaScript, reduced motion).
export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const match = String(value).match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, numberText, suffix] = match;
    const target = Number(numberText.replace(/,/g, ""));
    const decimals = (numberText.split(".")[1] || "").length;
    const format = (n) => prefix + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    let frame;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(2, -10 * t); // fast start, gentle finish
        setText(format(t === 1 ? target : target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    setText(format(0));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}
