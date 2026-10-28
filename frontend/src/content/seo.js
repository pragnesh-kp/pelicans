// Search engine settings: page titles and descriptions built around the keyword
// research (Oct 2026), and the structured data (JSON-LD) Google reads.
// Titles stay under ~60 characters and descriptions under ~160, so Google
// shows them in full.
import { SITE, OFFICES, SOCIAL_LINKS } from "./siteContent";
import { getPage, pageMetadata, pageHeading, pageFaqs, pageSection, pageGroup } from "./pages";

// Canonical links, the sitemap and structured data always point at the live domain
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://pelicanstechnologies.com").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

// Countries we sell to: used for areaServed in structured data
const MARKETS = ["United States", "Canada", "New Zealand", "India", "United Kingdom", "Australia"];

/* ---------- Titles + descriptions ---------- */

// Hand-written for the pages that matter most for search
const PAGES = {
  "/": {
    title: "Custom Software & AI Development Company | Pelicans",
    description:
      "Custom software development company building AI agents, web and mobile apps and Shopify stores for businesses in the USA, Canada, New Zealand and India.",
  },
  "/about": {
    title: "About Pelicans Technologies | Software Company in Ahmedabad",
    description:
      "12+ years building software for clients worldwide. Meet the Ahmedabad-based team behind Pelicans Technologies, with offices in the USA, Canada and New Zealand.",
  },
  "/contact": {
    title: "Contact Us | Free Software Development Consultation",
    description:
      "Tell us about your project and get a free consultation. Contact Pelicans Technologies by form, email or phone. Offices in India, USA, Canada and New Zealand.",
  },
  "/services": {
    title: "Software Development Services | Pelicans Technologies",
    description:
      "AI/ML, custom software, web and mobile app development, e-commerce, UI/UX, data engineering, IoT, blockchain and DevOps services from one experienced team.",
  },
  "/blog": {
    title: "Blog | Software, AI & App Development Insights",
    description: "Guides and insights on AI, custom software, web and mobile app development and e-commerce from the Pelicans Technologies team.",
  },
  "/portfolio": {
    title: "Portfolio | Web, Mobile & E-Commerce Case Studies",
    description:
      "Case studies of websites, mobile apps, AI platforms and online stores we built for brands like Chumbak, Blackberrys, Neeman's and The Art Hotel.",
  },

  // Services
  "/services/ai-ml-development": {
    title: "AI Development Company | AI Agent & Generative AI Services",
    description:
      "AI development company building AI agents, generative AI apps, LLM integrations, chatbots and machine learning models tailored to your business and data.",
  },
  "/services/chatbot": {
    title: "AI Chatbot Development Company | Pelicans Technologies",
    description:
      "AI chatbot development services: custom, multilingual and voice-enabled NLP chatbots for banking, e-commerce, healthcare and more, with human handover.",
  },
  "/services/mobile-app-development": {
    title: "Mobile App Development Company | iOS, Android & Flutter",
    description:
      "Mobile app development company delivering 100+ native iOS, Android, Flutter and React Native apps for businesses and enterprises, from idea to App Store.",
  },
  "/services/web-development": {
    title: "Web Development Company | Custom Web Apps & Portals",
    description:
      "Web development company building fast, secure websites, web apps, portals and CMS sites with React, Next.js, Node.js, Python, Laravel and .NET.",
  },
  "/services/custom-software": {
    title: "Custom Software Development Services | Pelicans",
    description:
      "Custom software development services for startups and enterprises: AI-powered business software, ERP, CRM, SaaS and enterprise apps built around you.",
  },
  "/services/e-commerce": {
    title: "E-Commerce Development Company | Shopify & WooCommerce",
    description:
      "E-commerce development company building high-converting Shopify, WooCommerce and Magento stores and shopping apps for D2C brands and retailers.",
  },
  "/services/microsoft-services": {
    title: "Microsoft Development Services | .NET, Power BI & Azure",
    description:
      "Microsoft development services: .NET apps, Power BI analytics, Power Apps, Power Automate, SharePoint, Microsoft 365 and Azure cloud solutions.",
  },
  "/services/data-engineering": {
    title: "Data Engineering Services | ETL, Pipelines & Analytics",
    description:
      "Data engineering services and consulting: data ingestion, ETL pipelines, data warehousing, big data processing and real-time analytics in the cloud.",
  },
  "/services/devops": {
    title: "DevOps Services & Consulting | CI/CD & Automation",
    description:
      "DevOps services and consulting: CI/CD pipelines, infrastructure automation, containerization, DevSecOps and release management for faster, safer releases.",
  },
  "/services/iot": {
    title: "IoT Development Company | Pelicans Technologies",
    description: "IoT development company building smart home, wearable and industrial IoT solutions: IoT apps, firmware, system integration and real-time asset monitoring.",
  },
  "/services/blockchain": {
    title: "Blockchain Development Company | Pelicans Technologies",
    description: "Blockchain development company building smart contracts, dApps, DeFi platforms, and NFT marketplaces for businesses.",
  },
  "/services/ui-ux": {
    title: "UI/UX Design Agency | Web & Mobile App Design",
    description:
      "UI/UX design agency creating research-led, user-friendly designs for websites, web apps and mobile apps, from user research and wireframes to clickable prototypes.",
  },

  // Hire
  "/hire-developers": {
    title: "Hire Dedicated Developers in India | Pelicans",
    description:
      "Hire dedicated developers from India: vetted React, Node.js, Flutter, Shopify, Python and .NET engineers on full-time, part-time or hourly plans.",
  },
  "/hire-full-stack-developer": {
    title: "Hire Full Stack Developers in India | Pelicans",
    description:
      "Hire dedicated full stack developers from India skilled in React, Node.js, Next.js, Python and Laravel. Flexible full-time, part-time or hourly plans.",
  },
  "/hire-ui-ux-designer": {
    title: "Hire UI/UX Designers in India | Pelicans Technologies",
    description: "Hire dedicated UI/UX designers from India for websites, web apps and mobile apps. Flexible full-time, part-time or hourly plans.",
  },

  // Technologies with their own search demand
  "/technologies": {
    title: "Technologies We Use | Web, Mobile, AI & Cloud",
    description:
      "The technologies behind our work: React, Next.js, Node.js, Python, Flutter, Shopify, AWS, Azure and more, chosen to fit each product.",
  },
  "/shopify": {
    title: "Shopify Development Agency | Shopify Experts",
    description:
      "Shopify development agency building custom, high-converting Shopify stores, themes and apps, plus Shopify migrations, SEO, integrations and ongoing support.",
  },
  "/power-bi": {
    title: "Power BI Consulting & Development Services | Pelicans",
    description:
      "Power BI consulting and development services: interactive dashboards and reports that bring data from all your sources together for faster decisions.",
  },
  "/odoo": {
    title: "Odoo Development Company | Odoo ERP Services",
    description: "Odoo development company offering Odoo ERP implementation, customisation, module development, integration and support to streamline your business.",
  },
  "/aws": {
    title: "AWS Consulting & Development Services | Pelicans",
    description: "AWS consulting and development services: cloud architecture, migration, serverless apps, DevOps and cost optimisation on Amazon Web Services.",
  },
  "/azure": {
    title: "Azure Consulting & Development Services | Pelicans",
    description: "Microsoft Azure consulting and development services: cloud migration, app modernisation, Azure AI and DevOps for secure, scalable systems.",
  },
  "/google-cloud": {
    title: "Google Cloud Consulting & Cloud Computing Services",
    description: "Cloud consulting, migration, integration and cost-optimised management on Google Cloud, with DevOps, disaster recovery and real-time data insights.",
  },
  "/webflow": {
    title: "Webflow Development Agency | Pelicans Technologies",
    description: "Webflow development agency designing and building fast, SEO-friendly Webflow websites with custom interactions and an easy-to-edit CMS.",
  },

  // Industries
  "/industries": {
    title: "Industries We Serve | Software for Every Sector",
    description: "Custom software, AI and app development for healthcare, fintech, e-commerce, real estate, logistics, education, travel, manufacturing and more.",
  },
  "/healthcare": { title: "Healthcare Software Development Company | Pelicans" },
  "/fintech": { title: "FinTech App & Software Development Company" },
  "/e-commerce": { title: "E-Commerce Software Development Solutions | Pelicans" },
  "/real-estate": { title: "Real Estate Software Development Company | Pelicans" },
  "/logistics-distribution": {
    title: "Logistics Software Development Company | Pelicans",
    description:
      "Logistics software development: warehouse and inventory management, fleet management, route optimisation, asset tracking and supply chain systems.",
  },
  "/education-elearning": { title: "E-Learning & LMS Software Development | Pelicans" },
  "/travel-hospitality": { title: "Travel & Hotel Booking Software Development" },
  "/food-restaurant": { title: "Restaurant & Food Delivery App Development" },
  "/manufacturing": { title: "Manufacturing Software Development Company" },
  "/oil-gas": {
    title: "Oil & Gas Software Development | Pelicans",
    description:
      "Oil and gas software development: asset management, field service and data collection apps, fleet management, IoT, analytics and ERP/CRM solutions.",
  },
  "/non-profits": { title: "Software Development for Non-Profits | Pelicans" },
  "/ai-solution": { title: "AI Solutions for Business | Generative AI Apps" },

  // Company
  "/testimonials": {
    title: "Client Testimonials & Reviews | Pelicans Technologies",
    description: "What clients in France, Canada, the UK and beyond say about working with Pelicans Technologies on their software, apps and online stores.",
  },
  "/our-clients": {
    title: "Our Clients | Startups & Global Brands | Pelicans",
    description: "Startups and global brands in 20+ countries that trust Pelicans Technologies with their websites, mobile apps and online stores.",
  },
  "/engagement-model": {
    title: "Engagement Models | Fixed Price, Dedicated & Hourly",
    description: "Choose how to work with us: fixed-price projects, dedicated developers or hourly time & material, with transparent pricing for every budget.",
  },
  "/process": {
    title: "Software Development Process & Methodology | Pelicans",
    description: "How we deliver software: discovery, design, agile development, testing, launch and support, with clear communication at every stage.",
  },
};

