"use client";

import { useState } from "react";
import SplitText from "@/components/motion/SplitText";
import { TECH_STACK } from "@/content/siteContent";
import styles from "./Home.module.css";

// Grey band: centred title, underlined category tabs, then the chosen
// category's technologies as white logo chips
export default function TechTabs({ tone = "alt" }) {
  const groups = Object.keys(TECH_STACK);
  const [active, setActive] = useState(groups[0]);

  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`} id="tech-stack">
      <div className="container">
        <div className="section-head section-head--center" data-reveal>
          <span className="eyebrow">Technologies</span>
          <h2 className="section-title">
            <SplitText text="Technologies We Work With Every Day" highlight="Every Day" highlightClass="hl" />
          </h2>
          <p className="section-head__intro">Proven languages, frameworks and cloud platforms — chosen to fit your product, team and budget.</p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Technology categories">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={g === active}
              aria-controls="tech-panel"
              className={`${styles.tab} ${g === active ? styles.tabActive : ""}`}
              onClick={() => setActive(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <ul id="tech-panel" role="tabpanel" key={active} className={styles.techChips}>
          {TECH_STACK[active].map((t) => (
            <li key={t.name} className={styles.techChip}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.logo} alt="" width={22} height={22} loading="lazy" />
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
