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

// Centered (or left) section heading + intro paragraphs
export function BlockHeading({ heading, intro = [], align = "center" }) {
  if (!heading?.text && !intro.length) return null;
  return (
    <div className={`${styles.heading} ${align === "left" ? styles.left : ""}`} data-reveal>
      <Title heading={heading} className={styles.title} />
      {intro.map((p, i) => (
        <p key={i} className={styles.intro}>
          {p}
        </p>
      ))}
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

// CTA buttons: first one solid, the rest outlined (or given `variant`)
export function Buttons({ buttons = [], dark = false, center = false }) {
  const list = buttons.filter((b) => b.label && b.href && b.href !== "#");
  if (!list.length) return null;
  return (
    <div className={`${styles.buttons} ${center ? styles.center : ""}`}>
      {list.map((b, i) => (
        <SmartLink
          key={b.label + i}
          href={b.href}
          className={`btn ${i === 0 ? (dark ? "btn--accent" : "btn--primary") : dark ? "btn--ghost-light" : "btn--outline"}`}
        >
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
