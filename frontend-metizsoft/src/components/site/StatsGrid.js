import { STATS } from "@/content/siteContent";
import CountUp from "@/components/motion/CountUp";
import styles from "./StatsGrid.module.css";

// White number cards: big deep-blue figure, small uppercase label, optional line of text
export default function StatsGrid({ items = STATS, texts = [] }) {
  return (
    <dl className={styles.grid} data-stagger>
      {items.map((s, i) => (
        <div key={s.label} className={styles.item}>
          <dd className={styles.value}>
            <CountUp value={s.value} />
          </dd>
          <dt className={styles.label}>{s.label}</dt>
          {texts[i] && <dd className={styles.text}>{texts[i]}</dd>}
        </div>
      ))}
    </dl>
  );
}
