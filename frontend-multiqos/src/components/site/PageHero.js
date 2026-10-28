import SplitText from "@/components/motion/SplitText";
import styles from "./PageHero.module.css";

// Top of inner pages on white (multiqos "About MultiQoS" / "Contact Us"):
// big title with an accent-coloured part, intro underneath.
export default function PageHero({ eyebrow, title, highlight, intro, center = false, children }) {
  return (
    <section className={`${styles.hero} ${center ? styles.center : ""}`}>
      <div className={`container ${styles.inner} enter-seq`}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className={styles.title}>
          <SplitText text={title} highlight={highlight} highlightClass="hl" />
        </h1>
        {intro && <p className={styles.intro}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
