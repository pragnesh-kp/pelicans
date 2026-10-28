"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import styles from "./Home.module.css";

// Light-blue band: title with arrow buttons on the right; one big white card at a
// time (text left, project picture right), dots underneath
export default function ProjectShowcase({ title = "Recent Work We’re Proud Of", highlight = "Proud Of", projects = [] }) {
  const [index, setIndex] = useState(0);
  const count = projects.length;
  if (!count) return null;
  const go = (i) => setIndex((i + count) % count);

  return (
    <section className={`section ${styles.showcase}`}>
      <div className="container">
        <div className={styles.showHead} data-reveal>
          <h2 className="section-title">
            <SplitText text={title} highlight={highlight} highlightClass="hl" />
          </h2>
          <div className={styles.showArrows}>
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous project">
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next project">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className={styles.showSlides} aria-live="polite">
          {projects.map((p, i) => {
            const active = i === index;
            return (
              <article
                key={p.href}
                className={`${styles.showCard} ${active ? styles.showActive : ""}`}
                aria-hidden={!active}
                inert={!active ? true : undefined}
              >
                <div className={styles.showCopy}>
                  {p.tags?.length > 0 && <p className={styles.showTags}>{p.tags.slice(0, 3).join(" · ")}</p>}
                  <h3 className={styles.showTitle}>{p.title}</h3>
                  {p.intro && <p className={styles.showText}>{p.intro}</p>}
                  {p.categories?.length > 0 && (
                    <ul className={styles.showFacts}>
                      {p.categories.slice(0, 3).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                  <Link href={p.href} className="link-arrow">
                    Read the Case Study <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
                <div className={styles.showMedia}>
                  {p.image && <Image src={p.image} alt="" fill sizes="(max-width: 900px) 100vw, 560px" className={styles.cover} />}
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.dots}>
          {projects.map((p, i) => (
            <button
              key={p.href}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => go(i)}
              aria-label={`Show project ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>

        <div className={styles.center}>
          <Link href="/portfolio" className="btn btn--outline">
            See All Work <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
