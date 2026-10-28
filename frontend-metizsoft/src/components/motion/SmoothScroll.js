"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = -96; // header height + a little breathing room

// Sets the scroll position after every page change:
// - link click: start at the top (or at #section when the link has one)
// - Back / Forward: return to where the visitor was on that page
// Works with and without Lenis (reduced motion turns Lenis off).
function RouteScroll() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const first = useRef(true);
  const popped = useRef(false);
  const positions = useRef(new Map()); // "/path?query" -> last scroll position
  const restoreY = useRef(null); // position to return to after Back / Forward

  useEffect(() => {
    const markBack = (url) => {
      popped.current = true;
      restoreY.current = positions.current.get(url.pathname + url.search) ?? null;
    };
    // Navigation API (reports Back/Forward before Next.js handles it); popstate as fallback
    const onNavigate = (e) => e.navigationType === "traverse" && markBack(new URL(e.destination.url));
    const onPop = () => !popped.current && markBack(location);
    window.navigation?.addEventListener("navigate", onNavigate);
    let frame = 0;
    const onScroll = () => {
      if (popped.current) return; // don't overwrite while a Back / Forward is being restored
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => positions.current.set(location.pathname + location.search, window.scrollY));
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.navigation?.removeEventListener("navigate", onNavigate);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const backOrForward = popped.current;
    const saved = restoreY.current;
    const lenis = window.__lenis;

    const place = () => {
      if (backOrForward) {
        const y = saved ?? window.scrollY;
        window.scrollTo({ top: y, left: 0, behavior: "instant" });
        lenis?.resize();
        lenis?.scrollTo(y, { immediate: true, force: true });
        return;
      }
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: HEADER_OFFSET, immediate: true, force: true });
        else target.scrollIntoView();
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      lenis?.scrollTo(0, { immediate: true, force: true });
    };

    place();
    // once more after the new page has painted, then let ScrollTrigger measure it
    const id = requestAnimationFrame(() => {
      place();
      lenis?.resize();
      ScrollTrigger.refresh();
      popped.current = false;
      restoreY.current = null;
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, search]);

  return null;
}

// Smooth (eased) mouse-wheel scrolling with Lenis, driven by GSAP's ticker so
// ScrollTrigger effects stay in step. Touch scrolling stays native.
// Off for visitors who prefer reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: HEADER_OFFSET }, autoRaf: false });
    window.__lenis = lenis; // the header pauses it while the mobile menu is open
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <RouteScroll />
    </Suspense>
  );
}
