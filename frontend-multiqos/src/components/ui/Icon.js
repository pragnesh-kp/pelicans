// Maps icon names used in siteContent.js to lucide-react icons.
// Only the icons listed here end up in the website bundle.
import {
  Smartphone, Globe, BrainCircuit, Database, ShoppingCart, CodeXml, Cpu, PenTool,
  Blocks, LayoutGrid, Bot, Infinity as InfinityIcon, HeartPulse, ShoppingBag, Fuel,
  UtensilsCrossed, Plane, Landmark, Sparkles, Factory, Building2, Truck, Eye, Target, Gem,
} from "lucide-react";

const ICONS = {
  Smartphone, Globe, BrainCircuit, Database, ShoppingCart, CodeXml, Cpu, PenTool,
  Blocks, LayoutGrid, Bot, Infinity: InfinityIcon, HeartPulse, ShoppingBag, Fuel,
  UtensilsCrossed, Plane, Landmark, Sparkles, Factory, Building2, Truck, Eye, Target, Gem,
};

export default function Icon({ name, size = 24, ...props }) {
  const Component = ICONS[name];
  return Component ? <Component size={size} aria-hidden="true" {...props} /> : null;
}
