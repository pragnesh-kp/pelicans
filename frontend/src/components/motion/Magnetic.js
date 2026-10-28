"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Wrapper that pulls its child slightly towards the mouse pointer (mouse users only)
export default function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const toX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const toY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e) => {
      const box = el.getBoundingClientRect();
      toX((e.clientX - (box.left + box.width / 2)) * strength);
      toY((e.clientY - (box.top + box.height / 2)) * strength);
    };
    const leave = () => {
      toX(0);
      toY(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
