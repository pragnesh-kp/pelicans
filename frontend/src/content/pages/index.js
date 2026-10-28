// Content pages copied from the original WordPress site (Services, Hire Talent,
// Technologies, Industries, Portfolio, Company). Each page is a list of blocks
// rendered by components/blocks/BlockRenderer. Server-side only: do not import
// this file from a "use client" component (it would ship all pages to the browser).
import services from "./services.json";
import hire from "./hire.json";
import technologies from "./technologies.json";
import industries from "./industries.json";
import portfolio from "./portfolio.json";
import company from "./company.json";

const PAGES = { ...services, ...hire, ...technologies, ...industries, ...portfolio, ...company };

// Which menu section each page belongs to (breadcrumbs in structured data)
const SECTIONS = [
  [services, { name: "Services", path: "/services" }],
  [hire, { name: "Hire Developers", path: "/hire-developers" }],
  [technologies, { name: "Technologies", path: "/technologies" }],
  [industries, { name: "Industries", path: "/industries" }],
  [portfolio, { name: "Portfolio", path: "/portfolio" }],
];

// Every content page path (sitemap)
export function allPagePaths() {
  return Object.keys(PAGES);
}

// "/hire-react-js-developers" -> { name: "Hire Developers", path: "/hire-developers" }; null for company pages
export function pageSection(path) {
  const found = SECTIONS.find(([pages]) => path in pages);
  return found && found[1].path !== path ? found[1] : null;
}

// "/hire-react-js-developers" -> "hire"
export function pageGroup(path) {
  if (path in services) return "services";
  if (path in hire) return "hire";
  if (path in technologies) return "technologies";
  if (path in industries) return "industries";
  if (path in portfolio) return "portfolio";
  return "company";
}

// "/hire-nodejs-developers" -> page, or null
export function getPage(path) {
  return PAGES[path] || null;
}

// Slugs of the pages under a prefix, e.g. pageSlugs("/services/") -> ["ai-ml-development", ...]
// With no prefix: top-level pages only (/laravel, /healthcare, ...)
export function pageSlugs(prefix = "/") {
  return Object.keys(PAGES)
    .filter((p) => p.startsWith(prefix) && !p.slice(prefix.length).includes("/") && p !== prefix.replace(/\/$/, ""))
    .map((p) => p.slice(prefix.length));
}

// Short summaries of case studies (home page showcase), in the order given
export function caseStudySummaries(slugs) {
  const cards = PAGES["/portfolio"].blocks.find((b) => b.type === "case-studies").items;
  return slugs
    .map((slug) => {
      const page = PAGES[`/portfolio/${slug}`];
      if (!page) return null;
      const block = (type) => page.blocks.find((b) => b.type === type) || {};
      const card = cards.find((c) => c.href === `/portfolio/${slug}`) || {};
      const showcase = block("cst-featured-image-video");
      return {
        href: `/portfolio/${slug}`,
        title: block("cst-hero").title || page.title,
        cover: card.image || "",
        tags: card.tags || [],
        categories: (block("cst-intro").categories || []).filter(Boolean),
        intro: block("cst-intro").text?.[0] || "",
        screen: showcase.image?.src || "",
        mobile: showcase.mobileImage?.src || "",
      };
    })
    .filter(Boolean);
}

// Title + description for <head>; falls back to the hero text
export function pageMetadata(page) {
  const hero = page.blocks.find((b) => b.type === "hero" || b.type === "cst-intro");
  const fallback = hero?.text?.[0] || "";
  const description = page.description || (fallback.length > 160 ? fallback.slice(0, 157).replace(/\s+\S*$/, "") + "…" : fallback);
  return { title: page.title, description };
}

// Heading shown in the hero ("AI/ML Development Services"), else the page title
export function pageHeading(page) {
  const hero = page.blocks.find((b) => b.type === "hero" || b.type === "cst-hero");
  return hero?.title || page.title;
}

// Questions from the page's FAQ blocks (structured data)
export function pageFaqs(page) {
  return page.blocks.filter((b) => b.type === "faq").flatMap((b) => b.items || []);
}
