import { Fragment } from "react";
import Industries from "@/components/site/Industries";
import Testimonials from "@/components/site/Testimonials";
import ClientLogos from "@/components/site/ClientLogos";
import StatsGrid from "@/components/site/StatsGrid";
import HeroBlock from "./HeroBlock";
import CardGrid from "./CardGrid";
import CtaBand from "./CtaBand";
import FaqBlock from "./FaqBlock";
import FeatureSlider from "./FeatureSlider";
import LogoCategories from "./LogoCategories";
import ProcessSteps from "./ProcessSteps";
import HiringModels from "./HiringModels";
import TechStackTags from "./TechStackTags";
import MediaText from "./MediaText";
import ComparisonTable from "./ComparisonTable";
import QuoteBlock from "./QuoteBlock";
import CaseStudies from "./CaseStudies";
import TestimonialList from "./TestimonialList";
import TechDirectory from "./TechDirectory";
import BlogPosts from "./BlogPosts";
import AgentShowcase from "./AgentShowcase";
import { CstHero, CstIntro, CstShowcase, CstGallery, NumberedPoints, Checklist } from "./CaseStudyBlocks";

// Small label above a card grid's heading (multiqos puts one on every section),
// picked from the words in the heading
const EYEBROWS = [
  [/why|choose|benefit|advantage/i, "Why Choose Us"],
  [/platform|technolog|stack|tool/i, "Technologies"],
  [/industr/i, "Industries"],
  [/process|step|how we/i, "Our Process"],
  [/hire|developer|talent|team/i, "Hire Developers"],
  [/feature/i, "Features"],
];
const eyebrowFor = (heading) => EYEBROWS.find(([re]) => re.test(heading?.text || ""))?.[1] || "What We Offer";

// Block type (from the content JSON) -> component.
// `tone` alternates white / light-grey backgrounds between plain sections.
const BLOCKS = {
  hero: (b) => <HeroBlock {...b} />,
  "box-grid": (b, tone) => <CardGrid {...b} tone={tone} eyebrow={eyebrowFor(b.heading)} />,
  "ai-agents": (b, tone) => <AgentShowcase {...b} tone={tone} />,
  "mid-page-cta": (b) => <CtaBand {...b} />,
  faq: (b, tone) => <FaqBlock {...b} tone={tone} />,
  "content-with-box-slider": (b, tone) => <FeatureSlider {...b} tone={tone} />,
  "technologies-platforms": (b, tone) => <LogoCategories {...b} tone={tone} />,
  "technologies-hire-developer": (b, tone) => <LogoCategories {...b} tone={tone} />,
  "cst-technologies-stack": (b, tone) => <LogoCategories heading={b.heading} items={b.items} tone={tone} />,
  "process-steps": (b, tone) => <ProcessSteps {...b} tone={tone} />,
  "development-process-followed": (b, tone) => <ProcessSteps {...b} tone={tone} />,
  "industries-serve": (b, tone) => <Industries title={b.heading?.text} intro={b.intro?.[0]} tone={tone} />,
  "quote-slider": (b, tone) => <Testimonials title={b.heading?.text || undefined} tone={tone} />,
  "blog-post": (b, tone) => <BlogPosts heading={b.heading} tone={tone} />,
  "hiring-developer-models": (b, tone) => <HiringModels {...b} tone={tone} />,
  "technology-stack": (b, tone) => <TechStackTags {...b} tone={tone} />,
  "gallery-alongside-text": (b, tone) => <MediaText {...b} tone={tone} />,
  "image-alongside-text": (b, tone) => <MediaText {...b} imageSide="left" tone={tone} />,
  "stats-counter": (b) => (
    <section className="section">
      <div className="container">
        <StatsGrid items={b.items} />
      </div>
    </section>
  ),
  "our-clients": (b, tone) => <ClientLogos title={b.heading?.text} intro={b.intro?.[0]} tone={tone} />,
  "case-studies": (b, tone) => <CaseStudies {...b} tone={tone} headingLevel={b.heading?.text ? 3 : 2} />,
  comparison: (b, tone) => <ComparisonTable {...b} tone={tone} />,
  quote: (b) => <QuoteBlock {...b} />,
  "testimonial-list": (b) => <TestimonialList {...b} />,
  "tech-directory": (b) => <TechDirectory {...b} />,
  "cst-hero": (b) => <CstHero {...b} />,
  "cst-intro": (b) => <CstIntro {...b} />,
  "cst-featured-image-video": (b, tone) => <CstShowcase {...b} tone={tone} />,
  "cst-two-column-grid": (b) => <CstGallery {...b} />,
  "two-column-numeric-content": (b) => <NumberedPoints {...b} />,
  "listing-content": (b, tone) => <Checklist {...b} tone={tone} />,
};

// Blocks that draw their own background (they don't take part in the alternation)
const OWN_BACKGROUND = new Set(["hero", "mid-page-cta", "quote", "testimonial-list", "tech-directory", "cst-hero", "cst-intro", "cst-two-column-grid", "two-column-numeric-content", "stats-counter"]);

export default function BlockRenderer({ blocks = [] }) {
  let plain = 0;
  const rendered = blocks.map((block, i) => {
    const render = BLOCKS[block.type];
    if (!render) return null;
    const tone = OWN_BACKGROUND.has(block.type) ? undefined : plain++ % 2 ? "alt" : "plain";
    return <Fragment key={i}>{render(block, tone)}</Fragment>;
  });

  return <>{rendered}</>;
}
