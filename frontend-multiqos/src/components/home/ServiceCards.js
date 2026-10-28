import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/site/SectionHeading";
import { SERVICES } from "@/content/siteContent";
import styles from "./ServiceCards.module.css";

// Grey cards (title, text, photo) in a sliding row; on hover a card turns
// blue and its bottom-left corner rounds off (multiqos "AI Solutions" row)
export default function ServiceCards() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Our Services"
          title="Solutions that transform business workflows"
          highlight="transform business workflows"
          intro="From AI and custom software to web, mobile and e-commerce — we design, build and scale products that solve real business problems."
        />
        <Carousel label="Our services" className={styles.carousel}>
          {SERVICES.map((s) => (
            <Link key={s.id} href={`/services/${s.id}`} className={styles.card}>
              <div>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.text}>{s.description}</p>
              </div>
              <div className={styles.media}>
                <Image src={s.image} alt="" fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px" />
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
