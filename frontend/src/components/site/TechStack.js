"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { TECH_STACK } from "@/content/siteContent";
import styles from "./TechStack.module.css";

const CATEGORIES = Object.keys(TECH_STACK);

export default function TechStack() {
  const [active, setActive] = useState(CATEGORIES[0]);

  // Arrow keys move between tabs (standard tab keyboard behaviour)
  function onKeyDown(e) {
    const i = CATEGORIES.indexOf(active);
    let next = null;
    if (e.key === "ArrowRight") next = CATEGORIES[(i + 1) % CATEGORIES.length];
    if (e.key === "ArrowLeft") next = CATEGORIES[(i - 1 + CATEGORIES.length) % CATEGORIES.length];
    if (next) {
      e.preventDefault();
      setActive(next);
      document.getElementById(`tab-${slug(next)}`)?.focus();
    }
  }

  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Technology"
          title="Technologies & platforms we use"
          intro="Modern, proven tools — chosen for what your product needs, not what is trendy."
        />

        <div className={styles.tabs} role="tablist" aria-label="Technology categories" onKeyDown={onKeyDown}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`tab-${slug(cat)}`}
              type="button"
              role="tab"
              aria-selected={active === cat}
              aria-controls="tech-panel"
              tabIndex={active === cat ? 0 : -1}
              className={`${styles.tab} ${active === cat ? styles.activeTab : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul id="tech-panel" role="tabpanel" aria-labelledby={`tab-${slug(active)}`} className={styles.panel}>
          {TECH_STACK[active].map((tech) => (
            <li key={tech.name} className={styles.chip}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tech.logo} alt="" width={28} height={28} className={styles.logo} />
              {tech.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
