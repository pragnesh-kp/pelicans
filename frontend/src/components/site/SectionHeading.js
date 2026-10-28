import SplitText from "@/components/motion/SplitText";
import styles from "./SectionHeading.module.css";

// Eyebrow + title + intro paragraph used at the top of most sections
export default function SectionHeading({ eyebrow, title, intro, align = "center", as: Tag = "h2" }) {
  return (
    <div className={`${styles.heading} ${align === "left" ? styles.left : ""}`} data-reveal>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className={styles.title}>
        <SplitText text={title} />
      </Tag>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
