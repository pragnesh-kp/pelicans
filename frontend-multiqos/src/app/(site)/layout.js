import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactBand from "@/components/site/ContactBand";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/content/seo";

export default function SiteLayout({ children }) {
  return (
    <div className="site">
      <JsonLd data={organizationJsonLd()} />
      <Header />
      <main>
        {children}
        <ContactBand />
      </main>
      <Footer />
      <MotionProvider />
      <SmoothScroll />
    </div>
  );
}
