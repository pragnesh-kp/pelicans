import { ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import { BlockHeading } from "./parts";
import styles from "./LogoCategories.module.css";

function Chip({ t }) {
  const body = (
    <>
      {t.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.logo} alt="" width={22} height={22} loading="lazy" className={styles.logo} />
      ) : (
        <CircleCheck size={16} aria-hidden="true" className={styles.check} />
      )}
      {t.name}
    </>
  );
  return t.href ? (
    <Link href={t.href} className={`${styles.chip} ${styles.link}`}>
      {body}
    </Link>
  ) : (
    <span className={styles.chip}>{body}</span>
  );
}

// Technology stack (multiqos): one grey row per category — its name with a
// round arrow on the left, the technologies as pills on the right.
// Pass `items` instead of `categories` for a single list.
export default function LogoCategories({ heading, intro = [], categories, items, tone, eyebrow = "Our Tech Stack" }) {
  const groups = (categories || [{ name: "", items: items || [] }]).filter((g) => g.items.length);
  if (!groups.length) return null;
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className={styles.rows} data-stagger>
          {groups.map((g, gi) => (
            <div key={g.name || gi} className={`${styles.row} ${g.name ? "" : styles.single}`}>
              {g.name && (
                <h3 className={styles.name}>
                  {g.name}
                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </h3>
              )}
              <ul className={styles.chips}>
                {g.items.map((t, i) => (
                  <li key={t.name + i}>
                    <Chip t={t} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
