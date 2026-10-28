import { BlockHeading, Buttons, Paragraphs } from "./parts";
import styles from "./FeatureSlider.module.css";

// Numbered feature cards that stack on top of each other while scrolling
// (each card sticks below the header; the next one slides over it)
export default function FeatureSlider({ heading, intro = [], items = [], buttons = [], tone }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={intro} />
        <ol className={styles.stack}>
          {items.map((item, i) => (
            <li key={item.title + i} className={styles.card} style={{ "--i": i }} data-spotlight>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <div className={styles.text}>
                <Paragraphs items={item.text} />
              </div>
            </li>
          ))}
        </ol>
        <Buttons buttons={buttons} center />
      </div>
    </section>
  );
}
