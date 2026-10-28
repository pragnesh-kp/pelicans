import CountUp from "@/components/motion/CountUp";
import SplitText from "@/components/motion/SplitText";
import { STATS } from "@/content/siteContent";
import styles from "./Home.module.css";

// Dark gradient band: title (gradient highlight) left, short text right,
// then four big numbers split by thin lines
export default function StatsBand({
  title = "A Decade of Engineering Products That Last",
  highlight = "Products That Last",
  text = "Since 2012 our designers, engineers and QA specialists have delivered websites, apps and platforms for clients in more than 20 countries — and many of them still work with us today.",
}) {
  return (
    <section className={`section--dark ${styles.statsBand}`}>
      <span className={styles.statsGlow} aria-hidden="true" />
      <div className="container">
        <div className={styles.statsHead} data-reveal>
          <h2 className={styles.statsTitle}>
            <SplitText text={title} highlight={highlight} highlightClass="hl" />
          </h2>
          <p className={styles.statsText}>{text}</p>
        </div>
        <dl className={styles.statsRow} data-stagger>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <dd>
                <CountUp value={s.value} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
