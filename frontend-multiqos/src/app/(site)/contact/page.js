import Image from "next/image";
import PageHero from "@/components/site/PageHero";
import ContactBand from "@/components/site/ContactBand";
import { OFFICES } from "@/content/siteContent";
import styles from "./contact.module.css";
import { seoMetadata } from "@/content/seo";

export const metadata = seoMetadata("/contact");

// Centered "Contact Us" title, the contact card with the form, then the offices
export default function ContactPage() {
  return (
    <>
      <PageHero
        center
        title="Contact Us"
        highlight="Contact"
        intro="Let's talk about your project. Share a few details and our team will get back to you. Prefer email or phone? We're happy to hear from you there too."
      />
      <ContactBand always />

      <section className="section" aria-labelledby="offices-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Our Offices</span>
              <h2 id="offices-title" className="section-title">
                Where to find us
              </h2>
            </div>
          </div>
          <ul className={styles.offices} data-stagger>
            {OFFICES.map((o) => (
              <li key={o.country} className={styles.office}>
                {o.flag && <Image src={o.flag} alt="" width={44} height={30} className={styles.flag} />}
                <h3>{o.country}</h3>
                <p>{o.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
