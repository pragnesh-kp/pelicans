// All text for the public website lives here, so it is easy to edit in one place.
// Later this can be loaded from the backend/admin panel instead.

export const SITE = {
  name: "Pelicans Technologies",
  shortName: "Pelicans",
  tagline: "Custom Software Development Company",
  email: "info@pelicanstechnologies.com",
  phone: "+91 98246 69292",
  phoneHref: "tel:+919824669292",
};

// Footer "Company" links (the header menu lives in content/menu.js)
export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Hire Developers", href: "/hire-developers" },
  { label: "Technologies", href: "/technologies" },
  { label: "Industries", href: "/industries" },
  { label: "Engagement Model", href: "/engagement-model" },
  { label: "Our Clients", href: "/our-clients" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://in.linkedin.com/company/pelicanstechnologies" },
  { label: "Facebook", href: "https://www.facebook.com/PelicansTechnologies/" },
  { label: "Instagram", href: "https://www.instagram.com/pelicanstechnologies/" },
  { label: "X", href: "https://x.com/pelicanstechno" },
];

export const STATS = [
  { value: "12+", label: "Years of experience" },
  { value: "500+", label: "Projects delivered" },
  { value: "200+", label: "Clients across the globe" },
  { value: "30+", label: "Skilled developers" },
];

// `featured: true` services are shown on the home page
export const SERVICES = [
  {
    id: "mobile-app-development",
    image: "/images/services/mobile-app-development.jpg",
    icon: "Smartphone",
    title: "Mobile App Development",
    short: "Standout apps for Android, iOS and cross-platform, covering all your mobile needs.",
    description:
      "Build mobile apps that provide exceptional user experiences and engagement — native Android and iOS, or cross-platform with Flutter and React Native.",
    featured: true,
  },
  {
    id: "web-development",
    image: "/images/services/web-development.jpg",
    icon: "Globe",
    title: "Web Development",
    short: "Responsive custom websites, web portals and progressive web apps.",
    description:
      "Design and develop responsive, scalable websites, portals and progressive web apps for a powerful online presence.",
    featured: true,
  },
  {
    id: "ai-ml-development",
    image: "/images/services/ai-ml-development.jpg",
    icon: "BrainCircuit",
    title: "AI/ML Development",
    short: "Intelligent, data-driven solutions powered by AI and machine learning.",
    description:
      "Build AI/ML models that enhance decision-making and optimize business processes, from predictive analytics to generative AI.",
    featured: true,
  },
  {
    id: "data-engineering",
    image: "/images/services/data-engineering.jpg",
    icon: "Database",
    title: "Data Engineering",
    short: "Turning raw data into meaningful insights and strategy.",
    description:
      "Transform raw data into actionable insights through efficient pipelines, warehousing and data processing.",
    featured: true,
  },
  {
    id: "e-commerce",
    image: "/images/services/e-commerce.jpg",
    icon: "ShoppingCart",
    title: "E-Commerce Development",
    short: "Custom online stores built to grow sales in a competitive market.",
    description:
      "Develop e-commerce platforms on Shopify, WooCommerce, Magento or fully custom stacks to maximize online sales and growth.",
    featured: true,
  },
  {
    id: "custom-software",
    image: "/images/services/custom-software.jpg",
    icon: "CodeXml",
    title: "Custom Software",
    short: "Bespoke applications designed around your unique business challenges.",
    description:
      "Develop custom software solutions that address your specific business needs, workflows and goals.",
    featured: true,
  },
  {
    id: "iot",
    image: "/images/services/iot.jpg",
    icon: "Cpu",
    title: "IoT Solutions",
    short: "Connected experiences and smarter systems with the Internet of Things.",
    description:
      "Integrate IoT solutions that drive innovation, connect devices and optimize business operations.",
    featured: true,
  },
  {
    id: "ui-ux",
    image: "/images/services/ui-ux.jpg",
    icon: "PenTool",
    title: "UI/UX Design",
    short: "Intuitive web and mobile interfaces that boost engagement.",
    description:
      "Create intuitive, user-centric designs that improve usability and make your product a pleasure to use.",
    featured: true,
  },
  {
    id: "blockchain",
    image: "/images/services/blockchain.jpg",
    icon: "Blocks",
    title: "Blockchain",
    short: "Secure blockchain solutions for transparency and trust.",
    description: "Create secure blockchain solutions that increase transparency and trust in your systems.",
  },
  {
    id: "microsoft-services",
    image: "/images/services/microsoft-services.jpg",
    icon: "LayoutGrid",
    title: "Microsoft Services",
    short: "Power Apps, Power Automate and Dynamics 365 tailored to you.",
    description:
      "Optimize operations with tailored Microsoft solutions — Power Apps, Power Automate, Power BI and Dynamics 365.",
  },
  {
    id: "chatbot",
    image: "/images/services/chatbot.jpg",
    icon: "Bot",
    title: "Chatbot Development",
    short: "Intelligent chatbots that automate customer engagement.",
    description: "Develop intelligent chatbots that automate customer engagement and boost efficiency.",
  },
  {
    id: "devops",
    image: "/images/services/devops.jpg",
    icon: "Infinity",
    title: "DevOps",
    short: "Automated workflows for faster development and delivery.",
    description: "Automate and streamline workflows with CI/CD, containers and cloud to accelerate delivery cycles.",
  },
];

