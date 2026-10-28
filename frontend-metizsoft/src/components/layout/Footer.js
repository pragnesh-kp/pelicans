import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import SocialIcon from "@/components/ui/SocialIcon";
import { SITE, SERVICES, OFFICES, SOCIAL_LINKS, STATS } from "@/content/siteContent";
import { MAIN_MENU } from "@/content/menu";
import styles from "./Footer.module.css";

const menu = (label) => MAIN_MENU.find((m) => m.label === label);
const links = (label, count) => menu(label).groups.flatMap((g) => g.links).slice(0, count);

const COLUMNS = [
  { title: "AI & Intelligent Systems", links: links("AI & Innovation", 6) },
  { title: "Development Services", links: SERVICES.filter((s) => !["ai-ml-development", "data-engineering", "iot", "blockchain", "chatbot"].includes(s.id)).map((s) => ({ label: s.title, href: `/services/${s.id}` })) },
  { title: "Hire Developers", links: links("Hire Talent", 7), more: "/hire-developers" },
  { title: "Industries", links: links("Industries", 7), more: "/industries" },
  { title: "Company", links: [...links("Company", 6), { label: "Portfolio", href: "/portfolio" }, { label: "Contact Us", href: "/contact" }] },
];

// Deep-blue footer (metizsoft layout): logo + line about us and the numbers
// on top, five link columns, the offices with flags, then the copyright line
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo variant="light" />
            <p className={styles.about}>
              Custom software, AI, web and mobile app development company — trusted by startups and global brands for over a decade.
            </p>
          </div>

          <ul className={styles.badges} aria-label="Pelicans in numbers">
            {STATS.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
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
                      View all <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <ul className={styles.offices}>
          {OFFICES.map((o, i) => (
            <li key={o.country} className={styles.office}>
              {o.flag && <Image src={o.flag} alt="" width={28} height={20} className={styles.flag} />}
              <strong>{o.country}</strong>
              <p className={styles.line}>
                <MapPin size={14} aria-hidden="true" />
                <span>{o.address}</span>
              </p>
              {i === 0 && (
                <>
                  <p className={styles.line}>
                    <Phone size={14} aria-hidden="true" />
                    <a href={SITE.phoneHref}>{SITE.phone}</a>
                  </p>
                  <p className={styles.line}>
                    <Mail size={14} aria-hidden="true" />
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.follow}>
          <p>
            Follow our work and <br />
            the latest from our team
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

        <p className={styles.copy}>
          © 2012–{new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
