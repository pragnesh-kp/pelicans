import { Search, CodeXml, Rocket } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import styles from "./Home.module.css";

const STEPS = [
  {
    icon: Search,
    title: "Discover & Plan",
    text: "Workshops to understand your users, goals and constraints. We agree the scope, the tech stack and a clear roadmap with milestones and costs.",
  },
  {
    icon: CodeXml,
    title: "Design & Build",
    text: "Wireframes and UI design, then development in short Agile sprints with code reviews, automated tests and a demo at the end of every sprint.",
  },
  {
    icon: Rocket,
    title: "Launch & Grow",
    text: "Deployment, app-store release and monitoring — then ongoing maintenance, performance tuning and new features as your business grows.",
  },
];

// Grey band: pill + centred title, three white cards with a ringed icon
export default function ProcessCards() {
  return (
    <section className="section section--alt" id="how-we-work">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Our Process"
          title="From First Idea to a Product People Use"
          highlight="People Use"
          intro="A proven, transparent way of working that keeps projects on time, on budget and focused on outcomes."
        />
        <ul className={styles.steps} data-stagger>
          {STEPS.map(({ icon: Icon, title, text }) => (
            <li key={title} className={`card card--hover ${styles.step}`}>
              <span className={styles.ring} aria-hidden="true">
                <span>
                  <Icon size={18} />
                </span>
              </span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepText}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
