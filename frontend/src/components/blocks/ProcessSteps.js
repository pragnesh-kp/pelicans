import ScrollLine from "@/components/motion/ScrollLine";
import { BlockHeading, Logo, Paragraphs } from "./parts";
import styles from "./ProcessSteps.module.css";

// Development process as a vertical timeline: the centre line fills while you scroll,
// title on the left, description on the right
export default function ProcessSteps({ heading, intro = [], items = [], tone }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={intro} />
        <div className={styles.timeline}>
          <ScrollLine className={styles.line} />
          <ol className={styles.steps}>
            {items.map((s, i) => (
              <li key={s.title + i} className={styles.step} data-reveal>
                <div className={styles.head}>
                  <span className={styles.count}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.title}>{s.title}</h3>
                </div>
                <span className={styles.dot} aria-hidden="true" />
                <div className={styles.body}>
                  {s.icon && (
                    <span className={styles.icon}>
                      <Logo src={s.icon} size={28} />
                    </span>
                  )}
                  <Paragraphs items={s.text} className={styles.text} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
