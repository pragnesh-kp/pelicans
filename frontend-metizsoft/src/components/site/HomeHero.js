import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/motion/CountUp";
import { STATS } from "@/content/siteContent";
import styles from "./HomeHero.module.css";

function Arrow() {
  return (
    <span className={styles.cardArrow} aria-hidden="true">
      <ArrowUpRight size={14} />
    </span>
  );
}

// Small drawings inside the bento cards (pure CSS/SVG, no photos)
function Bag() {
  return (
    <svg viewBox="0 0 120 80" className={styles.art} aria-hidden="true">
      <rect x="26" y="26" width="38" height="44" rx="6" fill="#fff" stroke="#c9d8fb" strokeWidth="2" />
      <path d="M36 26v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#c9d8fb" strokeWidth="2" />
      <rect x="54" y="18" width="42" height="52" rx="7" fill="#fff" stroke="var(--deep)" strokeWidth="2" />
      <path d="M66 18v-5a9 9 0 0 1 18 0v5" fill="none" stroke="var(--deep)" strokeWidth="2" />
      <circle cx="75" cy="40" r="3" fill="var(--brand)" />
      <rect x="64" y="50" width="22" height="3" rx="1.5" fill="#dbe7ff" />
    </svg>
  );
}

function Phone() {
  return (
    <div className={styles.phone} aria-hidden="true">
      <span className={styles.phoneNotch} />
      <span className={styles.phoneRow} />
      <span className={styles.phoneRow} />
      <span className={`${styles.phoneRow} ${styles.short}`} />
      <span className={styles.phoneRow} />
    </div>
  );
}

function Chart() {
  return (
    <svg viewBox="0 0 160 50" className={styles.chart} aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hh-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1163fb" stopOpacity="0.25" />
          <stop offset="1" stopColor="#1163fb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 38 L14 30 L26 34 L40 18 L52 26 L66 14 L78 22 L92 10 L104 20 L118 12 L132 22 L146 8 L160 16 L160 50 L0 50Z" fill="url(#hh-area)" />
      <path className={styles.chartLine} d="M0 38 L14 30 L26 34 L40 18 L52 26 L66 14 L78 22 L92 10 L104 20 L118 12 L132 22 L146 8 L160 16" fill="none" stroke="var(--deep)" strokeWidth="2" />
    </svg>
  );
}

function Code() {
  return (
    <div className={styles.code} aria-hidden="true">
      <div className={styles.codeBar}>
        <i />
        <i />
        <i />
        <span>pelicanstechnologies.com</span>
      </div>
      <pre>
        <span className={styles.c}>{"$ npm run build"}</span>
        {"\n"}
        <span className={styles.k}>route</span> /services   <span className={styles.s}>{"42 kB"}</span>
        {"\n"}route /portfolio  38 kB
        {"\n"}
        <span className={styles.c}>{"✓ compiled in 2.1s"}</span>
      </pre>
    </div>
  );
}

// Home hero (metizsoft layout): soft grid background; small kicker, very large
// title whose last words are an italic serif with the brand gradient, intro and
// two buttons on the left; a bento grid of five service cards on the right.
export default function HomeHero() {
  const [years, projects, , devs] = STATS;
  return (
    <section className={`grid-wash hero-top ${styles.hero}`}>
      <span className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.left} enter-seq`}>
          <p className={styles.kicker}>
            <span>{years.value}</span> Years of trusted software delivery
          </p>
          <h1 className={styles.title}>
            Custom Software, AI &amp; Apps <span className="serif">Engineered for Real Growth</span>
          </h1>
          <p className={styles.intro}>
            We deliver next-generation software powered by AI — custom platforms, websites and mobile apps that help startups and global
            brands solve real challenges, stay ahead of the curve and grow.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className="btn">
              Talk to Our Experts <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/portfolio" className="btn btn--outline">
              Browse Our Work
            </Link>
          </div>
        </div>

        <div className={`${styles.bento} enter-media`}>
          <Link href="/services/ai-ml-development" className={`${styles.card} ${styles.feat}`}>
            <span className={styles.cardTag}>01 · Flagship</span>
            <Arrow />
            <div className={styles.featBody}>
              <div>
                <h2 className={styles.cardTitle}>AI/ML Development</h2>
                <p className={styles.featText}>
                  Generative AI, smart assistants and machine-learning models trained on your data to automate routine work and
                  support better decisions.
                </p>
                <dl className={styles.featStats}>
                  {[years, projects, devs].map((s) => (
                    <div key={s.label}>
                      <dd>
                        <CountUp value={s.value} />
                      </dd>
                      <dt>{s.label.split(" ").slice(-1)[0]}</dt>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={styles.orbit} aria-hidden="true">
                <span className={styles.orb}>AI</span>
              </div>
            </div>
          </Link>

          <Link href="/services/e-commerce" className={styles.card}>
            <span className={styles.cardTag}>02 · Retail</span>
            <Arrow />
            <h2 className={styles.cardTitle}>E-Commerce</h2>
            <Bag />
            <div className={styles.chips}>
              <span className="chip">Shopify</span>
              <span className="chip">WooCommerce</span>
            </div>
          </Link>

          <Link href="/services/mobile-app-development" className={styles.card}>
            <span className={styles.cardTag}>03 · Mobile</span>
            <Arrow />
            <h2 className={styles.cardTitle}>Mobile Apps</h2>
            <Phone />
            <div className={styles.chips}>
              <span className="chip">iOS</span>
              <span className="chip">Android</span>
              <span className="chip">Flutter</span>
            </div>
          </Link>

          <Link href="/services/data-engineering" className={styles.card}>
            <span className={styles.cardTag}>04 · Data</span>
            <Arrow />
            <h2 className={styles.cardTitle}>Data Engineering</h2>
            <Chart />
            <p className={styles.metric}>
              Real-time insight <span>▲ live</span>
            </p>
            <div className={styles.chips}>
              <span className="chip">Python</span>
              <span className="chip">Power BI</span>
            </div>
          </Link>

          <Link href="/services/web-development" className={styles.card}>
            <span className={styles.cardTag}>05 · Web</span>
            <Arrow />
            <h2 className={styles.cardTitle}>Web Development</h2>
            <Code />
            <div className={styles.chips}>
              <span className="chip">Next.js</span>
              <span className="chip">React</span>
              <span className="chip">Laravel</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
