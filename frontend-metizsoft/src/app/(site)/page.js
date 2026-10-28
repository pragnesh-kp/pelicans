import HomeHero from "@/components/site/HomeHero";
import ClientLogos from "@/components/site/ClientLogos";
import WhyPelicans from "@/components/home/WhyPelicans";
import ProcessCards from "@/components/home/ProcessCards";
import ServiceCards from "@/components/home/ServiceCards";
import TechTabs from "@/components/home/TechTabs";
import StatsBand from "@/components/home/StatsBand";
import Industries from "@/components/site/Industries";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import Testimonials from "@/components/site/Testimonials";
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

// Home page — section order follows metizsoft.com:
// hero + bento → logos → why us → process → services → tech stack →
// numbers band → industries → projects → testimonials → CTA → FAQ → blog
// (the contact section and footer come from the layout)
export default function HomePage() {
  const projects = caseStudySummaries(FEATURED).map((p) => ({
    href: p.href,
    title: p.title,
    intro: p.intro,
    image: p.cover || p.screen,
    tags: p.tags,
    categories: p.categories,
  }));

  return (
    <>
      <HomeHero />
      <ClientLogos variant="strip" />
      <WhyPelicans />
      <ProcessCards />
      <ServiceCards />
      <TechTabs />
      <StatsBand />
      <Industries />
      <ProjectShowcase projects={projects} />
      <Testimonials />
      <CtaBand
        heading={{ text: "Have an idea? Let’s turn it into a working product." }}
        buttons={[{ label: "Speak to Our Experts", href: "/contact" }]}
      />
      <JsonLd data={faqJsonLd(HOME_FAQ)} />
      <FaqBlock heading={{ text: "Frequently Asked Questions" }} items={HOME_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
      <BlogPosts heading={{ text: "Insights From Our Engineers", highlight: "Our Engineers" }} />
    </>
  );
}
