// Blocks used only on portfolio case-study pages (/portfolio/<project>)
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { BlockHeading, Paragraphs, Title } from "./parts";
import styles from "./CaseStudyBlocks.module.css";

// Banner: project name over its cover image, with the project video below when there is one
export function CstHero({ title, image, video }) {
  return (
    <section className={`theme-dark ${styles.hero}`}>
      {image && <Image src={image} alt="" fill priority sizes="100vw" className={styles.heroImage} />}
      <div className={`container ${styles.heroInner} enter-seq`}>
        <span className="eyebrow">Case study</span>
        <h1 className={styles.heroTitle}>{title}</h1>
        {video && (
          <div className={styles.video}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video}?rel=0`}
              title={`${title} – project video`}
              loading="lazy"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}

// Introduction: client logo, categories and the project summary
export function CstIntro({ categories: allCategories = [], logo, text = [] }) {
  const categories = [...new Set(allCategories.filter(Boolean))];
  return (
    <section className="section">
      <div className={`container ${styles.intro}`}>
        <div className={styles.introSide} data-reveal="left">
          <h2 className={styles.introTitle}>Introduction</h2>
          {logo && (
            <div className={styles.clientLogo}>
              <Image src={logo} alt="" width={180} height={72} />
            </div>
          )}
          {categories.length > 0 && (
            <>
              <p className={styles.label}>Category</p>
              <ul className={styles.categories}>
                {categories.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={styles.introText} data-reveal="right">
          <Paragraphs items={text} />
        </div>
      </div>
    </section>
  );
}

// Justified row: every picture gets the same height, widths follow their shape.
// The row is never taller than --row-max (a lone phone screenshot stays phone-sized).
function ImageRow({ images, sizes }) {
  const shape = images.reduce((sum, img) => sum + img.width / img.height, 0);
  return (
    <div className={styles.row} style={{ "--shape": shape, "--count": images.length }} data-stagger>
      {images.map((img) => (
        <div key={img.src} className={styles.shot} style={{ flexGrow: img.width / img.height }}>
          <Image src={img.src} alt="" width={img.width} height={img.height} sizes={sizes} className={styles.shotImage} />
        </div>
      ))}
    </div>
  );
}

// UI/UX showcase: heading, text, desktop + mobile screenshots
export function CstShowcase({ heading, text = [], image, mobileImage, tone }) {
  const shots = [image, mobileImage].filter((i) => i?.src);
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} intro={text} />
        {shots.length > 0 && <ImageRow images={shots} sizes="(max-width: 900px) 90vw, 900px" />}
      </div>
    </section>
  );
}

// Screenshot gallery (rows of up to 3)
export function CstGallery({ images = [] }) {
  const rows = [];
  const perRow = images.length > 4 ? 3 : images.length;
  for (let i = 0; i < images.length; i += perRow) rows.push(images.slice(i, i + perRow));
  return (
    <section className={styles.gallery}>
      <div className="container">
        {rows.map((row, i) => (
          <ImageRow key={i} images={row} sizes="(max-width: 900px) 60vw, 700px" />
        ))}
      </div>
    </section>
  );
}

// Key challenges / solutions as numbered points (dark variant for solutions)
export function NumberedPoints({ heading, items = [], dark }) {
  return (
    <section className={`section ${dark ? "section--dark" : ""}`}>
      <div className="container">
        <BlockHeading heading={heading} />
        <ol className={styles.points} data-stagger>
          {items.map((item, i) => (
            <li key={i} className={styles.point}>
              <span className={styles.pointNumber}>{String(i + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Key features check list
export function Checklist({ heading, items = [], tone }) {
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <Title heading={heading} className={styles.checkTitle} />
        <ul className={styles.checklist} data-stagger>
          {items.map((item, i) => (
            <li key={item + i}>
              <CircleCheck size={22} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
