import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { SITE, NAV_LINKS, SERVICES, OFFICES, SOCIAL_LINKS } from "@/content/siteContent";
import { MAIN_MENU } from "@/content/menu";
import styles from "./Footer.module.css";

const menu = (label) => MAIN_MENU.find((m) => m.label === label);
const links = (label, count) => menu(label).groups.flatMap((g) => g.links).slice(0, count);

const COLUMNS = [
  { title: "Company", links: NAV_LINKS.slice(0, 8) },
  { title: "Services", links: SERVICES.slice(0, 8).map((s) => ({ label: s.title, href: `/services/${s.id}` })), more: "/services" },
  { title: "Hire Talent", links: links("Hire Talent", 8), more: "/hire-developers" },
  { title: "Technologies", links: links("Technologies", 8), more: "/technologies" },
  { title: "Industries", links: links("Industries", 8), more: "/industries" },
];

const SOCIAL_SHORT = { LinkedIn: "in", Facebook: "f", Instagram: "ig", X: "x" };

export default function Footer() {
  return (
    <footer className={`theme-dark ${styles.footer}`}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.about}>Custom software, AI, web and mobile app development company — trusted for over a decade.</p>
          </div>
          <ul className={styles.contact}>
            <li>
              <Mail size={18} aria-hidden="true" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <Phone size={18} aria-hidden="true" />
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
          </ul>
        </div>

        {/* Offices */}
        <ul className={styles.offices} data-stagger>
          {OFFICES.map((o) => (
            <li key={o.country} className={styles.office}>
              {o.flag && <Image src={o.flag} alt="" width={28} height={28} className={styles.flag} />}
              <strong>{o.country}</strong>
              <span>{o.address}</span>
            </li>
          ))}
        </ul>

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
              </ul>
              {col.more && (
                <Link href={col.more} className={styles.more}>
                  View more <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              )}
            </div>
          ))}
          <div className={styles.touch}>
            <Link href="/contact" className="btn btn--accent">
              Get in Touch
            </Link>
            <ul className={styles.social} aria-label="Social media">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {SOCIAL_SHORT[s.label] || s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Blue gradient base */}
      <div className={styles.base}>
        <div className={`container ${styles.bottom}`}>
          <ul className={styles.legal}>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
