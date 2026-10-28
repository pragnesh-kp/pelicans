import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import StatsGrid from "@/components/site/StatsGrid";
import { STATS } from "@/content/siteContent";

const STAT_TEXT = [
  "Over a decade of building custom software for clients worldwide.",
  "Websites, apps and platforms launched across 10+ industries.",
  "Startups and global brands in more than 20 countries.",
  "Designers, engineers and QA specialists working as one team.",
];

// "Our side of the story": heading + intro, then the tinted number cards
export default function AboutStats() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Our Side of the Story"
          title="About Pelicans Technologies"
          highlight="Pelicans Technologies"
          intro="We deliver next-generation software powered by AI — helping businesses solve real challenges, stay ahead of the curve and achieve sustainable growth."
        />
        <StatsGrid items={STATS} texts={STAT_TEXT} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <Link href="/about" className="btn">
            More About Us <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
