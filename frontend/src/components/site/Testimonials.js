"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { TESTIMONIALS } from "@/content/siteContent";
import styles from "./Testimonials.module.css";

// Testimonial slider: round photo on the left, pink quote card on the right,
// round arrows on both sides and dots underneath. Swipe works on touch screens.
export default function Testimonials({ title = "What our clients say", tone = "alt" }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const count = TESTIMONIALS.length;

  const go = (i) => setIndex(Math.max(0, Math.min(count - 1, i)));
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // Swipe left/right on phones and tablets
  const onPointerDown = (e) => {
    if (e.pointerType === "touch") touchStart.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (touchStart.current === null) return;
    const dx = e.clientX - touchStart.current;
    touchStart.current = null;
    if (dx > 50) prev();
    if (dx < -50) next();
  };

  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <SectionHeading eyebrow="Testimonials" title={title} />

        <div
          className={styles.slider}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={22} aria-hidden="true" />
          </button>

          {/* All slides share one grid cell, so the height never jumps */}
          <div className={styles.slides} aria-live="polite">
            {TESTIMONIALS.map((t, i) => {
              const active = i === index;
              return (
                <figure
                  key={t.name}
                  className={`${styles.slide} ${active ? styles.active : ""}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={!active}
                  inert={!active ? true : undefined}
                >
                  <div className={styles.photo}>
                    {t.photo ? (
                      <Image src={t.photo} alt={t.name} fill sizes="(max-width: 900px) 200px, 320px" className={styles.photoImg} />
                    ) : (
                      <span className={styles.initial} aria-hidden="true">
                        {t.name[0]}
                      </span>
                    )}
                  </div>

                  <div className={styles.card}>
                    <blockquote className={styles.quote}>“{t.quote}”</blockquote>
                    <figcaption>
                      <strong className={styles.name}>{t.name}</strong>
                      <span className={styles.role}>
                        {t.company}
                        {t.country && (
                          <>
                            {" · "}
                            {t.flag && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={t.flag} alt="" width={16} height={16} className={styles.flag} />
                            )}
                            {t.country}
                          </>
                        )}
                      </span>
                    </figcaption>
                  </div>
                </figure>
              );
            })}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={next}
            disabled={index === count - 1}
            aria-label="Next testimonial"
          >
            <ArrowRight size={22} aria-hidden="true" />
          </button>

          <div className={styles.dots}>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
