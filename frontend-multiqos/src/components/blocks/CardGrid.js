import { ArrowUpRight, CircleCheck } from "lucide-react";
import { BlockHeading, Buttons, Logo, Paragraphs, SmartLink } from "./parts";
import styles from "./CardGrid.module.css";

// How many columns suit this many cards
const columnsFor = (n) => (n === 4 || n === 8 ? 4 : n % 3 === 0 || n > 9 ? 3 : 2);

// Grid of grey rounded cards (WordPress "box grid"): icon or (01), title, a rule, text.
// Hovering turns a card blue with a rounded-off corner (multiqos).
export default function CardGrid({ heading, intro = [], items = [], buttons = [], variant = "", tone, eyebrow }) {
  const numbered = variant.includes("numeric");
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <ul className={styles.grid} style={{ "--cols": columnsFor(items.length) }} data-stagger>
          {items.map((item, i) => {
            const href = item.href && item.href !== "#" ? item.href : "";
            const body = (
              <>
                <div className={styles.head}>
                  {numbered ? (
                    <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                  ) : (
                    <span className={styles.icon}>{item.image ? <Logo src={item.image} size={26} /> : <CircleCheck size={22} aria-hidden="true" />}</span>
                  )}
                  <h3 className={styles.title}>{item.title}</h3>
                  {href && (
                    <span className={`arrow-dot ${styles.arrow}`} aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  )}
                </div>
                {item.text?.length > 0 && (
                  <div className={styles.body}>
                    <Paragraphs items={item.text} className={styles.text} />
                  </div>
                )}
              </>
            );
            return (
              <li key={item.title + i} className={styles.item}>
                {href ? (
                  <SmartLink href={href} className={`${styles.card} ${styles.link}`}>
                    {body}
                  </SmartLink>
                ) : (
                  <div className={styles.card}>{body}</div>
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
