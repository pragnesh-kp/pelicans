import SplitText from "@/components/motion/SplitText";
import styles from "./PageHero.module.css";

// Dark banner at the top of inner pages (About, Services, Contact)
export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner} enter-seq`}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className={styles.title}>
          <SplitText text={title} />
        </h1>
        {intro && <p className={styles.intro}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
