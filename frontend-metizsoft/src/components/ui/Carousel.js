"use client";

import { Children, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";

// Sideways row of cards that snaps to each card, with page dots underneath
// (multiqos sliders). Native scrolling, so touch and trackpads just work.
// --per-view on the element sets how many cards show at once (CSS).
export default function Carousel({ children, label, className = "", style }) {
  const ref = useRef(null);
  const items = Children.toArray(children);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const first = el.firstElementChild;
      if (!first) return;
      const perView = Math.max(1, Math.round(el.clientWidth / first.getBoundingClientRect().width));
      setPages(Math.max(1, items.length - perView + 1));
      const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0);
      setPage(Math.round(el.scrollLeft / step));
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  const goTo = (i) => {
    const el = ref.current;
    const target = el?.children[i];
    if (target) el.scrollTo({ left: target.offsetLeft - el.firstElementChild.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className={`${styles.wrap} ${className}`} style={style}>
      <ul ref={ref} className={styles.track} aria-label={label}>
        {items.map((child, i) => (
          <li key={i} className={styles.item}>
            {child}
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === page ? styles.active : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show item ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
