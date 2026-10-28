"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Industries.module.css";

// Desktop: the section sticks while you scroll; every industry gets its own stretch of
// scrolling (so fast scrolling doesn't flick through them), the list slides to keep the
// active name in view and the picture + description cross-fade on the right.
// Phones: every industry is a simple card.
export default function IndustryScroller({ items }) {
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      const wrap = wrapRef.current.getBoundingClientRect();
      const stickyTop = parseFloat(getComputedStyle(stickyRef.current).top) || 0;
      const travel = wrap.height - stickyRef.current.offsetHeight;
      const progress = Math.min(0.9999, Math.max(0, (stickyTop - wrap.top) / travel));
      setActive(Math.floor(progress * items.length));
    };
    const onScroll = () => frame || (frame = requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items.length]);

  const current = items[active];
  return (
    <div className={styles.scroller} ref={wrapRef} style={{ "--count": items.length }}>
      <div className={styles.sticky} ref={stickyRef}>
        <div className={styles.listWindow}>
          <ul className={styles.names} style={{ "--active": active }}>
            {items.map((ind, i) => (
              <li key={ind.name} className={i === active ? styles.activeName : undefined}>
                <Link href={ind.href || "/industries"}>{ind.name}</Link>
                {/* Phones: card content inline */}
                <div className={styles.mobileCard}>
                  {ind.image && (
                    <div className={styles.mobileMedia}>
                      <Image src={ind.image} alt="" fill sizes="100vw" className={styles.image} />
                    </div>
                  )}
                  <p>{ind.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelMedia}>
            {items.map((ind, i) =>
              ind.image ? (
                <Image
                  key={ind.name}
                  src={ind.image}
                  alt=""
                  fill
                  sizes="(max-width: 1300px) 40vw, 520px"
                  className={`${styles.panelImage} ${i === active ? styles.panelImageOn : ""}`}
                />
              ) : null
            )}
          </div>
          {/* key: re-mount so the text fades in with each change */}
          <div key={active} className={styles.panelText} aria-live="polite">
            <span className={styles.counter}>
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <h3>{current.name}</h3>
            <p>{current.description}</p>
            <Link href={current.href || "/industries"} className="btn btn--outline">
              Know More <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
