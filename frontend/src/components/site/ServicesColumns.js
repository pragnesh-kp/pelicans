import Link from "next/link";
import { ArrowUpRight, BrainCircuit, CodeXml, ShoppingCart, Users } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import PinnedColumns from "@/components/motion/PinnedColumns";
import styles from "./ServicesColumns.module.css";

const COLUMNS = [
  {
    icon: BrainCircuit,
    title: "AI, Data & Automation",
    text: "Turn data into decisions with AI/ML models, chatbots and data pipelines.",
    links: [
      ["AI/ML Development", "/services/ai-ml-development"],
      ["Data Engineering", "/services/data-engineering"],
      ["Chatbot Development", "/services/chatbot"],
      ["Microsoft Services", "/services/microsoft-services"],
    ],
  },
  {
    icon: CodeXml,
    title: "Product Development & Engineering",
    text: "Design and build web, mobile and custom software from idea to launch.",
    links: [
      ["Custom Software", "/services/custom-software"],
      ["Web Development", "/services/web-development"],
      ["Mobile App Development", "/services/mobile-app-development"],
      ["UI/UX Design", "/services/ui-ux"],
    ],
  },
  {
    icon: ShoppingCart,
    title: "Commerce & Emerging Tech",
    text: "Online stores, blockchain and connected devices that grow with you.",
    links: [
      ["E-Commerce Development", "/services/e-commerce"],
      ["Blockchain", "/services/blockchain"],
      ["IoT Solutions", "/services/iot"],
      ["DevOps", "/services/devops"],
    ],
  },
  {
    icon: Users,
    title: "Dedicated Teams & Hiring",
    text: "Add vetted developers to your team — full-time, part-time or hourly.",
    links: [
      ["Hire Developers", "/hire-developers"],
      ["Engagement Models", "/engagement-model"],
      ["Our Process", "/process"],
      ["Technologies", "/technologies"],
    ],
  },
];

// Off-white band: four service columns with thin dividers (pinned + staggered on desktop)
export default function ServicesColumns() {
  return (
    <section className={`section section--light ${styles.section}`}>
      <PinnedColumns className={styles.pin}>
        <div className="container">
          <div className={styles.head}>
            <h2 className={styles.title} data-reveal="fade">
              <SplitText text="Technology services built around your business goals" />
            </h2>
            <Link href="/services" className="btn btn--outline">
              View All Services <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.columns}>
            {COLUMNS.map(({ icon: ColIcon, title, text, links }) => (
              <div key={title} className={styles.column} data-column>
                <span className={styles.icon}>
                  <ColIcon size={22} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>
                  {links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href}>
                        {label} <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PinnedColumns>
    </section>
  );
}
