import { AccentTitle } from "@/components/blocks/parts";
import styles from "./PageHero.module.css";

// Top of the hand-built pages (About, Services, Contact, Blog): soft grid
// background, uppercase kicker, big title with the `highlight` words in the
// italic serif gradient, intro underneath.
export default function PageHero({ eyebrow, title, highlight, intro, center = false, children }) {
  return (
    <section className={`grid-wash hero-top ${styles.hero} ${center ? styles.center : ""}`}>
      <div className={`container ${styles.inner} enter-seq`}>
        {eyebrow && <p className={`kicker ${styles.kicker}`}>{eyebrow}</p>}
        <AccentTitle text={title} accent={highlight} className={styles.title} />
        {intro && <p className={styles.intro}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
