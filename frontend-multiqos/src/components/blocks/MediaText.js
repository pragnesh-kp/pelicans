import { CircleCheck } from "lucide-react";
import { Buttons, FillImage, Paragraphs, Title } from "./parts";
import styles from "./MediaText.module.css";

// Text with a picture beside it (engagement models, process, about)
export default function MediaText({ anchor, heading, text = [], bullets = [], buttons = [], image, imageSide = "right", tone, eyebrow }) {
  return (
    <section id={anchor || undefined} className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className={`container ${styles.grid} ${imageSide === "left" ? styles.imageLeft : ""}`}>
        <div className={styles.copy} data-reveal={imageSide === "left" ? "right" : "left"}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <Title heading={heading} className={styles.title} />
          <Paragraphs items={text} className={styles.text} />
          {bullets.length > 0 && (
            <ul className={styles.bullets}>
              {bullets.map((b) => (
                <li key={b}>
                  <CircleCheck size={20} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          <Buttons buttons={buttons} />
        </div>
        {image && (
          <div className={styles.media} data-reveal={imageSide === "left" ? "left" : "right"}>
            <FillImage src={image} sizes="(max-width: 900px) 100vw, 560px" className={styles.image} />
          </div>
        )}
      </div>
    </section>
  );
}
