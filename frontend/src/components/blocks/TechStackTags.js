import { BlockHeading, Buttons } from "./parts";
import styles from "./TechStackTags.module.css";

// "Technical expertise" cards: a title and a list of tool tags per area
export default function TechStackTags({ heading, intro = [], groups = [], buttons = [], tone }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={intro} />
        <ul className={styles.grid} data-stagger>
          {groups.map((g, i) => (
            <li key={g.title + i} className={styles.card} data-spotlight>
              <h3 className={styles.title}>{g.title}</h3>
              <ul className={styles.tags}>
                {g.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <Buttons buttons={buttons} center />
      </div>
    </section>
  );
}
