import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import ServicesGrid from "@/components/site/ServicesGrid";
import EngagementModels from "@/components/site/EngagementModels";
import Industries from "@/components/site/Industries";
import ClientLogos from "@/components/site/ClientLogos";
import ProcessSteps from "@/components/blocks/ProcessSteps";
import LogoCategories from "@/components/blocks/LogoCategories";
import { SERVICES, TECH_STACK } from "@/content/siteContent";
import { seoMetadata } from "@/content/seo";

export const metadata = seoMetadata("/services");

const PROCESS = [
  { title: "Discover", text: ["We learn your goals, users and constraints, then shape a clear scope and plan."] },
  { title: "Design", text: ["Wireframes and UI designs you can click through before any code is written."] },
  { title: "Build", text: ["Agile sprints with regular demos, so you see real progress every step of the way."] },
  { title: "Launch & Support", text: ["Testing, deployment and ongoing maintenance to keep everything running smoothly."] },
];

const TECH_GROUPS = Object.entries(TECH_STACK).map(([name, items]) => ({ name, items }));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="End-to-end software development, powered by AI"
        highlight="software development"
        intro="From the first idea to launch and beyond — one team for strategy, design, development and support."
      >
        <Link href="/contact" className="btn">
          Discuss Your Project <ArrowUpRight aria-hidden="true" />
        </Link>
      </PageHero>
      <ClientLogos variant="strip" />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What We Offer"
            title="Services built around your goals"
            intro="Pick a single service or combine them — we tailor every engagement to your business."
          />
          <ServicesGrid services={SERVICES} detailed />
        </div>
      </section>

      <ProcessSteps
        heading={{ text: "How we deliver", highlight: "" }}
        intro={["A clear, agile process from the first conversation to launch — with demos at every step."]}
        items={PROCESS}
      />
      <EngagementModels />
      <LogoCategories
        heading={{ text: "Technologies & platforms we use", highlight: "" }}
        intro={["Modern, proven tools — chosen for what your product needs, not what is trendy."]}
        categories={TECH_GROUPS}
      />
      <Industries />
    </>
  );
}
