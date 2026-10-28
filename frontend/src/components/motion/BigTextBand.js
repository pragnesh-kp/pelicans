"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BigTextBand.module.css";

gsap.registerPlugin(ScrollTrigger);

// Oversized words that slide sideways while the band scrolls past (decorative)
export default function BigTextBand({ words = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = ref.current.firstElementChild;
    const tween = gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -35, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 } }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className={styles.band} ref={ref} aria-hidden="true">
      <div className={styles.track}>
        {[...words, ...words].map((w, i) => (
          <span key={i} className={i % 2 ? styles.outline : undefined}>
            {w}
            <span className={styles.dot}>•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