// Clean technology names for the generated titles ("Woo Commerce" -> "WooCommerce")
const TECH_NAMES = {
  "/hire-java-developers": "Java",
  "/hire-nodejs-developers": "Node.js",
  "/hire-ruby-on-rails-developers": "Ruby on Rails",
  "/hire-net-developers": ".NET",
  "/hire-python-developers": "Python",
  "/hire-laravel-developers": "Laravel",
  "/hire-vue-js-developers": "Vue.js",
  "/hire-react-js-developers": "React JS",
  "/hire-angular-developers": "Angular",
  "/hire-flutter-developers": "Flutter",
  "/hire-android-developers": "Android",
  "/hire-ios-developers": "iOS",
  "/hire-next-js-developers": "Next.js",
  "/hire-woocommerce-developers": "WooCommerce",
  "/hire-shopify-developers": "Shopify",
  "/hire-unity3d-developers": "Unity 3D",
  "/hire-react-native-developers": "React Native",
  "/hire-odoo-developers": "Odoo",
  "/hire-wordpress-developers": "WordPress",
  "/hire-magento-developers": "Magento",
  "/node": "Node.js",
  "/python": "Python",
  "/laravel": "Laravel",
  "/angular-js": "Angular",
  "/java": "Java",
  "/ruby-on-rails": "Ruby on Rails",
  "/net": ".NET",
  "/ios-development": "iOS App",
  "/next-js": "Next.js",
  "/vue-js": "Vue.js",
  "/react-js": "React JS",
  "/unity-3d": "Unity 3D Game",
  "/android": "Android App",
  "/react-native": "React Native App",
  "/flutter": "Flutter App",
  "/wordpress": "WordPress",
  "/woocommerce": "WooCommerce",
  "/magento": "Magento",
};

