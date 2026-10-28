import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./ServicesGrid.module.css";

// Service cards with photo, title, text and a round arrow; every card links to its service page.
// detailed = full description + anchor ids (Services page), otherwise the short text.
export default function ServicesGrid({ services, detailed = false }) {
  return (
    <ul className={styles.grid} data-stagger>
      {services.map((s) => (
        <li key={s.id} id={detailed ? s.id : undefined} className={styles.item}>
          <Link href={`/services/${s.id}`} className={styles.card}>
            {s.image && (
              <span className={styles.media}>
                <Image src={s.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className={styles.image} />
              </span>
            )}
            <span className={styles.row}>
              <h3 className={styles.title}>{s.title}</h3>
              <span className="arrow-dot" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </span>
            <p className={styles.text}>{detailed ? s.description : s.short}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
