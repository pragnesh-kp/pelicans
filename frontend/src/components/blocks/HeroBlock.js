import Image from "next/image";
import ClientLogos from "@/components/site/ClientLogos";
import ContactForm from "@/components/site/ContactForm";
import CountUp from "@/components/motion/CountUp";
import SplitText from "@/components/motion/SplitText";
import { Buttons, Paragraphs } from "./parts";
import styles from "./HeroBlock.module.css";

// Top banner of a content page. With a picture: full-width photo behind the text.
// Hire pages: the enquiry form on the right (dark glass card).
export default function HeroBlock({ title, text = [], buttons = [], image, stats = [], form, logos }) {
  const photo = image && !image.endsWith(".svg");
  return (
    <>
      <section className={`theme-dark ${styles.hero} ${photo ? styles.withPhoto : ""}`}>
        {photo ? (
          <div className={styles.photo} aria-hidden="true">
            <Image src={image} alt="" fill priority sizes="100vw" className={styles.photoImg} />
          </div>
        ) : (
          <div className={styles.glow} aria-hidden="true" />
        )}
        <div className={`container ${styles.inner} ${form ? styles.split : ""}`}>
          <div className={`${styles.copy} enter-seq`}>
            <h1 className={styles.title}>
              <SplitText text={title} />
            </h1>
            <Paragraphs items={text} className={styles.text} />
            <Buttons buttons={buttons} />
            {stats.length > 0 && (
              <dl className={styles.stats}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    {s.value && (
                      <dd className={styles.statValue}>
                        <CountUp value={s.value} />
                      </dd>
                    )}
                    <dt className={styles.statLabel}>{s.label}</dt>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {form && (
            <div className={`${styles.formCard} enter-media`}>
              <h2 className={styles.formTitle}>Let&apos;s discuss your project</h2>
              <p className={styles.formText}>Share your requirements — we reply within one business day.</p>
              <ContactForm />
            </div>
          )}
        </div>
      </section>
      {logos && <ClientLogos />}
    </>
  );
}
