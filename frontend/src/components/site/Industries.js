import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import IndustryScroller from "./IndustryScroller";
import { INDUSTRIES } from "@/content/siteContent";
import styles from "./Industries.module.css";

export default function Industries({
  title = "Solving complex challenges across every major industry",
  intro = "Deep domain expertise that turns industry challenges into working software.",
  tone,
}) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <div className={styles.top}>
          <SectionHeading eyebrow="Industries" title={title} intro={intro} align="left" />
          <Link href="/industries" className={`btn btn--outline ${styles.all}`}>
            Check All Industries <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <IndustryScroller items={INDUSTRIES} />
      </div>
    </section>
  );
}
