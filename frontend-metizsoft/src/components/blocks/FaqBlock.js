import { Plus } from "lucide-react";
import { BlockHeading, Paragraphs } from "./parts";
import styles from "./FaqBlock.module.css";

// Centered heading, then rounded grey rows that open (native <details>) —
// multiqos FAQ. Some pages use the same block for a list of solutions.
export default function FaqBlock({ heading, intro = [], items = [], tone }) {
  const isFaq = /question|faq/i.test(heading?.text || "");
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={isFaq ? "FAQs" : "What We Offer"} heading={heading} intro={intro} align="center" />
        <div className={styles.list} data-stagger>
          {items.map((item, i) => (
            <details key={item.q + i} className={styles.item} open={i === 0}>
              <summary className={styles.question}>
                <span>{item.q}</span>
                <span className={styles.icon}>
                  <Plus size={18} aria-hidden="true" />
                </span>
              </summary>
              <div className={styles.answer}>
                <Paragraphs items={item.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
