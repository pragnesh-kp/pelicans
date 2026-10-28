import Carousel from "@/components/ui/Carousel";
import { BlockHeading, Buttons, Paragraphs } from "./parts";
import styles from "./FeatureSlider.module.css";

// Numbered feature cards in a sliding row (multiqos "AI Solutions" row)
export default function FeatureSlider({ heading, intro = [], items = [], buttons = [], tone, eyebrow = "Solutions" }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <Carousel label={heading?.text || "Features"}>
          {items.map((item, i) => (
            <article key={item.title + i} className={styles.card}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <div className={styles.text}>
                <Paragraphs items={item.text} />
              </div>
            </article>
          ))}
        </Carousel>
        <Buttons buttons={buttons} center />
      </div>
    </section>
  );
}