export const ENGAGEMENT_MODELS = [
  {
    title: "Fixed Price",
    description:
      "Perfect for projects with a defined scope, budget and timeline. Clear milestones and a dedicated team for faster time-to-market.",
    points: ["Defined scope & budget", "Milestone-based delivery", "No surprise costs"],
  },
  {
    title: "Time & Material",
    description:
      "Unsure about the scope or timeline? Pay as you go, stay flexible and keep full control over pricing as the project evolves.",
    points: ["Flexible scope", "Pay for actual effort", "Change direction anytime"],
  },
  {
    title: "Staff Augmentation",
    description:
      "Extend your team with our skilled developers. Fill skill gaps, scale effortlessly and boost productivity.",
    points: ["Hand-picked developers", "Scale up or down", "Works in your process"],
  },
];

export const INDUSTRIES = [
  { icon: "HeartPulse", name: "Healthcare", href: "/healthcare", description: "AI-powered solutions for health and fitness.", image: "/images/industries/healthcare.jpg" },
  { icon: "ShoppingBag", name: "E-commerce", href: "/e-commerce", description: "Solutions for modern retail and online shoppers.", image: "/images/industries/e-commerce.jpg" },
  { icon: "Fuel", name: "Oil & Gas", href: "/oil-gas", description: "Custom on-demand apps for seamless operations.", image: "/images/industries/oil-gas.jpg" },
  { icon: "UtensilsCrossed", name: "Food & Restaurant", href: "/food-restaurant", description: "Tools that help food businesses grow.", image: "/images/industries/food-restaurant.jpg" },
  { icon: "Plane", name: "Travel & Hospitality", href: "/travel-hospitality", description: "Seamless booking and travel experiences.", image: "/images/industries/travel-hospitality.jpg" },
  { icon: "Landmark", name: "FinTech", href: "/fintech", description: "Secure, scalable financial services.", image: "/images/industries/fintech.jpg" },
  { icon: "Sparkles", name: "AI Solutions", href: "/ai-solution", description: "Generative AI applications for every industry.", image: "/images/industries/ai-solutions.webp" },
  { icon: "Factory", name: "Manufacturing", href: "/manufacturing", description: "Automation that boosts efficiency.", image: "/images/industries/manufacturing.jpg" },
  { icon: "Building2", name: "Real Estate", href: "/real-estate", description: "CMS, ERP and CRM for property businesses.", image: "/images/industries/real-estate.jpg" },
  { icon: "Truck", name: "Logistics", href: "/logistics-distribution", description: "Optimized logistics and distribution.", image: "/images/industries/logistics.jpg" },
  { icon: "Sparkles", name: "Education", href: "/education-elearning", description: "Custom learning platforms for students and educators.", image: "/images/wp/2024-12-education-1.jpg" },
  { icon: "Sparkles", name: "Non-Profits", href: "/non-profits", description: "Scalable, impact-driven digital solutions.", image: "/images/wp/2026-04-non-profits-org.jpg" },
];

