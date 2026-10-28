import { Mail, Phone } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import { SITE, OFFICES, SOCIAL_LINKS } from "@/content/siteContent";
import styles from "./contact.module.css";
import { seoMetadata } from "@/content/seo";

export const metadata = seoMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your project"
        intro="Share a few details and our team will get back to you. Prefer email or phone? We're happy to hear from you there too."
      />

      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send us a message</h2>
            <ContactForm />
          </div>

          <aside className={styles.info} aria-label="Contact details">
            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Project inquiries</h2>
              <a href={`mailto:${SITE.email}`} className={styles.infoLink}>
                <span className={styles.infoIcon}>
                  <Mail size={20} aria-hidden="true" />
                </span>
                {SITE.email}
              </a>
              <a href={SITE.phoneHref} className={styles.infoLink}>
                <span className={styles.infoIcon}>
                  <Phone size={20} aria-hidden="true" />
                </span>
                {SITE.phone}
              </a>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Our offices</h2>
              <ul className={styles.offices} data-stagger>
                {OFFICES.map((o) => (
                  <li key={o.country}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={o.flag} alt="" width={22} height={22} className={styles.flag} />
                    <span>
                      <strong>{o.country}</strong>
                      {o.address}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Follow us</h2>
              <ul className={styles.social}>
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
