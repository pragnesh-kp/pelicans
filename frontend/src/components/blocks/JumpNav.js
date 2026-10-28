"use client";

import { useEffect, useState } from "react";
import styles from "./TechDirectory.module.css";

// Sticky row of category links; highlights the category currently on screen
export default function JumpNav({ links }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    // A section counts as "current" while it crosses the upper third of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className={styles.jump} aria-label="Technology categories">
      <div className="container">
        <ul>
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
