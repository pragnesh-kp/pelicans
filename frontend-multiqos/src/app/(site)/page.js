import HomeHero from "@/components/site/HomeHero";
import ServiceCards from "@/components/home/ServiceCards";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import TechNetwork from "@/components/home/TechNetwork";
import AboutStats from "@/components/home/AboutStats";
import SectionHeading from "@/components/site/SectionHeading";
import ClientLogos from "@/components/site/ClientLogos";
import EngagementModels from "@/components/site/EngagementModels";
import Industries from "@/components/site/Industries";
import Testimonials from "@/components/site/Testimonials";
import CaseStudies from "@/components/blocks/CaseStudies";
import CtaBand from "@/components/blocks/CtaBand";
import FaqBlock from "@/components/blocks/FaqBlock";
import BlogPosts from "@/components/blocks/BlogPosts";
import { HOME_FAQ } from "@/content/siteContent";
import { caseStudySummaries } from "@/content/pages";
import JsonLd from "@/components/seo/JsonLd";
import { seoMetadata, faqJsonLd } from "@/content/seo";

export const metadata = seoMetadata("/");

const FEATURED = [
  "slay-coffee-online-store",
  "art-hotel-hotel-booking-website",
  "blackberrys-online-clothing-store",
  "the-cruise-holidays-travel-portal",
  "ai-apartment-rental-marketplace",
  "nivose-france-online-store",
];

// Home page, section order modelled on multiqos.com
export default function HomePage() {
  const projects = caseStudySummaries(FEATURED)
    .slice(0, 6)
    .map((p) => ({ href: p.href, title: p.title, image: p.cover || p.screen, tags: p.categories.length ? p.categories : p.tags }));

  return (
    <>
      <HomeHero />
      <ClientLogos variant="strip" />
      <ServiceCards />
      <WhatWeOffer />

      <CaseStudies
        eyebrow="From Idea to Launch"
        heading={{ text: "Our Latest Work", highlight: "" }}
        intro={["Explore how our solutions and expertise turn ideas into tangible results — creativity and engineering in every partnership."]}
        items={projects}
        headingLevel={3}
        more={{ label: "See All Work", href: "/portfolio" }}
      />

      <Industries title="Delivering the best services to diverse industry verticals" />

      <CtaBand
        heading={{ text: "Looking to revolutionize your business with AI?", highlight: "" }}
        text={["Work with engineers who turn your idea into a market-ready product — on time and on budget."]}
        buttons={[{ label: "Book a Free Consultation", href: "/contact" }]}
        image="/images/wp/2025-03-mid-page-img.png"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Trending Technology"
            title="We excel in leading-edge technologies"
            intro="Modern stacks for AI, web, mobile, cloud and data — picked to fit your product, not the other way round."
          />
          <TechNetwork />
        </div>
      </section>

      <AboutStats />
      <ClientLogos title="Global brands that trust us for reliable solutions" />
      <Testimonials title="Words from our clients" />
      <EngagementModels />
      <JsonLd data={faqJsonLd(HOME_FAQ)} />
      <FaqBlock heading={{ text: "Frequently Asked Questions" }} items={HOME_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
      <BlogPosts />
    </>
  );
}
