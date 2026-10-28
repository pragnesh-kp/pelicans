import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import ServicesGrid from "@/components/site/ServicesGrid";
import EngagementModels from "@/components/site/EngagementModels";
import Industries from "@/components/site/Industries";
import TechStack from "@/components/site/TechStack";
import CtaBanner from "@/components/site/CtaBanner";
import { SERVICES } from "@/content/siteContent";
import styles from "./services.module.css";
import { seoMetadata } from "@/content/seo";

export const metadata = seoMetadata("/services");

const PROCESS = [
  { title: "Discover", text: "We learn your goals, users and constraints, then shape a clear scope and plan." },
  { title: "Design", text: "Wireframes and UI designs you can click through before any code is written." },
  { title: "Build", text: "Agile sprints with regular demos, so you see real progress every step of the way." },
  { title: "Launch & Support", text: "Testing, deployment and ongoing maintenance to keep everything running smoothly." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="End-to-end software development, powered by AI"
        intro="From the first idea to launch and beyond — one team for strategy, design, development and support."
      >
        <Link href="/contact" className={`btn btn--primary ${styles.heroBtn}`}>
          Discuss Your Project <ArrowUpRight aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we offer"
            title="Services built around your goals"
            intro="Pick a single service or combine them — we tailor every engagement to your business."
          />
          <ServicesGrid services={SERVICES} detailed />
        </div>
      </section>

      {/* Process */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Our process" title="How we deliver" />
          <ol className={styles.process} data-stagger>
            {PROCESS.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <EngagementModels />
      <TechStack />
      <Industries />
      <CtaBanner />
    </>
  );
}
