import Image from "next/image";
import { DatabaseZap, Headset, ListChecks, MessageSquareText, Mic, Network, ShieldCheck, Target, Workflow, Wrench } from "lucide-react";
import { BlockHeading, Buttons } from "./parts";
import styles from "./AgentShowcase.module.css";

// Icon names used in the page data
const ICONS = { DatabaseZap, Headset, ListChecks, MessageSquareText, Mic, Network, ShieldCheck, Target, Workflow, Wrench };

// AI agent development: how an agent works (4 steps), the kinds of agents we
// build (cards) and the platforms we build them on (logo chips).
export default function AgentShowcase({ heading, intro = [], steps = [], items = [], platforms = [], buttons = [], tone, eyebrow = "AI Agents" }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow={eyebrow} heading={heading} intro={intro} />

        <div className={styles.loop} data-reveal>
          <h3 className={styles.subheading}>How our AI agents work</h3>
          <ol className={styles.steps}>
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon];
              return (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepIcon} aria-hidden="true">
                    {Icon && <Icon size={22} />}
                  </span>
                  <span className={styles.stepCount} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepText}>{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <h3 className={styles.subheading}>AI agents we build</h3>
        <ul className={styles.grid} data-stagger>
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className={styles.card}>
                <span className={styles.cardIcon} aria-hidden="true">
                  {Icon && <Icon size={24} />}
                </span>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.cardText}>{item.text}</p>
              </li>
            );
          })}
        </ul>

        {platforms.length > 0 && (
          <div className={styles.platforms} data-reveal>
            <span className={styles.platformsLabel}>Built with</span>
            <ul className={styles.logos}>
              {platforms.map((p) => (
                <li key={p.name} className={styles.logo}>
                  <Image src={p.logo} alt="" width={22} height={22} />
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Buttons buttons={buttons} center />
      </div>
    </section>
  );
}
