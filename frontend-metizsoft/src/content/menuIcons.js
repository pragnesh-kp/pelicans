// Small icon next to each mega-menu link.
// Technology / hire links show the technology's own logo; everything else a line icon.
import {
  BrainCircuit, CodeXml, ShoppingCart, Globe, Smartphone, Blocks, LayoutGrid, Database, Cpu, Bot,
  Infinity as InfinityIcon, PenTool, HeartPulse, ShoppingBag, Fuel, UtensilsCrossed, Plane, Landmark,
  Sparkles, Factory, Building2, Truck, GraduationCap, HandHeart, Info, Handshake, Users, MessageSquareQuote,
  Workflow, Newspaper, BarChart3, Layers, Circle,
} from "lucide-react";

const LUCIDE = {
  "/services/ai-ml-development": BrainCircuit,
  "/services/custom-software": CodeXml,
  "/services/e-commerce": ShoppingCart,
  "/services/web-development": Globe,
  "/services/mobile-app-development": Smartphone,
  "/services/blockchain": Blocks,
  "/services/microsoft-services": LayoutGrid,
  "/services/data-engineering": Database,
  "/services/iot": Cpu,
  "/services/chatbot": Bot,
  "/services/devops": InfinityIcon,
  "/services/ui-ux": PenTool,
  "/healthcare": HeartPulse,
  "/e-commerce": ShoppingBag,
  "/oil-gas": Fuel,
  "/food-restaurant": UtensilsCrossed,
  "/travel-hospitality": Plane,
  "/fintech": Landmark,
  "/ai-solution": Sparkles,
  "/manufacturing": Factory,
  "/real-estate": Building2,
  "/logistics-distribution": Truck,
  "/education-elearning": GraduationCap,
  "/non-profits": HandHeart,
  "/about": Info,
  "/engagement-model": Handshake,
  "/our-clients": Users,
  "/testimonials": MessageSquareQuote,
  "/process": Workflow,
  "/blog": Newspaper,
  "/power-bi": BarChart3,
  "/odoo": Layers,
};

// Words in a link label -> logo file in /public/images/technologies
const LOGOS = [
  [/node/i, "nodejs"], [/java(?!script)/i, "java"], [/laravel/i, "laravel"], [/python/i, "python"],
  [/\.net/i, "dotnet"], [/ruby/i, "ruby-on-rails"], [/angular/i, "angular"], [/react native/i, "react-native"],
  [/react/i, "react"], [/vue/i, "vuejs"], [/next/i, "nextjs"], [/ios/i, "ios"], [/android/i, "android"],
  [/flutter/i, "flutter"], [/unity/i, "unity"], [/shopify/i, "shopify"], [/woo/i, "woocommerce"],
  [/magento/i, "magento"], [/wordpress/i, "wordpress"], [/webflow/i, "webflow"], [/google cloud/i, "google-cloud"],
  [/azure/i, "azure"], [/aws/i, "aws"],
];

// -> { logo: "/images/technologies/x.svg" } or { Icon: LucideComponent }
export function menuIcon(link) {
  if (LUCIDE[link.href]) return { Icon: LUCIDE[link.href] };
  const hit = LOGOS.find(([re]) => re.test(link.label));
  if (hit) return { logo: `/images/technologies/${hit[1]}.svg` };
  return { Icon: Circle };
}
