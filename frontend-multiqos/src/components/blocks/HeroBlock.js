import Image from "next/image";
import ClientLogos from "@/components/site/ClientLogos";
import ContactForm from "@/components/site/ContactForm";
import CountUp from "@/components/motion/CountUp";
import SplitText from "@/components/motion/SplitText";
import { Buttons, Paragraphs } from "./parts";
import styles from "./HeroBlock.module.css";

// Part of the page title shown in the accent colour, multiqos style:
// "AI/ML Development" -> "AI/ML", "Hire Java Developers" -> "Java"
function titleHighlight(title = "") {
  const words = title.split(" ");
  if (words.length < 2) return "";
  const start = words[0].toLowerCase() === "hire" && words.length > 2 ? 1 : 0;
  return words.slice(start, -1).join(" ");
}

// Top of a content page on white: big title + text on the left, buttons and
// numbers on the right, then a wide rounded photo. Hire pages: the enquiry
// form sits on the right instead.
export default function HeroBlock({ title, text = [], buttons = [], image, stats = [], form, logos }) {
  const photo = image && !image.endsWith(".svg");
  const side = (buttons.length > 0 || stats.length > 0) && (
    <div className={styles.side}>
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
  );

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${form ? styles.split : ""}`}>
          <div className={`${styles.top} ${form ? styles.stack : ""} enter-seq`}>
            <div className={styles.copy}>
              <h1 className={styles.title}>
                <SplitText text={title} highlight={titleHighlight(title)} highlightClass="hl" />
              </h1>
              <Paragraphs items={text} className={styles.text} />
            </div>
            {side}
          </div>

          {form && (
            <div className={`${styles.formCard} enter-media`}>
              <h2 className={styles.formTitle}>Let&apos;s discuss your project</h2>
              <p className={styles.formText}>Share your requirements — we reply within one business day.</p>
              <ContactForm />
            </div>
          )}

          {photo && !form && (
            <div className={`${styles.photo} enter-media`}>
              <Image src={image} alt="" fill priority sizes="(max-width: 1340px) 100vw, 1280px" className={styles.photoImg} />
            </div>
          )}
        </div>
      </section>
      {logos && <ClientLogos variant="strip" />}
    </>
  );
}
