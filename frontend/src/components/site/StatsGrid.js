import { STATS } from "@/content/siteContent";
import CountUp from "@/components/motion/CountUp";
import styles from "./StatsGrid.module.css";

// pastel = separate soft-coloured tiles with dark text (About page)
export default function StatsGrid({ dark = false, pastel = false, items = STATS }) {
  return (
    <dl className={`${styles.grid} ${dark ? styles.dark : ""} ${pastel ? styles.pastel : ""}`}>
      {items.map((s) => (
        <div key={s.label} className={styles.item}>
          <dt className={styles.label}>{s.label}</dt>
          <dd className={styles.value}>
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
