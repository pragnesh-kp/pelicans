import HomeHero from "@/components/site/HomeHero";
import ServicesColumns from "@/components/site/ServicesColumns";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import SectionHeading from "@/components/site/SectionHeading";
import EngagementModels from "@/components/site/EngagementModels";
import Industries from "@/components/site/Industries";
import Testimonials from "@/components/site/Testimonials";
import TechHub from "@/components/site/TechHub";
import CountUp from "@/components/motion/CountUp";
import CtaBand from "@/components/blocks/CtaBand";
import FaqBlock from "@/components/blocks/FaqBlock";
import { STATS, HOME_FAQ } from "@/content/siteContent";
import { caseStudySummaries } from "@/content/pages";
import styles from "./home.module.css";
import JsonLd from "@/components/seo/JsonLd";
import { seoMetadata, faqJsonLd } from "@/content/seo";

export const metadata = seoMetadata("/");

const FEATURED = [
  "slay-coffee-online-store",
  "art-hotel-hotel-booking-website",
  "blackberrys-online-clothing-store",
  "the-cruise-holidays-travel-portal",
  "ai-apartment-rental-marketplace",
];

const STAT_TEXT = [
  "Over a decade of building custom software for clients worldwide.",
  "Websites, apps and platforms launched across 10+ industries.",
  "Startups and global brands in more than 20 countries.",
  "Designers, engineers and QA specialists working as one team.",
];

export default function HomePage() {
  const projects = caseStudySummaries(FEATURED);

  return (
    <>
      <HomeHero />
      <ServicesColumns />

      {/* Featured projects */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our work" title="Innovation, engineered by Pelicans" />
          <ProjectShowcase projects={projects} />
        </div>
      </section>

      {/* Numbers */}
      <section className={`section ${styles.statsSection}`}>
        <div className="container">
          <ul className={styles.stats} data-stagger>
            {STATS.map((s, i) => (
              <li key={s.label} className={styles.stat} data-spotlight>
                <span className={styles.statValue}>
                  <CountUp value={s.value} />
                </span>
                <span className={styles.statLabel}>{s.label}</span>
                <p>{STAT_TEXT[i]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading={{ text: "Looking to revolutionize your business with AI?", highlight: "with AI?" }}
        text={["Work with engineers who turn your idea into a market-ready product — on time and on budget."]}
        buttons={[{ label: "Book a Free Consultation", href: "/contact" }]}
        image="/images/wp/2025-03-mid-page-img.png"
      />

      <Testimonials title="Words from our clients" tone="plain" />
      <EngagementModels alt />
      <Industries />
      <TechHub tone="alt" />
      <JsonLd data={faqJsonLd(HOME_FAQ)} />
      <FaqBlock heading={{ text: "Frequently Asked Questions" }} items={HOME_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
    </>
  );
}
