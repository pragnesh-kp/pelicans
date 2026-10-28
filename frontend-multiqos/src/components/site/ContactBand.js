"use client";

import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import SocialIcon from "@/components/ui/SocialIcon";
import { SITE, SOCIAL_LINKS } from "@/content/siteContent";
import styles from "./ContactBand.module.css";

// Grey "Contact Us" card with the form, above the footer on every page
// (the contact page has its own, so it is skipped there)
export default function ContactBand({ always = false }) {
  const pathname = usePathname();
  if (!always && pathname === "/contact") return null;

  return (
    <section className="section" aria-labelledby="contact-band-title">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.info} data-reveal>
            <span className="eyebrow">Contact Us</span>
            <h2 id="contact-band-title" className={styles.title}>
              Let&apos;s talk about your project
            </h2>
            <p className={styles.text}>
              Share a few details and our team will get back to you. Prefer email or phone? We&apos;re happy to hear from you there too.
            </p>

            <dl className={styles.details}>
              <div>
                <dt>Email address</dt>
                <dd>
                  <Mail size={18} aria-hidden="true" />
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt>Contact number</dt>
                <dd>
                  <Phone size={18} aria-hidden="true" />
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </dd>
              </div>
            </dl>

            <p className={styles.followLabel}>Follow us</p>
            <ul className={styles.social} aria-label="Social media">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <SocialIcon name={s.label} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.formCard} data-reveal="right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
