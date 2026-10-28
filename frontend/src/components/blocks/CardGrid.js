import { ArrowUpRight } from "lucide-react";
import { BlockHeading, Buttons, Logo, Paragraphs, SmartLink } from "./parts";
import styles from "./CardGrid.module.css";

// How many columns suit this many cards
const columnsFor = (n) => (n === 4 || n === 8 ? 4 : n % 3 === 0 || n > 9 ? 3 : 2);

// Grid of cards (WordPress "box grid"): icon or (01) label, title, text, link.
// `numbered` variant = white cards on the dark page.
export default function CardGrid({ heading, intro = [], items = [], buttons = [], variant = "", tone }) {
  const numbered = variant.includes("numeric");
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={intro} />
        <ul className={styles.grid} style={{ "--cols": columnsFor(items.length) }} data-stagger>
          {items.map((item, i) => {
            const href = item.href && item.href !== "#" ? item.href : "";
            const body = (
              <>
                {item.image && !numbered ? (
                  <span className={styles.icon}>
                    <Logo src={item.image} size={32} />
                  </span>
                ) : (
                  <span className={styles.number}>({String(i + 1).padStart(2, "0")})</span>
                )}
                <h3 className={styles.title}>{item.title}</h3>
                <Paragraphs items={item.text} className={styles.text} />
                {href && (
                  <span className={styles.more}>
                    Learn more <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                )}
              </>
            );
            return (
              <li key={item.title + i} className={styles.item}>
                {href ? (
                  <SmartLink href={href} className={`${styles.card} ${styles.link} ${numbered ? "section--light" : ""}`} data-spotlight>
                    {body}
                  </SmartLink>
                ) : (
                  <div className={`${styles.card} ${numbered ? "section--light" : ""}`} data-spotlight>
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <Buttons buttons={buttons} center />
      </div>
    </section>
  );
}
