"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { INDUSTRIES } from "@/content/siteContent";
import styles from "./Industries.module.css";

// Industry names down the left with a marker on the chosen one;
// a grey card with its text and photo on the right (multiqos pattern)
export default function Industries({
  title = "Solving complex challenges across every major industry",
  intro = "Deep domain expertise that turns industry challenges into working software.",
  tone,
}) {
  const [active, setActive] = useState(0);
  const item = INDUSTRIES[active];

  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <SectionHeading eyebrow="Industries We Serve" title={title} intro={intro} />
        <div className={styles.layout}>
          <ul className={styles.list} role="tablist" aria-label="Industries">
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.href}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="industry-panel"
                  className={`${styles.tab} ${i === active ? styles.active : ""}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  {ind.name}
                </button>
              </li>
            ))}
          </ul>

          <div id="industry-panel" role="tabpanel" className={styles.card}>
            <div className={styles.copy} key={item.href}>
              <div className={styles.head}>
                <h3 className={styles.name}>{item.name}</h3>
                <Link href={item.href} className="arrow-dot" aria-label={`Explore ${item.name}`}>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
              <p className={styles.text}>{item.description}</p>
              <Link href="/industries" className="btn btn--sm">
                All Industries <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.media}>
              {INDUSTRIES.map((ind, i) => (
                <Image
                  key={ind.href}
                  src={ind.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 90vw, 420px"
                  className={`${styles.image} ${i === active ? styles.shown : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
