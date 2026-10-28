"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, CircleCheck } from "lucide-react";
import styles from "./OfferTabs.module.css";

// Service list on the left; the chosen service's details on the right
export default function OfferTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className={styles.box} data-reveal>
      <ul className={styles.list} role="tablist" aria-label="Services">
        {tabs.map((t, i) => (
          <li key={t.href}>
            <button
              type="button"
              role="tab"
              id={`offer-tab-${i}`}
              aria-selected={i === active}
              aria-controls="offer-panel"
              className={`${styles.tab} ${i === active ? styles.active : ""}`}
              onClick={() => setActive(i)}
            >
              {t.label}
              <span className={styles.chev}>
                <ChevronRight size={16} aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div id="offer-panel" role="tabpanel" aria-labelledby={`offer-tab-${active}`} className={styles.panel} key={tab.href}>
        <div className={styles.panelHead}>
          <h3 className={styles.title}>{tab.label}</h3>
          <Link href={tab.href} className="arrow-dot" aria-label={`More about ${tab.label}`}>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.text}>{tab.text}</p>
        {tab.points.length > 0 && (
          <ul className={styles.points}>
            {tab.points.map((p) => (
              <li key={p}>
                <CircleCheck size={18} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.strip}>
          <p>Build your next project with engineers who deliver real results.</p>
          <Link href="/contact" className="btn btn--sm">
            Contact Us <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