// Patterns for the many hire / technology / case-study pages
function generated(path, page) {
  const tech = TECH_NAMES[path];
  if (path.startsWith("/hire-") && tech) {
    return {
      title: `Hire ${tech} Developers in India | Pelicans`,
      description: `Hire dedicated ${tech} developers from India. Vetted, experienced engineers on full-time, part-time or hourly plans, working in your time zone.`,
    };
  }
  if (tech) return { title: `${tech} Development Company | Pelicans` };
  if (path.startsWith("/portfolio/")) return { title: `${page.title} | Case Study` };
  return {};
}

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

export const clip = (text = "") => (text.length > MAX_DESCRIPTION ? text.slice(0, MAX_DESCRIPTION - 3).replace(/\s+\S*$/, "") + "…" : text);

// Adds the brand when it fits: "… | Pelicans Technologies", else "… | Pelicans", else nothing
export function brandTitle(title) {
  if (title.includes("Pelicans")) return title;
  return [`${title} | ${SITE.name}`, `${title} | ${SITE.shortName}`].find((t) => t.length <= MAX_TITLE) || title;
}

// Next.js metadata for a page: keyword title + description, canonical URL and
// social preview. `fallback` = { title, description } from the page content.
export function seoMetadata(path, fallback = {}) {
  const custom = { ...generated(path, fallback), ...PAGES[path] };
  const title = custom.title || fallback.title;
  const description = clip(custom.description || fallback.description);
  return {
    title: { absolute: brandTitle(title) },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: path,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ---------- Structured data (JSON-LD) ---------- */

const ORG_ID = `${SITE_URL}/#organization`;

// Splits "314 Turquoise 2, SP Ring Road, Ahmedabad – 380058" into schema.org parts
const ADDRESSES = {
  "India (HQ)": { streetAddress: "314 Turquoise 2, SP Ring Road", addressLocality: "Ahmedabad", addressRegion: "Gujarat", postalCode: "380058", addressCountry: "IN" },
  USA: { streetAddress: "234 N Cameron Ave", addressLocality: "Scranton", addressRegion: "PA", postalCode: "18504", addressCountry: "US" },
  "New Zealand": { streetAddress: "10A Jesmond Terrace, Mt. Albert", addressLocality: "Auckland", postalCode: "1025", addressCountry: "NZ" },
  Canada: { streetAddress: "20 Stonehill Ct, Scarborough", addressLocality: "Toronto", addressRegion: "ON", postalCode: "M1W 2Y6", addressCountry: "CA" },
};

// Who we are: shown on every page of the site
export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE_URL,
      logo: `${SITE_URL}/images/pelicans-web-logo-dark.svg`,
      image: `${SITE_URL}/images/og-image.png`,
      description: PAGES["/"].description,
      email: SITE.email,
      telephone: SITE.phone,
      address: OFFICES.map((o) => ADDRESSES[o.country]).filter(Boolean).map((a) => ({ "@type": "PostalAddress", ...a })),
      areaServed: MARKETS,
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, telephone: SITE.phone, availableLanguage: ["English"] },
      sameAs: SOCIAL_LINKS.map((s) => s.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE.name,
      url: SITE_URL,
      publisher: { "@id": ORG_ID },
    },
  ];
}

