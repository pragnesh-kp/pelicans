import Image from "next/image";
import SplitText from "@/components/motion/SplitText";
import { TESTIMONIALS } from "@/content/siteContent";
import styles from "./Testimonials.module.css";

// Centred title, then soft grey quote cards: big quote mark, the words,
// photo + name + role/country at the bottom
export default function Testimonials({ title = "Why Businesses Choose Pelicans as Their Technology Partner", tone }) {
  const highlight = /pelicans/i.test(title) ? "Technology Partner" : "";
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <div className="section-head section-head--center" data-reveal>
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title">
            <SplitText text={title} highlight={highlight} highlightClass="hl" />
          </h2>
          <p className="section-head__intro">Real words from founders and product teams we have designed, built and supported software for.</p>
        </div>

        <ul className={styles.grid} data-stagger>
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <figure className={`${styles.card} ${tone === "alt" ? styles.onAlt : ""}`}>
                <svg className={styles.mark} viewBox="0 0 32 24" aria-hidden="true">
                  <path d="M0 24V14C0 6 4.5 1.3 12 0l1.4 3.4C9 4.8 7 7.6 7 11h6v13H0Zm19 0V14c0-8 4.5-12.7 12-14l1 3.4C27.6 4.8 25.6 7.6 25.6 11H32v13H19Z" />
                </svg>
                <blockquote className={styles.quote}>{t.quote}</blockquote>
                <figcaption className={styles.person}>
                  <span className={styles.photo}>
                    {t.photo ? <Image src={t.photo} alt="" width={48} height={48} /> : t.name[0]}
                  </span>
                  <span>
                    <strong className={styles.name}>{t.name}</strong>
                    <span className={styles.role}>
                      {t.company}
                      {t.country && ` · ${t.country}`}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
