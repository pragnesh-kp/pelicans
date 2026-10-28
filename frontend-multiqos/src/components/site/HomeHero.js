import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/motion/CountUp";
import HeroBackdrop from "./HeroBackdrop";
import RotatingWords from "./RotatingWords";
import { STATS } from "@/content/siteContent";
import styles from "./HomeHero.module.css";

const PHRASES = ["AI-powered solutions", "custom software", "web & mobile apps", "data engineering"];

// Dark hero: big headline on the left with a cycling highlight, a thin divider,
// then the intro, button and two key numbers on the right
export default function HomeHero() {
  return (
    <section className={`theme-dark ${styles.hero}`}>
      <HeroBackdrop mark={false} />

      <div className={`container ${styles.inner}`}>
        <div className={`${styles.left} enter-seq`}>
          <span className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" />
            Custom Software Development Company
          </span>
          <h1 className={styles.title}>
            Revolutionizing businesses with <RotatingWords words={PHRASES} className={styles.highlight} />
          </h1>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div className={`${styles.right} enter-seq`}>
          <p className={styles.intro}>
            We deliver next-generation software powered by AI — helping businesses solve real challenges, stay ahead of the
            curve and achieve sustainable growth.
          </p>
          <Link href="/contact" className="btn">
            Let&apos;s Connect <ArrowUpRight aria-hidden="true" />
          </Link>
          <dl className={styles.stats}>
            {STATS.slice(0, 2).map((s) => (
              <div key={s.label}>
                <dd>
                  <CountUp value={s.value} />
                </dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
