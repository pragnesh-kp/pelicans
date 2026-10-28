import Image from "next/image";
import { BlockHeading, Buttons, FillImage, Paragraphs, Title } from "./parts";
import styles from "./CtaBand.module.css";

// Mid-page call to action (dark band). On case studies the same block is the
// "Outcome" text with image links (Visit website, App Store, Google Play).
export default function CtaBand({ heading, text = [], buttons = [], image, links = [] }) {
  const badges = links.filter((l) => l.href && l.image);
  if (badges.length || (!buttons.length && !image)) {
    return (
      <section className="section">
        <div className="container">
          <BlockHeading heading={heading} />
          <div className={styles.outcome} data-reveal>
            <Paragraphs items={text} className={styles.outcomeText} />
            {badges.length > 0 && (
              <div className={styles.badges}>
                {badges.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.badge}>
                    <Image src={l.image} alt={l.label || "Visit the live project"} width={200} height={60} className={styles.badgeImg} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={`${styles.band} ${image ? styles.withImage : ""}`} data-reveal="zoom">
          <div className={styles.copy}>
            <Title heading={heading} className={styles.title} />
            <Paragraphs items={text} className={styles.text} />
            <Buttons buttons={buttons} dark />
          </div>
          {image && (
            <div className={styles.media}>
              <FillImage src={image} sizes="(max-width: 900px) 80vw, 420px" className={styles.image} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
