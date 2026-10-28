import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/content/siteContent";
import styles from "./CtaBanner.module.css";

export default function CtaBanner({
  title = "Have a project in mind? Let's build it together.",
  text = "Tell us about your idea — our team will get back to you with next steps and a free consultation.",
}) {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.banner} data-reveal="zoom">
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
          </div>
          <div className={styles.actions}>
            <Link href="/contact" className="btn btn--accent">
              Get a Free Quote <ArrowUpRight aria-hidden="true" />
            </Link>
            <a href={`mailto:${SITE.email}`} className={styles.email}>
              or email {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
