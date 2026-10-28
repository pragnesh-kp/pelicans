"use client";

import Link from "next/link";
import styles from "@/components/site/NotFoundContent.module.css";

// Shown on the website if a page fails to load (for example the API is down)
export default function SiteError({ reset }) {
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.text}>This page couldn&apos;t be loaded right now. Please try again in a moment.</p>
        <div className={styles.links}>
          <button type="button" className="btn btn--primary" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="btn btn--outline">
            Go to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
