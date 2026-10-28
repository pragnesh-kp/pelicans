import SectionHeading from "@/components/site/SectionHeading";
import OfferTabs from "./OfferTabs";
import { MAIN_MENU } from "@/content/menu";
import { SERVICES } from "@/content/siteContent";
import { getPage } from "@/content/pages";

// Every service with its summary and the sub-services listed on its own page
// (first card grid there), handed to the tabs as plain data
function serviceTabs() {
  const links = MAIN_MENU.find((m) => m.label === "Services").groups[0].links;
  return links.map((l) => {
    const page = getPage(l.href);
    const grid = page?.blocks.find((b) => b.type === "box-grid" && b.items?.length >= 6) || page?.blocks.find((b) => b.type === "box-grid");
    const service = SERVICES.find((s) => l.href.endsWith(`/${s.id}`));
    return {
      label: l.label,
      href: l.href,
      text: service?.description || l.text,
      points: (grid?.items || []).map((i) => i.title).filter(Boolean).slice(0, 10),
    };
  });
}

export default function WhatWeOffer() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="What We Offer"
          title="Delivering cutting-edge IT services for modern enterprises"
          intro="When your next move depends on getting the technology right, you need more than a vendor. You need a partner who thinks like a business leader."
        />
        <OfferTabs tabs={serviceTabs()} />
      </div>
    </section>
  );
}
