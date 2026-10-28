import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/site/SectionHeading";
import { SERVICES } from "@/content/siteContent";
import styles from "./Home.module.css";

// Split heading, then a 3-column grid of white bordered service cards
export default function ServiceCards() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="What We Do"
          title="Development Services Built Around Your Business Goals"
          highlight="Your Business Goals"
          intro="From AI and data to web, mobile and e-commerce, we design, build and support software that automates work, delights users and grows revenue."
        />
        <ul className={styles.services} data-stagger>
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link href={`/services/${s.id}`} className={`card ${styles.service}`}>
                <span className="icon-tile">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceText}>{s.description}</p>
                <span className="link-arrow">
                  Explore <ArrowUpRight aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
