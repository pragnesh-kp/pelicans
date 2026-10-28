import { Asterisk } from "lucide-react";
import { STATS } from "@/content/siteContent";
import CountUp from "@/components/motion/CountUp";
import styles from "./StatsGrid.module.css";

// Soft-tinted number cards (multiqos "About" row): ✱ + label pill, big number, optional text
export default function StatsGrid({ items = STATS, texts = [] }) {
  return (
    <dl className={styles.grid} data-stagger>
      {items.map((s, i) => (
        <div key={s.label} className={styles.item}>
          <dt className={styles.top}>
            <Asterisk size={26} strokeWidth={3} aria-hidden="true" />
            <span className={styles.label}>{s.label}</span>
          </dt>
          <dd className={styles.value}>
            <CountUp value={s.value} />
          </dd>
          {texts[i] && <dd className={styles.text}>{texts[i]}</dd>}
        </div>
      ))}
    </dl>
  );
}
