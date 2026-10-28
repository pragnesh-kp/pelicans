import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CLIENTS, STATS } from "@/content/siteContent";
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

// Client logos (always in full colour).
//   variant "strip": kicker + numbers line, then two rows sliding in opposite directions (under the home hero)
//   variant "grid"  (default): white tiles with a "Ready to get started?" tile at the end
export default function ClientLogos({ title = "Trusted by 200+ clients, from startups to global enterprises", intro, variant = "grid", tone }) {
  if (variant === "strip") {
    const half = Math.ceil(CLIENTS.length / 2);
    const rows = [CLIENTS.slice(0, half), CLIENTS.slice(half)];
    return (
      <section className={styles.strip} aria-label="Our clients">
        <div className={`container ${styles.stripHead}`}>
          <p className="kicker">Trusted by {STATS[2]?.value || "200+"} clients</p>
          <p className={styles.facts}>
            {STATS.slice(0, 3).map((s, i) => (
              <span key={s.label}>
                {i > 0 && " · "}
                {i === 0 ? <strong>{`${s.value} ${s.label}`}</strong> : `${s.value} ${s.label}`}
              </span>
            ))}
          </p>
        </div>
        {rows.map((row, r) => (
          <div key={r} className={`${styles.row} ${r ? styles.reverse : ""}`}>
            <Track logos={row} />
            <Track logos={row} copy />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`} aria-labelledby="clients-title">
      <div className="container">
        <div className="section-head section-head--center" data-reveal>
          <span className="eyebrow">Our Clients</span>
          <h2 id="clients-title" className="section-title">
            {title}
          </h2>
          {intro && <p className="section-head__intro">{intro}</p>}
        </div>
        <ul className={styles.grid} data-stagger>
          {CLIENTS.slice(0, 15).map((c) => (
            <li key={c.name} className={styles.tile}>
              <Image src={c.logo} alt={c.name} width={160} height={64} className={styles.logo} sizes="160px" />
            </li>
          ))}
          <li className={`${styles.tile} ${styles.ctaTile}`}>
            <p>Ready to get started?</p>
            <Link href="/contact" className="btn btn--light btn--sm">
              Contact Us <ArrowUpRight aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