// Logos live in /public/images/technologies
const tech = (name, file) => ({ name, logo: `/images/technologies/${file}.svg` });

export const TECH_STACK = {
  "AI/ML": [
    tech("OpenAI", "openai"), tech("Anthropic", "anthropic"), tech("Gemini", "gemini"), tech("Llama", "llama"),
    tech("Mistral", "mistral"), tech("TensorFlow", "tensorflow"), tech("PyTorch", "pytorch"), tech("LangChain", "langchain"),
    // Codex is an OpenAI product; Vertex AI and Cloud Vision are Google Cloud products (parent brand logos)
    tech("Codex", "openai"), tech("Vertex AI", "google-cloud"), tech("Cloud Vision", "google-cloud"),
    tech("OpenCV", "opencv"), tech("Watson", "watson"), tech("n8n", "n8n"), tech("Keras", "keras"),
  ],
  Frontend: [tech("React", "react"), tech("Next.js", "nextjs"), tech("Angular", "angular"), tech("Vue.js", "vuejs")],
  Backend: [tech("Node.js", "nodejs"), tech("Python", "python"), tech(".NET", "dotnet"), tech("Java", "java"), tech("Laravel", "laravel"), tech("Ruby on Rails", "ruby-on-rails")],
  Mobile: [tech("Android", "android"), tech("iOS", "ios"), tech("Flutter", "flutter"), tech("React Native", "react-native"), tech("Unity 3D", "unity")],
  "E-Commerce & CMS": [tech("Shopify", "shopify"), tech("WooCommerce", "woocommerce"), tech("Magento", "magento"), tech("WordPress", "wordpress"), tech("Webflow", "webflow"), tech("Drupal", "drupal")],
  Cloud: [tech("AWS", "aws"), tech("Azure", "azure"), tech("Google Cloud", "google-cloud")],
  DevOps: [tech("Docker", "docker"), tech("Kubernetes", "kubernetes"), tech("OpenShift", "openshift"), tech("Terraform", "terraform")],
  Database: [tech("MySQL", "mysql"), tech("PostgreSQL", "postgresql"), tech("MS SQL", "mssql"), tech("MongoDB", "mongodb"), tech("Firebase", "firebase")],
};

// Home page "Technologies & platforms we use" hub: 4 groups, each with
// what we build (left accordion) and 7 logos for its honeycomb (right diagram).
const techLogo = (name) => Object.values(TECH_STACK).flat().find((t) => t.name === name);
export const TECH_HUB = [
  {
    name: "AI & Machine Learning",
    label: "AI & ML",
    href: "/services/ai-ml-development",
    capabilities: ["Generative AI & LLMs", "AI Agents", "Machine Learning Models", "Computer Vision", "NLP & Chatbots", "Predictive Analytics"],
    logos: ["OpenAI", "Anthropic", "Gemini", "Llama", "TensorFlow", "PyTorch", "LangChain"].map(techLogo),
  },
  {
    name: "Web Development",
    label: "Web",
    href: "/services/web-development",
    capabilities: ["Custom Web Apps", "SaaS Platforms", "Progressive Web Apps", "REST & GraphQL APIs", "Microservices", "Enterprise Portals"],
    logos: ["React", "Next.js", "Angular", "Vue.js", "Node.js", "Python", "Laravel"].map(techLogo),
  },
  {
    name: "Mobile & E-Commerce",
    label: "Mobile & E-Commerce",
    href: "/services/mobile-app-development",
    capabilities: ["iOS & Android Apps", "Cross-Platform Apps", "Online Stores", "Headless Commerce", "CMS Websites", "Games & AR"],
    logos: ["Android", "iOS", "Flutter", "React Native", "Shopify", "WooCommerce", "WordPress"].map(techLogo),
  },
  {
    name: "Cloud, DevOps & Data",
    label: "Cloud & DevOps",
    href: "/services/devops",
    capabilities: ["Cloud Migration", "CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code", "Database Design", "Monitoring & Scaling"],
    logos: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "MySQL", "MongoDB"].map(techLogo),
  },
];

