import { CircleCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { ENGAGEMENT_MODELS } from "@/content/siteContent";
import styles from "./EngagementModels.module.css";

// alt = light-gray background (use it when the sections around are white)
export default function EngagementModels({ alt = false }) {
  return (
    <section className={`section ${alt ? "section--alt" : ""}`}>
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          title="Flexible engagement models"
          intro="Transparent models for businesses of every size — from early-stage startups to global enterprises."
        />
        <ol className={styles.grid} data-stagger>
          {ENGAGEMENT_MODELS.map((m, i) => (
            <li key={m.title} className={styles.card}>
              <span className={styles.number}>0{i + 1}</span>
              <h3 className={styles.title}>{m.title}</h3>
              <p className={styles.text}>{m.description}</p>
              <ul className={styles.points}>
                {m.points.map((p) => (
                  <li key={p}>
                    <CircleCheck size={18} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
