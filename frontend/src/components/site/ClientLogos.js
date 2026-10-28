import Image from "next/image";
import { CLIENTS } from "@/content/siteContent";
import styles from "./ClientLogos.module.css";

// One copy of a row; the second copy (decorative) makes the loop seamless
function Track({ logos, copy }) {
  return (
    <ul className={styles.track} aria-hidden={copy || undefined}>
      {logos.map((c) => (
        <li key={c.name} className={styles.item}>
          <Image src={c.logo} alt={copy ? "" : c.name} width={160} height={64} className={styles.logo} sizes="160px" />
        </li>
      ))}
    </ul>
  );
}

// "Trusted by" client logos: one row scrolling sideways in a loop.
// tone: "plain" | "alt" (grey band) | "hero" (transparent, inside the home hero)
// (pause on hover/focus; a still grid for reduced motion)
export default function ClientLogos({ title = "Trusted by 250+ clients, from startups to global enterprises", intro, tone = "plain" }) {
  return (
    <section className={`${styles.section} ${styles[tone] || ""}`} aria-labelledby="clients-title">
      <div className="container">
        <h2 id="clients-title" className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
        <div className={styles.row}>
          <Track logos={CLIENTS} />
          <Track logos={CLIENTS} copy />
        </div>
      </div>
    </section>
  );
}
