import Image from "next/image";
import ClientLogos from "@/components/site/ClientLogos";
import ContactForm from "@/components/site/ContactForm";
import CountUp from "@/components/motion/CountUp";
import { AccentTitle, Buttons, Paragraphs } from "./parts";
import styles from "./HeroBlock.module.css";

// Part of the page title shown in the italic serif + gradient:
// "AI/ML Development" -> "Development", "Hire Java Developers" -> "Java Developers"
function titleAccent(title = "") {
  const words = title.split(" ");
  if (words.length < 2) return "";
  if (words[0].toLowerCase() === "hire") return words.slice(1).join(" ");
  const n = words.length > 4 ? 2 : 1;
  return words.slice(-n).join(" ");
}

// Top of a content page (metizsoft sub-page hero): soft grid background, small
// uppercase kicker, very large title with a serif-gradient accent, text and
// button; picture or enquiry form on the right; numbers row underneath.
export default function HeroBlock({ title, text = [], buttons = [], image, stats = [], form, logos, kicker = "Pelicans Technologies" }) {
  const photo = image && !image.endsWith(".svg") && !form;
  const aside = form || photo;

  return (
    <>
      <section className={`grid-wash hero-top ${styles.hero}`}>
        <div className={`container ${aside ? styles.split : ""}`}>
          <div className={`${styles.copy} enter-seq`}>
            <p className={`kicker ${styles.kicker}`}>{kicker}</p>
            <AccentTitle text={title} accent={titleAccent(title)} className={`${styles.title} ${aside ? styles.titleSm : ""}`} />
            <Paragraphs items={text} className={styles.text} />
            <Buttons buttons={buttons} />
          </div>

          {form && (
            <div className={`${styles.formCard} enter-media`}>
              <h2 className={styles.formTitle}>Let&apos;s discuss your project</h2>
              <p className={styles.formText}>Share your requirements — we reply within one business day.</p>
              <ContactForm />
            </div>
          )}

          {photo && (
            <div className={`${styles.photo} enter-media`}>
              <Image src={image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 600px" className={styles.photoImg} />
            </div>
          )}
        </div>

        {stats.length > 0 && (
          <div className="container">
            <dl className={styles.stats} data-stagger>
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <dd className={styles.statValue}>{s.value ? <CountUp value={s.value} /> : "✓"}</dd>
                  <dt className={styles.statLabel}>{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>
      {logos && <ClientLogos variant="strip" />}
    </>
  );
}
