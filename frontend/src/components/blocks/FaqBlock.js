import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { BlockHeading, Paragraphs } from "./parts";
import styles from "./FaqBlock.module.css";

// Numbered [1], [2]… expandable list (native <details>) with a "can't find it?" card beside it
export default function FaqBlock({ heading, intro = [], items = [], tone }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={intro} />
        <div className={styles.layout}>
          <aside className={styles.card} data-reveal="left">
            <h3>Didn&apos;t find what you&apos;re looking for?</h3>
            <p>Tell us about your project — our team replies within one business day with ideas and next steps.</p>
            <Link href="/contact" className="btn btn--accent">
              Get in Touch With Our Experts <ArrowUpRight aria-hidden="true" />
            </Link>
          </aside>
          <div className={styles.list} data-stagger>
            {items.map((item, i) => (
              <details key={item.q + i} className={styles.item} open={i === 0}>
                <summary className={styles.question}>
                  <span className={styles.index}>[{i + 1}]</span>
                  <span className={styles.qText}>{item.q}</span>
                  <Plus size={20} aria-hidden="true" className={styles.icon} />
                </summary>
                <div className={styles.answer}>
                  <Paragraphs items={item.a} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
