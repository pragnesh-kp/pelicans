import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

// Client logos.
//   variant "grid"  (default): bordered tiles with a "Ready to get started?" tile at the end (multiqos achievements block)
//   variant "strip": one row scrolling sideways in a loop (under page heroes)
export default function ClientLogos({ title = "Trusted by 250+ clients, from startups to global enterprises", intro, variant = "grid" }) {
  if (variant === "strip") {
    return (
      <div className={styles.strip} aria-label="Our clients">
        <div className={styles.row}>
          <Track logos={CLIENTS} />
          <Track logos={CLIENTS} copy />
        </div>
      </div>
    );
  }

  return (
    <section className="section" aria-labelledby="clients-title">
      <div className="container">
        <div className="section-head section-head--center" data-reveal>
          <div>
            <span className="eyebrow">Our Clients</span>
            <h2 id="clients-title" className="section-title">
              {title}
            </h2>
          </div>
          {intro && <p className="section-head__intro">{intro}</p>}
        </div>
        <ul className={styles.grid} data-stagger>
          {CLIENTS.slice(0, 17).map((c) => (
            <li key={c.name} className={styles.tile}>
              <Image src={c.logo} alt={c.name} width={160} height={64} className={styles.logo} sizes="160px" />
            </li>
          ))}
          <li className={`${styles.tile} ${styles.ctaTile}`}>
            <p>Ready to get started?</p>
            <Link href="/contact" className="btn btn--accent btn--sm">
              Contact Us <ArrowUpRight aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
