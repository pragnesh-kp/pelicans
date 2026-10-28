"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./ProjectShowcase.module.css";

// Pill tabs of featured projects; the panel shows the summary and tilted screenshots
export default function ProjectShowcase({ projects }) {
  const [active, setActive] = useState(0);
  const p = projects[active];
  const go = (step) => setActive((i) => (i + step + projects.length) % projects.length);

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Featured projects">
        <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Previous project">
          <ArrowLeft size={16} />
        </button>
        {projects.map((proj, i) => (
          <button
            key={proj.href}
            type="button"
            role="tab"
            id={`project-tab-${i}`}
            aria-selected={i === active}
            aria-controls="project-panel"
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            {proj.title.split(/\s[–-]\s/)[0]}
          </button>
        ))}
        <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next project">
          <ArrowRight size={16} />
        </button>
      </div>

      {/* key: re-mount on change so the panel animates in */}
      <div key={active} id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${active}`} className={styles.panel}>
        <div className={styles.text}>
          {p.categories.length > 0 && <p className={styles.cats}>{p.categories.join(" · ")}</p>}
          <h3>{p.title}</h3>
          <p className={styles.intro}>{p.intro}</p>
          {p.tags.length > 0 && (
            <ul className={styles.tags} aria-label="Technologies">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <Link href={p.href} className="btn btn--accent">
            View Case Study <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.screen}>
            <Image src={p.screen || p.cover} alt="" fill sizes="(max-width: 900px) 90vw, 560px" className={styles.img} />
          </div>
          {p.mobile && (
            <div className={styles.phone}>
              <Image src={p.mobile} alt="" fill sizes="200px" className={styles.img} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
