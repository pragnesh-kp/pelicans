import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { PROJECTS } from "@/content/siteContent";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Our work"
          title="Latest projects"
          intro="Every partnership is a blend of creativity and strategy — turning business ideas into measurable success."
        />
        <ul className={styles.grid} data-stagger>
          {PROJECTS.map((p) => (
            <li key={p.title} className={styles.card}>
              <div className={styles.cover} style={{ "--hue": p.hue }}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.title} – ${p.type}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 400px"
                    className={styles.image}
                  />
                ) : (
                  // Coloured cover when there is no screenshot
                  <span aria-hidden="true">{p.title}</span>
                )}
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.type}>{p.type}</p>
                <ul className={styles.tags} aria-label="Technologies">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
