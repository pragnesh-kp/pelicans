import styles from "./QuoteBlock.module.css";

// Large centred statement
export default function QuoteBlock({ text }) {
  return (
    <section className="section">
      <div className="container">
        <p className={styles.quote} data-reveal="zoom">
          {text}
        </p>
      </div>
    </section>
  );
}
