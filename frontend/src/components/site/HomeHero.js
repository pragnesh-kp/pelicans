import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import CountUp from "@/components/motion/CountUp";
import ClientLogos from "./ClientLogos";
import HeroBackdrop from "./HeroBackdrop";
import { STATS } from "@/content/siteContent";
import styles from "./HomeHero.module.css";

// Full-screen hero: 3D Pelicans mark over a pixel field, headline bottom-left, key numbers bottom-right,
// client logos scrolling along the bottom edge
export default function HomeHero() {
  return (
    <section className={`theme-dark ${styles.hero}`}>
      <HeroBackdrop />

      <div className={`container ${styles.inner}`}>
        <div className={`${styles.copy} enter-seq`}>
          <span className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" />
            Custom Software Development Company
          </span>
          <h1 className={styles.title}>
            <SplitText
              text="Revolutionizing businesses with AI-powered solutions"
              highlight="AI-powered solutions"
              highlightClass={styles.highlight}
            />
          </h1>
          <p className={styles.intro}>
            We deliver next-generation software powered by AI — helping businesses solve real challenges, stay ahead of
            the curve and achieve sustainable growth.
          </p>
          <div className={styles.actions}>
            <Magnetic>
              <Link href="/contact" className="btn btn--primary">
                Start Your Project <ArrowUpRight aria-hidden="true" />
              </Link>
            </Magnetic>
            <Link href="/services" className={styles.textLink}>
              Explore Services <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <dl className={`${styles.stats} enter-media`}>
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

      <div className={styles.logos}>
        <ClientLogos title="Trusted by startups and global brands" tone="hero" />
      </div>
    </section>
  );
}
