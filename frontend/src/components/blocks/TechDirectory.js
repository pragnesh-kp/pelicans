import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./parts";
import JumpNav from "./JumpNav";
import styles from "./TechDirectory.module.css";

const anchor = (name) => "category-" + name.toLowerCase().replace(/&/g, "").replace(/\W+/g, "-");

// Technologies page: jump links + one section per category with a card per technology
export default function TechDirectory({ categories = [] }) {
  return (
    <>
      <JumpNav links={categories.map((c) => ({ id: anchor(c.name), name: c.name }))} />

      {categories.map((c, i) => (
        <section key={c.name} id={anchor(c.name)} className={`section ${i % 2 ? "section--alt" : ""}`}>
          <div className="container">
            <div className={styles.head} data-reveal>
              <h2 className={styles.name}>{c.name}</h2>
              {c.description && <p className={styles.description}>{c.description}</p>}
            </div>
            <ul className={styles.grid} data-stagger>
              {c.items.map((t) => (
                <li key={t.name}>
                  <Link href={t.href} className={styles.card} data-spotlight>
                    {t.logo && (
                      <span className={styles.logoTile}>
                        <Logo src={t.logo} size={36} />
                      </span>
                    )}
                    <h3 className={styles.title}>{t.name}</h3>
                    {t.text && <p className={styles.text}>{t.text}</p>}
                    <span className={styles.more}>
                      Learn more <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