// A service we sell (service, technology and hire pages)
export function serviceJsonLd(path, name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: MARKETS.map((country) => ({ "@type": "Country", name: country })),
  };
}

// Home > Section > Page
export function breadcrumbJsonLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}

// Only real questions count: some FAQ blocks are used as feature lists
export function faqJsonLd(items = []) {
  const questions = items.filter((f) => f.q?.trim().endsWith("?") && f.a?.length);
  if (questions.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: (Array.isArray(f.a) ? f.a : [f.a]).join(" ") },
    })),
  };
}

/* ---------- Content pages (copied from WordPress) ---------- */

// Section index pages (/services, /hire-developers…) list services rather than being one
const SECTION_INDEXES = ["/services", "/hire-developers", "/technologies", "/industries", "/portfolio"];

export function contentPageMetadata(path) {
  const page = getPage(path);
  return page ? seoMetadata(path, pageMetadata(page)) : {};
}

// Breadcrumbs for every page, plus Service and FAQ data where they apply
export function contentPageJsonLd(path) {
  const page = getPage(path);
  if (!page) return [];
  const section = pageSection(path);
  const trail = [{ name: "Home", path: "/" }, ...(section ? [section] : []), { name: page.title, path }];
  const isService = ["services", "hire", "technologies", "industries"].includes(pageGroup(path)) && !SECTION_INDEXES.includes(path);
  return [
    breadcrumbJsonLd(trail),
    isService ? serviceJsonLd(path, pageHeading(page), contentPageMetadata(path).description) : null,
    faqJsonLd(pageFaqs(page)),
  ];
}
