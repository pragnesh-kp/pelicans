import SplitText from "@/components/motion/SplitText";

// Eyebrow + title on the left, intro on the right (multiqos pattern).
// align="center" stacks them in the middle.
export default function SectionHeading({ eyebrow, title, highlight, intro, align = "split", as: Tag = "h2" }) {
  return (
    <div className={`section-head ${align === "center" ? "section-head--center" : ""}`} data-reveal>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Tag className="section-title">
          <SplitText text={title} highlight={highlight} highlightClass="hl" />
        </Tag>
      </div>
      {intro && <p className="section-head__intro">{intro}</p>}
    </div>
  );
}
