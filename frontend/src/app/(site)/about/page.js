import Image from "next/image";
import PageHero from "@/components/site/PageHero";
import ClientLogos from "@/components/site/ClientLogos";
import BigTextBand from "@/components/motion/BigTextBand";
import SectionHeading from "@/components/site/SectionHeading";
import StatsGrid from "@/components/site/StatsGrid";
import Testimonials from "@/components/site/Testimonials";
import Industries from "@/components/site/Industries";
import CtaBanner from "@/components/site/CtaBanner";
import Icon from "@/components/ui/Icon";
import { TEAM, VALUES } from "@/content/siteContent";
import styles from "./about.module.css";
import { seoMetadata } from "@/content/seo";

export const metadata = seoMetadata("/about");

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Pelicans"
        title="Building exceptional digital solutions is more than a job — it's our passion."
        intro="A hand-picked team of experienced developers and designers who deliver your project on time, every time."
      />

      {/* Story */}
      <section className="section">
        <div className={`container ${styles.story}`}>
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className={styles.storyTitle}>Twelve years of trust and excellence</h2>
            <Image src="/images/about/12-years.png" alt="12 years of excellence" width={220} height={200} className={styles.badge} />
          </div>
          <div className={styles.storyText}>
            <p>
              From the start, we have believed in your success, trusted in our skills, and upheld a promise to deliver
              excellence through every line of code. For us, it&apos;s not just a job — it&apos;s our duty.
            </p>
            <p>
              Our focus on your satisfaction drives everything we do. With a curious mindset and an innovative
              approach, we embrace every challenge — combining creativity and expertise to build digital products that
              give you peace of mind.
            </p>
          </div>
        </div>
        <div className={`container ${styles.stats}`}>
          <StatsGrid pastel />
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Our identity"
            title="What defines Pelicans"
            intro="Quality is our promise. Industry best practices, advanced tools and real expertise — in every project."
          />
          <ul className={styles.values} data-stagger>
            {VALUES.map((v) => (
              <li key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon name={v.icon} size={26} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title="The people behind Pelicans"
            intro="Designers, engineers, creatives and developers — a diverse team united in purpose and expertise."
          />
          <ul className={styles.team} data-stagger>
            {TEAM.map((m) => (
              <li key={m.name} className={styles.member}>
                {m.photo ? (
                  <span className={styles.photo}>
                    <Image src={m.photo} alt={`Photo of ${m.name}`} fill sizes="(max-width: 900px) 50vw, 300px" className={styles.photoImg} />
                  </span>
                ) : (
                  <span className={styles.photo} aria-hidden="true">
                    {initials(m.name)}
                  </span>
                )}
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BigTextBand words={["Design", "Develop", "Deliver", "Support"]} />
      <ClientLogos title="Our clients" tone="alt" />
      <Industries />
      <Testimonials />
      <CtaBanner title="Let's create something great together." />
    </>
  );
}