export const PROJECTS = [
  {
    title: "Art Hotel",
    type: "Hotel booking website",
    tags: ["WordPress", "PHP", "JavaScript"],
    hue: 215,
    image: "/images/projects/art-hotel.jpg",
  },
  {
    title: "Nivose France",
    type: "Online store",
    tags: ["Shopify", "E-commerce"],
    hue: 235,
    image: "/images/projects/nivose-france.jpg",
  },
  {
    title: "Slay Coffee",
    type: "Online store",
    tags: ["React", "Next.js", "E-commerce"],
    hue: 32,
    image: "/images/projects/slay-coffee.jpg",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "We needed an AI-driven recommendation chatbot for our healthcare business. Pelicans delivered a robust, scalable solution that increased our conversion rates by 35%.",
    name: "Sophia R.",
    company: "CEO, HealthCare",
    country: "France",
    photo: "/images/testimonials/sophia-r.jpg",
    flag: "/images/flags/france.png",
  },
  {
    quote:
      "Pelicans Technologies transformed our business with a custom software solution, exceeding expectations. Their clear communication and expertise boosted our productivity.",
    name: "Michael D.",
    company: "Product Manager, Retail",
    country: "Canada",
    photo: "/images/testimonials/michael-d.jpg",
    flag: "/images/flags/canada.svg",
  },
  {
    quote:
      "Working with Pelicans on our cruise travel portal has been a game-changer. Great frontend, backend and API integrations — and the team was always available for support.",
    name: "Priyal Shah",
    company: "Cruise Holidays",
    country: "UK",
    photo: "/images/testimonials/priyal-shah.jpg",
    flag: "/images/flags/uk.svg",
  },
   {
    quote:
      "Pelicans has been our trusted tech partner for years. From e-commerce solutions to mobile apps to ongoing maintenance, their team consistently delivers high-quality solutions.",
    name: "Kolade Ojebiyi",
    company: "Dreamspaces Group",
    country: "Nigeria",
    photo: "/images/testimonials/kolade-ojebiyi.jpg",
    flag: "/images/flags/nigeria.svg",
  },
];

export const TEAM = [
  { name: "Nilay Shah", role: "Founder", photo: "/images/team/nilay-shah.jpg" },
  { name: "Yatin Kashyap", role: "Vice President", photo: "/images/team/yatin-kashyap.png" },
  { name: "Pragnesh Kalotara", role: "Full Stack Developer & Team Lead", photo: "/images/team/pragnesh-kalotara.jpg" },
  { name: "Hiren Ramoliya", role: "Software Development – Team Lead", photo: "/images/team/hiren-ramoliya.jpg" },
];

export const VALUES = [
  {
    icon: "Eye",
    title: "Our Vision",
    text: "A dynamic world where businesses succeed and individuals fulfil their aspirations, supported by our innovative digital solutions.",
  },
  {
    icon: "Target",
    title: "Our Mission",
    text: "To enable businesses of all sizes with top-notch digital products that drive growth, streamline operations and enhance customer interactions.",
  },
  {
    icon: "Gem",
    title: "Our Values",
    text: "Commitment to quality is our promise. Best practices, advanced tools and deep expertise turn your product into a flawless experience.",
  },
];

