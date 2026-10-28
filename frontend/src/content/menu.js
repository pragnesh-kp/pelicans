// Main menu (same structure and URLs as the original WordPress site).
// A menu item has either `href` (plain link) or `groups` (mega menu with columns).
// `columns` sets how many columns the dropdown uses on desktop.

const hire = (label, slug) => ({ label, href: `/hire-${slug}` });

export const MAIN_MENU = [
  {
    label: "Services",
    href: "/services",
    columns: 3,
    groups: [
      {
        links: [
          { label: "AI/ML Development", href: "/services/ai-ml-development", text: "Build AI/ML models to enhance decision-making and optimize business processes." },
          { label: "Custom Software Development", href: "/services/custom-software", text: "Custom software solutions that address specific business needs and goals." },
          { label: "E-Commerce Development", href: "/services/e-commerce", text: "Online e-commerce platforms to maximize online sales and growth." },
          { label: "Web Development", href: "/services/web-development", text: "Responsive, scalable websites for a powerful online presence." },
          { label: "Mobile App Development", href: "/services/mobile-app-development", text: "Mobile apps that provide exceptional user experiences and engagement." },
          { label: "Blockchain", href: "/services/blockchain", text: "Secure blockchain solutions to increase transparency and trust." },
          { label: "Microsoft Services", href: "/services/microsoft-services", text: "Tailored Microsoft solutions for improved productivity." },
          { label: "Data Engineering", href: "/services/data-engineering", text: "Turn raw data into actionable insights through efficient processing." },
          { label: "IoT", href: "/services/iot", text: "IoT solutions that drive innovation and optimize operations." },
          { label: "Chat BOT", href: "/services/chatbot", text: "Intelligent chatbots that automate customer engagement." },
          { label: "DevOps", href: "/services/devops", text: "Automate workflows to accelerate development and delivery." },
          { label: "UI/UX Design", href: "/services/ui-ux", text: "Intuitive, user-centric designs that enhance usability and appeal." },
        ],
      },
    ],
  },
  {
    label: "Hire Talent",
    href: "/hire-developers",
    columns: 4,
    groups: [
      {
        title: "Backend",
        links: [
          hire("Node.js Developer", "nodejs-developers"),
          hire("Java Developers", "java-developers"),
          hire("Laravel Developer", "laravel-developers"),
          hire("Python Developer", "python-developers"),
          hire(".Net Developers", "net-developers"),
          hire("Ruby on Rails Developer", "ruby-on-rails-developers"),
        ],
      },
      {
        title: "Frontend",
        links: [
          hire("Full Stack Developer", "full-stack-developer"),
          hire("Angular JS Developers", "angular-developers"),
          hire("React JS Developer", "react-js-developers"),
          hire("Vue.JS Developers", "vue-js-developers"),
          hire("Next.js Developers", "next-js-developers"),
        ],
      },
      {
        title: "Mobile",
        links: [
          hire("iOS Developers", "ios-developers"),
          hire("Android Developers", "android-developers"),
          hire("Flutter Developers", "flutter-developers"),
          hire("React Native Developers", "react-native-developers"),
          hire("Unity3D Developers", "unity3d-developers"),
        ],
      },
      {
        title: "E-commerce",
        links: [
          hire("Shopify Developers", "shopify-developers"),
          hire("Woo Commerce Developers", "woocommerce-developers"),
          hire("Magento Developers", "magento-developers"),
          hire("WordPress Developers", "wordpress-developers"),
          hire("UI/UX Designer", "ui-ux-designer"),
          hire("Odoo Developers", "odoo-developers"),
        ],
      },
    ],
  },
  {
    label: "Technologies",
    href: "/technologies",
    columns: 4,
    groups: [
      {
        title: "Backend",
        links: [
          { label: "Laravel", href: "/laravel" },
          { label: "Python", href: "/python" },
          { label: "Node JS", href: "/node" },
          { label: ".Net", href: "/net" },
          { label: "Java", href: "/java" },
          { label: "Ruby on Rails", href: "/ruby-on-rails" },
        ],
      },
      {
        title: "Frontend",
        links: [
          { label: "Angular JS", href: "/angular-js" },
          { label: "React JS", href: "/react-js" },
          { label: "Next JS", href: "/next-js" },
          { label: "Vue JS", href: "/vue-js" },
        ],
      },
      {
        title: "Mobile",
        links: [
          { label: "iOS", href: "/ios-development" },
          { label: "Android", href: "/android" },
          { label: "Flutter", href: "/flutter" },
          { label: "React Native", href: "/react-native" },
          { label: "Unity 3D", href: "/unity-3d" },
        ],
      },
      {
        title: "E-commerce & CMS",
        links: [
          { label: "Shopify", href: "/shopify" },
          { label: "Woo Commerce", href: "/woocommerce" },
          { label: "Magento", href: "/magento" },
          { label: "WordPress", href: "/wordpress" },
          { label: "Webflow", href: "/webflow" },
        ],
      },
      {
        title: "Cloud & DevOps",
        links: [
          { label: "Google Cloud", href: "/google-cloud" },
          { label: "Azure", href: "/azure" },
          { label: "AWS", href: "/aws" },
        ],
      },
      {
        title: "Platforms",
        links: [
          { label: "Odoo", href: "/odoo" },
          { label: "Power BI", href: "/power-bi" },
        ],
      },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Industries",
    href: "/industries",
    columns: 3,
    groups: [
      {
        links: [
          { label: "Non-Profits", href: "/non-profits", text: "Scalable, impact-driven digital solutions for non-profits." },
          { label: "Education", href: "/education-elearning", text: "Custom solutions for students and educators." },
          { label: "E-commerce", href: "/e-commerce", text: "Solutions for the evolving needs of retail and eCommerce." },
          { label: "FinTech", href: "/fintech", text: "Secure, scalable and innovative FinTech solutions." },
          { label: "Healthcare", href: "/healthcare", text: "AI-powered solutions for the health and fitness industries." },
          { label: "AI Solutions", href: "/ai-solution", text: "Applications powered by generative AI for diverse industries." },
          { label: "Logistics", href: "/logistics-distribution", text: "Efficient solutions for logistics and distribution needs." },
          { label: "Manufacturing", href: "/manufacturing", text: "Automate manufacturing operations to boost efficiency." },
          { label: "Food & Restaurant", href: "/food-restaurant", text: "Help food and restaurant businesses grow and thrive." },
          { label: "Real Estate", href: "/real-estate", text: "CMS, ERP and CRM solutions for real estate." },
          { label: "Oil & Gas", href: "/oil-gas", text: "Custom on-demand applications for seamless operations." },
          { label: "Travel & Hospitality", href: "/travel-hospitality", text: "Seamless travel experiences with user-friendly solutions." },
        ],
      },
    ],
  },
  {
    label: "Company",
    columns: 2,
    groups: [
      {
        links: [
          { label: "About", href: "/about", text: "How Pelicans is shaping the future with innovation and expertise." },
          { label: "Engagement Model", href: "/engagement-model", text: "Flexible collaboration models that fit your business needs." },
          { label: "Our Clients", href: "/our-clients", text: "Businesses across industries we have empowered." },
          { label: "Testimonials", href: "/testimonials", text: "How Pelicans transformed our clients' digital journey." },
          { label: "Process", href: "/process", text: "A strategic, agile and result-driven delivery approach." },
          { label: "Our Blog", href: "/blog", text: "Insights, trends and expert perspectives on technology." },
        ],
      },
    ],
  },
];
