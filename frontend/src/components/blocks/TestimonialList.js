import Image from "next/image";
import { Quote, CirclePlay } from "lucide-react";
import { Paragraphs } from "./parts";
import styles from "./TestimonialList.module.css";

// Every testimonial in full (Testimonials page)
export default function TestimonialList({ items = [] }) {
  return (
    <section className="section">
      <div className="container">
        <ul className={styles.list} data-stagger>
          {items.map((t) => (
            <li key={t.name}>
              <figure className={`section--light ${styles.card}`}>
                <Quote size={32} className={styles.mark} aria-hidden="true" />
                <blockquote className={styles.quote}>
                  <Paragraphs items={t.text} />
                </blockquote>
                <figcaption className={styles.author}>
                  {t.photo && <Image src={t.photo} alt="" width={56} height={56} className={styles.photo} />}
                  <span className={styles.who}>
                    <strong>{t.name}</strong>
                    <span className={styles.meta}>
                      {t.flag && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.flag} alt="" width={16} height={16} className={styles.flag} />
                      )}
                      {t.country}
                    </span>
                  </span>
                  {t.video && (
                    <a href={t.video} target="_blank" rel="noopener noreferrer" className={styles.video}>
                      <CirclePlay size={20} aria-hidden="true" /> Watch video
                    </a>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
