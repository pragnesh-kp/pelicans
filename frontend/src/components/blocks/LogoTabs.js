"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./LogoCategories.module.css";

// Pill tabs (one per category) above a grid of white logo tiles
export default function LogoTabs({ groups }) {
  const [active, setActive] = useState(0);
  const tabs = groups.length > 1;
  const group = groups[active];

  return (
    <>
      {tabs && (
        <div className={styles.tabs} role="tablist" aria-label="Technology categories">
          {groups.map((g, i) => (
            <button
              key={g.name || i}
              type="button"
              role="tab"
              id={`logo-tab-${i}`}
              aria-selected={i === active}
              aria-controls="logo-panel"
              className={styles.tab}
              onClick={() => setActive(i)}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}
      {/* key: a fresh list per tab so the tiles animate in again */}
      <ul key={active} id="logo-panel" role={tabs ? "tabpanel" : undefined} aria-labelledby={tabs ? `logo-tab-${active}` : undefined} className={styles.tiles}>
        {group.items.map((t, i) => {
          const body = (
            <>
              {t.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.logo} alt="" width={44} height={44} loading="lazy" className={styles.logo} />
              )}
              <span>{t.name}</span>
            </>
          );
          return (
            <li key={t.name + i} style={{ "--i": Math.min(i, 14) }}>
              {t.href ? (
                <Link href={t.href} className={`${styles.tile} ${styles.link}`}>
                  {body}
                </Link>
              ) : (
                <span className={styles.tile}>{body}</span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
