"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-stagger]";

// Drives the scroll-reveal and spotlight effects defined in globals.css.
// - Elements already on screen when it starts are shown straight away (no flicker).
// - Elements added later (client-side navigation) are picked up automatically.
// - Nothing is hidden at all for visitors who prefer reduced motion, or without JavaScript.
export default function MotionProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    const watch = (el, firstRun) => {
      if (el.hasAttribute("data-revealed")) return;
      if (firstRun) {
        // Already visible before motion was switched on: leave it as it is
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
          el.setAttribute("data-revealed", "instant");
          return;
        }
      }
      observer.observe(el);
    };

    document.querySelectorAll(SELECTOR).forEach((el) => watch(el, true));
    root.setAttribute("data-motion", "");

    // New page content after navigation
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches(SELECTOR)) watch(node, false);
          node.querySelectorAll(SELECTOR).forEach((el) => watch(el, false));
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    // Spotlight: tell the hovered card where the cursor is
    const onPointerMove = (e) => {
      const card = e.target.closest?.("[data-spotlight]");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - box.left}px`);
      card.style.setProperty("--my", `${e.clientY - box.top}px`);
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      root.removeAttribute("data-motion");
    };
  }, []);

  return null;
}
