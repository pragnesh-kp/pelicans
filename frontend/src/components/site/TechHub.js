"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { TECH_HUB } from "@/content/siteContent";
import styles from "./TechHub.module.css";

// Diagram coordinates (the hub box is 600 × 580): the Pelicans mark sits in the
// middle and a dashed connector runs out to each corner card.
const CONNECTORS = [
  { d: "M238 290H130Q110 290 110 270V222", dot: [110, 222] }, // top left
  { d: "M362 290H470Q490 290 490 270V222", dot: [490, 222] }, // top right
  { d: "M238 290H130Q110 290 110 310V358", dot: [110, 358] }, // bottom left
  { d: "M362 290H470Q490 290 490 310V358", dot: [490, 358] }, // bottom right
];

// Technologies section: accordion of what we build on the left, and a hub
// diagram of logo honeycombs on the right. Opening a group highlights its card.
export default function TechHub({ tone = "alt" }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Our tech stack"
          title="Technologies & platforms we use"
          intro="We pick proven, modern tools for every layer of your product — from AI models to cloud infrastructure."
        />

        <div className={styles.layout}>
          {/* Left: accordion */}
          <div className={styles.accordion} data-reveal="left">
            {TECH_HUB.map((group, i) => {
              const open = i === active;
              return (
                <div key={group.name} className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
                  <h3 className={styles.itemHeading}>
                    <button
                      type="button"
                      id={`${id}-tab-${i}`}
                      className={styles.toggle}
                      aria-expanded={open}
                      aria-controls={`${id}-panel-${i}`}
                      onClick={() => setActive(open ? null : i)}
                    >
                      {group.name}
                      <span className={styles.chevron} aria-hidden="true">
                        <ChevronDown size={18} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${id}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${id}-tab-${i}`}
                    className={styles.panel}
                    inert={!open ? true : undefined}
                  >
                    <div className={styles.panelInner}>
                      <ul className={styles.capabilities}>
                        {group.capabilities.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                      {/* Phones: the diagram is hidden, so the logos show here */}
                      <Honeycomb logos={group.logos} className={styles.panelLogos} />
                      <Link href={group.href} className={styles.more}>
                        View More
                        <span className={styles.moreIcon} aria-hidden="true">
                          <ArrowUpRight size={16} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: hub diagram */}
          <div className={styles.hub} data-reveal="right">
            <svg className={styles.lines} viewBox="0 0 600 580" aria-hidden="true">
              {/* the active connector is drawn last so it sits on top of the shared segment */}
              {CONNECTORS.map((c, i) => ({ ...c, i }))
                .sort((a, b) => (a.i === active) - (b.i === active))
                .map((c) => (
                  <g key={c.i} className={c.i === active ? styles.lineActive : styles.line}>
                    <path d={c.d} />
                    <circle cx={c.dot[0]} cy={c.dot[1]} r="5" />
                  </g>
                ))}
            </svg>

            <div className={styles.center} aria-hidden="true">
              <span className={styles.ring} />
              <Image src="/images/pelicans-mark.svg" alt="" width={106} height={120} className={styles.mark} />
            </div>

            {TECH_HUB.map((group, i) => (
              <button
                key={group.name}
                type="button"
                className={`${styles.card} ${styles[`card${i}`]} ${i === active ? styles.cardActive : ""}`}
                aria-pressed={i === active}
                aria-label={`Show ${group.name} technologies`}
                onClick={() => setActive(i)}
              >
                <Honeycomb logos={group.logos} className={styles.honeycomb} />
                <span className={styles.label}>{group.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 7 hexagons: 2 on top, 3 in the middle, 2 underneath
function Honeycomb({ logos, className }) {
  const rows = [logos.slice(0, 2), logos.slice(2, 5), logos.slice(5, 7)];
  return (
    <span className={className}>
      {rows.map((row, r) => (
        <span key={r} className={styles.hexRow}>
          {row.map((t) => (
            <span key={t.name} className={styles.hex} title={t.name}>
              <Image src={t.logo} alt={t.name} width={40} height={40} className={styles.hexLogo} />
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
