import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollLine from "@/components/motion/ScrollLine";
import { Logo, Paragraphs, Title } from "./parts";
import styles from "./ProcessSteps.module.css";

// Step-by-step roadmap (multiqos): heading, intro and a button stay put on the
// left; the steps run down a line on the right that fills while scrolling
export default function ProcessSteps({ heading, intro = [], items = [], tone, eyebrow = "Our Process" }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.aside} data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <Title heading={heading} className={styles.heading} />
          <Paragraphs items={intro} className={styles.intro} />
          <Link href="/contact" className="btn">
            Contact Us <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.timeline}>
          <ScrollLine className={styles.line} />
          <ol className={styles.steps}>
            {items.map((s, i) => (
              <li key={s.title + i} className={styles.step} data-reveal>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.count}>Step {String(i + 1).padStart(2, "0")}</span>
                <div className={styles.head}>
                  {s.icon && (
                    <span className={styles.icon}>
                      <Logo src={s.icon} size={24} />
                    </span>
                  )}
                  <h3 className={styles.title}>{s.title}</h3>
                </div>
                <Paragraphs items={s.text} className={styles.text} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
