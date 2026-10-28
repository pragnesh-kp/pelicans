import LogoTabs from "./LogoTabs";
import { BlockHeading } from "./parts";
import styles from "./LogoCategories.module.css";

// Technology logos: category tabs + white tiles. Pass `items` instead of `categories` for one list.
export default function LogoCategories({ heading, intro = [], categories, items, tone }) {
  const groups = (categories || [{ name: "", items: items || [] }]).filter((g) => g.items.length);
  if (!groups.length) return null;
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={intro} />
        <div className={styles.wrap} data-reveal>
          <LogoTabs groups={groups} />
        </div>
      </div>
    </section>
  );
}