export const OFFICES = [
  { country: "India (HQ)", address: "314 Turquoise 2, SP Ring Road, Ahmedabad – 380058", flag: "/images/flags/india.svg" },
  { country: "USA", address: "234 N Cameron Ave, Scranton, PA 18504", flag: "/images/flags/usa.svg" },
  { country: "New Zealand", address: "10A Jesmond Terrace, Mt. Albert, Auckland – 1025", flag: "/images/flags/new-zealand.svg" },
  { country: "Canada", address: "20 Stonehill Ct, Scarborough, ON M1W 2Y6", flag: "/images/flags/canada.svg" },
];

// Client logos (/public/images/clients) for the "Trusted by" strip
export const CLIENTS = [
  { name: "The Art Hotel", logo: "/images/clients/the-art-hotel.png" },
  { name: "Chumbak", logo: "/images/clients/chumbak.png" },
  { name: "Neeman's", logo: "/images/clients/neemans.png" },
  { name: "Blackberrys", logo: "/images/clients/blackberrys.png" },
  { name: "Nivose", logo: "/images/clients/nivose.png" },
  { name: "Slay Coffee", logo: "/images/clients/slay-coffee.png" },
  { name: "GLEN", logo: "/images/clients/glen.png" },
  { name: "Cruise Holidays", logo: "/images/clients/cruise-holidays.png" },
  { name: "Exotic Flora", logo: "/images/clients/exotic-flora.png" },
  { name: "WaterBox", logo: "/images/clients/waterbox.png" },
  { name: "A Toddler Thing", logo: "/images/clients/a-toddler-thing.png" },
  { name: "House of Jewels", logo: "/images/clients/house-of-jewels.png" },
  { name: "Crozzo", logo: "/images/clients/crozzo.png" },
  { name: "Motomoney", logo: "/images/clients/motomoney.png" },
  { name: "QUIKe", logo: "/images/clients/quike.png" },
  { name: "SPC", logo: "/images/clients/spc.png" },
];

// Options for the contact form "service" dropdown
export const CONTACT_SERVICES = [
  "Artificial Intelligence",
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "Hire Dedicated Developer",
  "Design and Brand Identity",
  "Cloud and DevOps",
  "Other",
];

// Home page "Frequently Asked Questions" (facts from the service, hiring and company pages)
export const HOME_FAQ = [
  {
    q: "What services does Pelicans Technologies offer?",
    a: [
      "AI/ML development, custom software, web and mobile app development, e-commerce, UI/UX design, data engineering, chatbots, IoT, blockchain, Microsoft services and DevOps — from strategy and design to launch and ongoing support.",
    ],
  },
  {
    q: "Which industries do you work with?",
    a: [
      "Healthcare, e-commerce and retail, FinTech, education, travel and hospitality, food and restaurants, real estate, logistics, manufacturing, oil and gas, non-profits and AI-driven businesses.",
    ],
  },
  {
    q: "Can I hire dedicated developers?",
    a: [
      "Yes. You can hire full-time (8 hours a day, 5 days a week), part-time (4 hours a day) or on an hourly basis. Every model uses Agile/Scrum, direct communication and monthly billing, with no project manager fees.",
    ],
  },
  {
    q: "Which engagement models can I choose from?",
    a: [
      "Fixed Cost for projects with clear, predefined requirements; Time and Material when the scope is still evolving; and the Dedicated Hiring Model for long-term work or fast scaling.",
    ],
  },
  {
    q: "How do you keep my idea and code safe?",
    a: ["We sign an NDA before we start, and your code and data stay protected throughout the project."],
  },
  {
    q: "Where are your offices?",
    a: ["Our headquarters is in Ahmedabad, India, with offices in the USA, New Zealand and Canada."],
  },
  {
    q: "How experienced is your team?",
    a: ["We have over 12 years of experience, 30+ skilled developers, and more than 500 projects delivered for 200+ clients worldwide."],
  },
];
