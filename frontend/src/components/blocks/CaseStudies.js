"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlockHeading } from "./parts";
import styles from "./CaseStudies.module.css";

// Portfolio cards linking to each case study. With `filters` (Portfolio page)
// visitors can show only Web or Mobile projects.
export default function CaseStudies({ heading, intro = [], items = [], filters = [], tone, headingLevel = 3 }) {
  const [filter, setFilter] = useState("All");
  const Heading = `h${headingLevel}`;
  const shown = filter === "All" ? items : items.filter((p) => p.category.split(" ").includes(filter.toLowerCase()));

  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={intro} />
        {filters.length > 1 && (
          <div className={styles.filters} role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button key={f} type="button" className={styles.filter} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        )}
        {/* key: a new list per filter, so the cards animate in again */}
        <ul key={filter} className={styles.grid} data-stagger>
          {shown.map((p) => (
            <li key={p.href} className={styles.card}>
              <div className={styles.cover}>
                {p.image && <Image src={p.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px" className={styles.image} />}
              </div>
              <div className={styles.body}>
                <Heading className={styles.title}>
                  {/* The link covers the whole card (see .title a::after) */}
                  <Link href={p.href}>{p.title}</Link>
                </Heading>
                {p.tags.length > 0 && (
                  <ul className={styles.tags} aria-label="Technologies">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                <span className={styles.more} aria-hidden="true">
                  View case study <ArrowUpRight size={16} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
