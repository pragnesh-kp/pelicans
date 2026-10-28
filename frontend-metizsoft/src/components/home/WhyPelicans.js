import Image from "next/image";
import { ShieldCheck, RefreshCcw, Handshake } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import styles from "./Home.module.css";

const POINTS = [
  {
    icon: ShieldCheck,
    tone: "rose",
    title: "Your Idea Stays Yours",
    text: "We sign an NDA before the first workshop. Your code, data and product plans stay protected for the whole project — and after it.",
  },
  {
    icon: RefreshCcw,
    tone: "amber",
    title: "Agile, Transparent Delivery",
    text: "Two-week sprints, working demos and direct access to the developers on your project. You always know what is done and what is next.",
  },
  {
    icon: Handshake,
    tone: "violet",
    title: "Flexible Engagement",
    text: "Fixed price, time & material or a dedicated team — full-time, part-time or hourly, billed monthly with no project-manager fees.",
  },
];

// Tall photo on the left; pill, centred title, intro, three point cards and a
// highlighted note on the right (metizsoft "challenge" section layout)
export default function WhyPelicans() {
  return (
    <section className="section">
      <div className={`container ${styles.why}`}>
        <div className={styles.whyMedia} data-reveal="left">
          <div className={styles.whyPhoto}>
            <Image src="/images/wp/2025-01-custom-software-development.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 380px" className={styles.cover} />
          </div>
          <div className={styles.whyBadge}>
            <strong>500+</strong>
            <span>projects shipped for clients in 20+ countries</span>
          </div>
        </div>

        <div>
          <div className="section-head section-head--center" data-reveal>
            <span className="eyebrow">Why Pelicans</span>
            <h2 className="section-title">
              <SplitText text="Software Partners Who Stay Accountable After Launch" highlight="Stay Accountable" highlightClass="hl" />
            </h2>
            <p className="section-head__intro">
              Good software starts with your business goal, not a technology wish-list. We listen first, plan the smallest product that
              proves the idea, and keep improving it with you once it is live.
            </p>
          </div>

          <ul className={styles.points} data-stagger>
            {POINTS.map(({ icon: Icon, tone, title, text }) => (
              <li key={title} className={`card card--hover ${styles.point}`}>
                <span className={`${styles.pointIcon} ${styles[tone]}`}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className={styles.pointTitle}>{title}</h3>
                <p className={styles.pointText}>{text}</p>
              </li>
            ))}
          </ul>

          <p className={styles.note} data-reveal>
            At Pelicans you work directly with the people building your product — <strong>one team, one point of contact</strong>, from
            the first call to long after launch.
          </p>
        </div>
      </div>
    </section>
  );
}
