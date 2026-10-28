import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/content/seo";

// .site switches on the public website theme (see globals.css)
export default function SiteLayout({ children }) {
  return (
    <div className="site">
      <JsonLd data={organizationJsonLd()} />
      <Header />
      <main>{children}</main>
      <Footer />
      <MotionProvider />
      <SmoothScroll />
    </div>
  );
}
