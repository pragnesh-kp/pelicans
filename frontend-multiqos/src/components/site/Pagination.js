import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

// Page numbers to show, e.g. [1, "…", 4, 5, 6, "…", 12]
function pageList(page, pages) {
  const set = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = [...set].sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, pages, hrefFor }) {
  if (pages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={styles.arrow} rel="prev">
          <ChevronLeft size={18} aria-hidden="true" /> Previous
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.disabled}`} aria-hidden="true">
          <ChevronLeft size={18} /> Previous
        </span>
      )}

      <ol className={styles.pages}>
        {pageList(page, pages).map((p, i) =>
          p === "…" ? (
            <li key={`gap${i}`} className={styles.gap} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <Link
                href={hrefFor(p)}
                className={p === page ? styles.current : undefined}
                aria-current={p === page ? "page" : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </Link>
            </li>
          )
        )}
      </ol>

      {page < pages ? (
        <Link href={hrefFor(page + 1)} className={styles.arrow} rel="next">
          Next <ChevronRight size={18} aria-hidden="true" />
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.disabled}`} aria-hidden="true">
          Next <ChevronRight size={18} />
        </span>
      )}
    </nav>
  );
}
