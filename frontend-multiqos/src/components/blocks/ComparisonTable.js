import { BlockHeading } from "./parts";
import styles from "./ComparisonTable.module.css";

// "Pelicans vs in-house vs agencies vs freelancers" table. First row = column headings.
export default function ComparisonTable({ heading, rows = [], tone, eyebrow = "Why Pelicans" }) {
  const [head = [], ...body] = rows;
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={eyebrow} heading={heading} />
        {/* tabIndex lets keyboard users scroll the table on small screens */}
        <div className={styles.scroller} tabIndex={0} role="region" aria-label={heading?.text || "Comparison"}>
          <table className={styles.table}>
            <thead>
              <tr>
                {head.map((cell, i) => (
                  <th key={i} scope="col" className={i === 1 ? styles.ours : undefined}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-stagger>
              {body.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className={i === 1 ? styles.ours : undefined}>
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
