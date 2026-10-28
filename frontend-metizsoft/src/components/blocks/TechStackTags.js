import { ArrowUpRight, CircleCheck } from "lucide-react";
import { BlockHeading, Buttons } from "./parts";
import styles from "./LogoCategories.module.css";

// "Technical expertise": one grey row per area — its name on the left,
// the tools as pills on the right (same look as the tech stack block)
export default function TechStackTags({ heading, intro = [], groups = [], buttons = [], tone, eyebrow = "Technical Expertise" }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className={styles.rows} data-stagger>
          {groups.map((g, i) => (
            <div key={g.title + i} className={styles.row}>
              <h3 className={styles.name}>
                {g.title}
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </h3>
              <ul className={styles.chips}>
                {g.tags.map((t) => (
                  <li key={t}>
                    <span className={styles.chip}>
                      <CircleCheck size={16} aria-hidden="true" className={styles.check} />
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Buttons buttons={buttons} center />
      </div>
    </section>
  );
}
