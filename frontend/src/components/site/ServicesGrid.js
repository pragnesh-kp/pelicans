import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import styles from "./ServicesGrid.module.css";

// detailed = image + full description + anchor ids (Services page)
// otherwise = short text (Home page). Every card links to its service page.
export default function ServicesGrid({ services, detailed = false }) {
  return (
    <ul className={styles.grid} data-stagger>
      {services.map((s) => {
        const content = (
          <>
            {detailed && s.image && (
              <span className={styles.media}>
                <Image src={s.image} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 820px) 50vw, (max-width: 1100px) 33vw, 300px" className={styles.image} />
              </span>
            )}
            <span className={`${styles.icon} ${detailed && s.image ? styles.iconOnMedia : ""}`}>
              <Icon name={s.icon} size={26} />
            </span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.text}>{detailed ? s.description : s.short}</p>
            <span className={styles.more}>
              Learn more <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </>
        );

        return (
          <li key={s.id} id={detailed ? s.id : undefined} className={styles.item}>
            <Link href={`/services/${s.id}`} className={styles.card} data-spotlight>
              {content}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
