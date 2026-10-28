"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Height of the sticky header (CSS --header-h), so the pinned section sits just below it
const headerHeight = () =>
  parseFloat(getComputedStyle(document.querySelector(".site") || document.documentElement).getPropertyValue("--header-h")) || 80;

// Pins the section while its columns (children with data-column) slide up at
// different speeds until they line up. Desktop only; off for reduced motion.
export default function PinnedColumns({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const columns = gsap.utils.toArray(ref.current.querySelectorAll("[data-column]"));
      // later columns start lower and travel further
      columns.forEach((col, i) => gsap.set(col, { y: i * 50 }));
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: () => `top top+=${headerHeight()}`, end: "+=520", pin: true, scrub: 0.5 },
      });
      columns.forEach((col) => tl.to(col, { y: 0, ease: "none" }, 0));
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
