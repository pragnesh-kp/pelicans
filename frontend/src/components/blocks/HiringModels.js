import { CircleCheck } from "lucide-react";
import { BlockHeading, Buttons, Logo } from "./parts";
import styles from "./HiringModels.module.css";

// Full-time / part-time / hourly hiring cards + list of perks
export default function HiringModels({ heading, models = [], perks = [], buttons = [], tone }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} />
        <ul className={styles.models} data-stagger>
          {models.map((m, i) => (
            <li key={m.title} className={`${styles.model} ${i === 0 ? styles.featured : ""}`}>
              <div className={styles.head}>
                <span className={styles.icon}>
                  <Logo src={m.icon} size={30} />
                </span>
                <h3 className={styles.title}>{m.title}</h3>
                <p className={styles.subtitle}>{m.subtitle}</p>
              </div>
              <dl className={styles.rows}>
                {m.rows.map(([label, value]) => (
                  <div key={label} className={styles.row}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        {perks.length > 0 && (
          <ul className={styles.perks} data-stagger>
            {perks.map((p) => (
              <li key={p}>
                <CircleCheck size={20} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        )}
        <Buttons buttons={buttons} center />
      </div>
    </section>
  );
}
