import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import SocialIcon from "@/components/ui/SocialIcon";
import { SITE, NAV_LINKS, SERVICES, OFFICES, SOCIAL_LINKS } from "@/content/siteContent";
import { MAIN_MENU } from "@/content/menu";
import styles from "./Footer.module.css";

const menu = (label) => MAIN_MENU.find((m) => m.label === label);
const links = (label, count) => menu(label).groups.flatMap((g) => g.links).slice(0, count);

const COLUMNS = [
  { title: "Quick Links", links: NAV_LINKS.slice(0, 7) },
  { title: "Services", links: SERVICES.slice(0, 7).map((s) => ({ label: s.title, href: `/services/${s.id}` })), more: "/services" },
  { title: "Hire Developers", links: links("Hire Talent", 7), more: "/hire-developers" },
  { title: "Technologies", links: links("Technologies", 7), more: "/technologies" },
  { title: "Industries", links: links("Industries", 7), more: "/industries" },
];

// White footer: logo + offices with flags, five link columns, copyright bar
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.about}>Custom software, AI, web and mobile app development company — trusted for over a decade.</p>
            <ul className={styles.contact}>
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

          <ul className={styles.offices}>
            {OFFICES.map((o) => (
              <li key={o.country} className={styles.office}>
                {o.flag && <Image src={o.flag} alt="" width={30} height={20} className={styles.flag} />}
                <strong>{o.country}</strong>
                <span>{o.address}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.columns}>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className={styles.heading}>{col.title}</h2>
              <ul className={styles.list}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
                {col.more && (
                  <li>
                    <Link href={col.more} className={styles.more}>
                      View all →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <ul className={styles.social} aria-label="Social media">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <SocialIcon name={s.label} size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
