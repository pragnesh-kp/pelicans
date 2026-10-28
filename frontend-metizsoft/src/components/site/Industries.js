"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import { INDUSTRIES } from "@/content/siteContent";
import styles from "./Industries.module.css";

// Split heading with an outline button; an accordion of industries on the left
// (one open at a time) and that industry's photo on the right
export default function Industries({
  title = "Industries We Build Software For",
  intro = "Twelve industries, one approach: learn how the business runs, then build the software that makes it run better.",
  tone,
}) {
  const [active, setActive] = useState(0);
  const highlight = title.includes("Build Software") ? "Build Software" : /industr/i.test(title) ? title.split(" ").slice(-2).join(" ") : "";

  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <div className={styles.head} data-reveal>
          <h2 className="section-title">
            <SplitText text={title} highlight={highlight} highlightClass="hl" />
          </h2>
          <p className={styles.intro}>{intro}</p>
          <Link href="/industries" className="btn btn--outline btn--sm">
            View All Industries
          </Link>
        </div>

        <div className={styles.layout}>
          <ul className={styles.list}>
            {INDUSTRIES.map((ind, i) => {
              const open = i === active;
              const id = `industry-${i}`;
              return (
                <li key={ind.href} className={`${styles.item} ${open ? styles.open : ""}`}>
                  <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={id} onClick={() => setActive(i)}>
                    {ind.name}
                    <span className={styles.icon} aria-hidden="true">
                      <Plus size={14} />
                    </span>
                  </button>
                  <div id={id} className={styles.panel} role="region" aria-label={ind.name}>
                    <div className={styles.panelInner}>
                      <p className={styles.text}>{ind.description} We build secure, scalable platforms tailored to how the {ind.name.toLowerCase()} sector really works.</p>
                      <Link href={ind.href} className="link-arrow" tabIndex={open ? 0 : -1}>
                        Explore {ind.name} <ArrowUpRight aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className={styles.media} data-reveal="right">
            {INDUSTRIES.map((ind, i) => (
              <Image
                key={ind.href}
                src={ind.image}
                alt=""
                fill
                sizes="(max-width: 900px) 90vw, 560px"
                className={`${styles.image} ${i === active ? styles.shown : ""}`}
              />
            ))}
            <span className={styles.caption}>{INDUSTRIES[active].name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
