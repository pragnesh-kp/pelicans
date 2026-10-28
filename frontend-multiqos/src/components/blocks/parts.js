import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import styles from "./parts.module.css";

const isExternal = (href) => /^https?:\/\//.test(href);

// Heading from the page data: { text, highlight } — the highlight part is coloured.
// Letters animate in one by one (SplitText) when the block scrolls into view.
export function Title({ heading, as: Tag = "h2", className = "" }) {
  if (!heading?.text) return null;
  return (
    <Tag className={className}>
      <SplitText text={heading.text} highlight={heading.highlight} highlightClass={styles.highlight} />
    </Tag>
  );
}

// Section heading (multiqos pattern): eyebrow + title on the left, intro on the right.
// align="center" stacks everything in the middle (FAQ, CTA bands).
export function BlockHeading({ heading, intro = [], eyebrow, align = "split", className = "" }) {
  if (!heading?.text && !intro.length) return null;
  const center = align === "center";
  return (
    <div className={`section-head ${center ? "section-head--center" : ""} ${className}`} data-reveal>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Title heading={heading} className={styles.title} />
      </div>
      {intro.length > 0 && (
        <div className={styles.introCol}>
          {intro.map((p, i) => (
            <p key={i} className="section-head__intro">
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function Paragraphs({ items = [], className = "" }) {
  return items.map((p, i) => (
    <p key={i} className={className}>
      {p}
    </p>
  ));
}

// Internal links use next/link; external ones open in a new tab
export function SmartLink({ href, children, ...props }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

// CTA buttons (all the same pill + arrow style); `dark` = on a dark or blue background
export function Buttons({ buttons = [], dark = false, center = false }) {
  const list = buttons.filter((b) => b.label && b.href && b.href !== "#");
  if (!list.length) return null;
  return (
    <div className={`${styles.buttons} ${center ? styles.center : ""}`}>
      {list.map((b, i) => (
        <SmartLink key={b.label + i} href={b.href} className={`btn ${dark ? "btn--accent" : ""}`}>
          {b.label} <ArrowUpRight aria-hidden="true" />
        </SmartLink>
      ))}
    </div>
  );
}

// Picture that fills its (positioned) parent. SVGs skip Next's optimiser.
export function FillImage({ src, alt = "", sizes = "100vw", className = "", priority = false }) {
  if (!src) return null;
  if (src.endsWith(".svg")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`${styles.fill} ${className}`} loading={priority ? "eager" : "lazy"} />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} priority={priority} />;
}

// Small logo / icon at a fixed size
export function Logo({ src, alt = "", size = 40, className = "" }) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={size} height={size} loading="lazy" className={`${styles.logo} ${className}`} />;
}
