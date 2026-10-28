"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { TECH_HUB } from "@/content/siteContent";
import styles from "./TechNetwork.module.css";

// Corner positions of the four logo cards (diagram on the right)
const CORNERS = ["tl", "tr", "bl", "br"];

// Accordion of technology groups on the left; a hub diagram on the right
// where the open group's card lights up (multiqos "Trending Technology")
export default function TechNetwork() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.layout}>
      <div className={styles.accordion}>
        {TECH_HUB.map((g, i) => {
          const isOpen = i === open;
          return (
            <div key={g.name} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
              <h3>
                <button type="button" className={styles.trigger} aria-expanded={isOpen} aria-controls={`tech-${i}`} onClick={() => setOpen(i)}>
                  {g.name}
                  <span className={styles.chev}>
                    <ChevronDown size={18} aria-hidden="true" />
                  </span>
                </button>
              </h3>
              <div id={`tech-${i}`} className={styles.body} hidden={!isOpen}>
                <ul className={styles.caps}>
                  {g.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Link href={g.href} className="btn btn--sm">
                  View More <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.diagram} aria-hidden="true">
        <svg className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            [21, 24],
            [79, 24],
            [21, 76],
            [79, 76],
          ].map(([x, y], i) => (
            <path key={i} d={`M50 50 L${x} 50 L${x} ${y}`} className={i === open ? styles.lineOn : ""} />
          ))}
        </svg>
        {TECH_HUB.map((g, i) => (
          <button
            key={g.name}
            type="button"
            tabIndex={-1}
            className={`${styles.card} ${styles[CORNERS[i]]} ${i === open ? styles.cardOn : ""}`}
            onClick={() => setOpen(i)}
          >
            <span className={styles.logos}>
              {g.logos.filter(Boolean).map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l.name} src={l.logo} alt="" width={30} height={30} loading="lazy" />
              ))}
            </span>
            <span className={styles.label}>{g.label}</span>
          </button>
        ))}
        <span className={styles.hub}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pelicans-mark.svg" alt="" width={56} height={56} />
        </span>
      </div>
    </div>
  );
}
