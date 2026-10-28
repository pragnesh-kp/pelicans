import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./NotFoundContent.module.css";

const LINKS = [
  { href: "/services", label: "Our services" },
  { href: "/blog", label: "Latest articles" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFoundContent() {
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>We couldn&apos;t find that page</h1>
        <p className={styles.text}>The link may be broken, or the page may have moved. Here are some helpful places instead:</p>
        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>
                {l.label} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="btn btn--primary">
          Go to the homepage
        </Link>
      </div>
    </section>
  );
}
