import { ArrowUpRight, Check } from "lucide-react";
import { BlockHeading, Buttons, Logo, Paragraphs, SmartLink } from "./parts";
import styles from "./CardGrid.module.css";

// How many columns suit this many cards
const columnsFor = (n) => (n === 4 || n === 8 ? 4 : n % 3 === 0 || n > 9 ? 3 : n === 1 ? 1 : 2);

// Short label after the number: first word of the title ("01 — DISCOVERY")
const labelFor = (title = "") => title.replace(/[^\w\s&/-]/g, "").split(/\s+/)[0] || "";

// Grid of cells that share their borders (metizsoft "roadmap" grid): icon tile,
// "01 — LABEL", title, text, optional "Learn more ↗". Hover lifts a cell onto white.
export default function CardGrid({ heading, intro = [], items = [], buttons = [], variant = "", tone, eyebrow }) {
  const numbered = variant.includes("numeric");
  const cols = columnsFor(items.length);
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <ul className={`${styles.grid} ${tone === "alt" ? styles.onAlt : ""}`} style={{ "--cols": cols }} data-stagger>
          {items.map((item, i) => {
            const href = item.href && item.href !== "#" ? item.href : "";
            const body = (
              <>
                <div className={styles.head}>
                  <span className={styles.icon}>
                    {numbered ? (
                      <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                    ) : item.image ? (
                      <Logo src={item.image} size={22} />
                    ) : (
                      <Check size={18} aria-hidden="true" />
                    )}
                  </span>
                  <span className={styles.label}>
                    {String(i + 1).padStart(2, "0")} — {labelFor(item.title)}
                  </span>
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                {item.text?.length > 0 && <Paragraphs items={item.text} className={styles.text} />}
                {href && (
                  <span className={`link-arrow ${styles.more}`}>
                    Learn more <ArrowUpRight aria-hidden="true" />
                  </span>
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
