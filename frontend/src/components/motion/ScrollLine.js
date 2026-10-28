"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// A vertical line that fills from top to bottom while its parent scrolls past.
// Static (fully drawn) for visitors who prefer reduced motion.
export default function ScrollLine({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fill = ref.current;
    const tween = gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: fill.parentElement, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <span className={className} aria-hidden="true">
      <span ref={ref} data-line-fill="" />
    </span>
  );
}
