"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { SITE, STATS, TESTIMONIALS, CLIENTS } from "@/content/siteContent";
import styles from "./ContactBand.module.css";

// Light-blue contact section above the footer on every page (metizsoft layout):
// left — numbers card with a few client logos, then a rotating client quote;
// right — the white form card. The contact page has its own, so it is skipped there.
export default function ContactBand({ always = false }) {
  const pathname = usePathname();
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setQuote((q) => (q + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  if (!always && pathname === "/contact") return null;
  const t = TESTIMONIALS[quote];

  return (
    <section className={styles.band} id="contact" aria-labelledby="contact-band-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <div className={styles.box} data-reveal>
            <p className={styles.boxTitle}>Pelicans in Numbers</p>
            <dl className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd>{s.value}</dd>
                  <dt>{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className={styles.trusted}>Brands that build with us</p>
            <ul className={styles.logos}>
              {CLIENTS.slice(0, 5).map((c) => (
                <li key={c.name}>
                  <Image src={c.logo} alt={c.name} width={90} height={36} />
                </li>
              ))}
            </ul>
          </div>

          <figure className={`${styles.box} ${styles.quoteBox}`} data-reveal>
            <blockquote key={quote} className={styles.quote}>
              “{t.quote}”
            </blockquote>
            <figcaption className={styles.person}>
              {t.photo && <Image src={t.photo} alt="" width={52} height={52} className={styles.photo} />}
              <span>
                <strong>{t.name}</strong>
                <span>
                  {t.company}
                  {t.country && ` · ${t.country}`}
                </span>
              </span>
            </figcaption>
            <div className={styles.dots} aria-hidden="true">
              {TESTIMONIALS.map((x, i) => (
                <span key={x.name} className={i === quote ? styles.dotOn : ""} />
              ))}
            </div>
          </figure>

          <ul className={styles.direct}>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
          </ul>
        </div>

        <div className={styles.formCard} data-reveal="right">
          <h2 id="contact-band-title" className={styles.title}>
            Let’s talk about your project
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
