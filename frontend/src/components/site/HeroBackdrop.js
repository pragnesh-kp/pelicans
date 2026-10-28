"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroBackdrop.module.css";

// The three paths of the Pelicans "P" mark (viewBox 105.6 x 120, offset -8.43 -5)
const MARK = [
  "M23.94,110.59v8.94A5.48,5.48,0,0,0,29.42,125H42.09a5.48,5.48,0,0,0,5.48-5.48V100.63a5.54,5.54,0,0,1,5.54-5.54S31.34,91,23.94,110.59Z",
  "M102.87,20.62A46,46,0,0,0,68.3,5H57.17a3.69,3.69,0,0,0-3.69,3.69V24.2a3.69,3.69,0,0,1-3.69,3.69h-14a3.69,3.69,0,0,1-3.69-3.69V9.43a3.69,3.69,0,0,0-3.69-3.69H12.13A3.69,3.69,0,0,0,8.43,9.43V25.68a3.69,3.69,0,0,0,3.69,3.69H26.89a3.69,3.69,0,0,1,3.69,3.69V47.83a3.69,3.69,0,0,0,3.69,3.69H50.53a3.69,3.69,0,0,0,3.69-3.69V32.32a3.69,3.69,0,0,1,3.69-3.69H68.53c11.65,0,21.52,9.12,21.86,20.77A21.44,21.44,0,0,1,69,71.46S120.74,73.5,102.87,20.62Z",
  "M102.87,20.62C120.74,73.5,69,71.46,69,71.46H43.14a19.2,19.2,0,0,0-19.2,19.2v19.93C31.34,91,53.11,95.09,53.11,95.09H69a45.1,45.1,0,0,0,45-45.75A44.34,44.34,0,0,0,102.87,20.62Z",
];
const FILLS = ["url(#hb-a)", "url(#hb-b)", "url(#hb-c)"];
const DEPTH = 9;

// Pixels that light up over the tiled grid (grid itself is a CSS background on the same 34px pitch,
// anchored top-right); seeded so server and client render the same
const COLS = 34;
const ROWS = 30;
const PITCH = 34;
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = seeded(7);
const PIXELS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  x: (i % COLS) * PITCH,
  y: Math.floor(i / COLS) * PITCH,
  lit: rand() < 0.08,
  delay: (rand() * 9).toFixed(2),
  dur: (4 + rand() * 5).toFixed(2),
})).filter((p) => p.lit);

// Hero backdrop: pixel field, glow, and a 3D Pelicans mark that tilts toward the pointer
export default function HeroBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={styles.backdrop} aria-hidden="true">
      <div className={styles.pixels}>
        <svg width={COLS * PITCH} height={ROWS * PITCH}>
          {PIXELS.map((p) => (
            <rect
              key={`${p.x}-${p.y}`}
              x={p.x}
              y={p.y}
              width={PITCH - 8}
              height={PITCH - 8}
              rx="5"
              style={{ animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
            />
          ))}
        </svg>
      </div>

      <div className={styles.glow} />

      <div className={styles.stage}>
        <div className={styles.orbit}>
          <span className={styles.satellite} />
        </div>
        <div className={styles.float}>
          <svg className={styles.mark} viewBox="-6 -4 124 132">
            <defs>
              <linearGradient id="hb-a" x1="34.43" y1="124.96" x2="41.02" y2="89.37" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00bfff" />
                <stop offset="0.7" stopColor="#0042ff" />
              </linearGradient>
              <linearGradient id="hb-b" x1="97.27" y1="66.48" x2="26.5" y2="-6" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00c8ff" />
                <stop offset="1" stopColor="#0042ff" />
              </linearGradient>
              <linearGradient id="hb-c" x1="16.9" y1="105.75" x2="111.99" y2="45.47" gradientUnits="userSpaceOnUse">
                <stop offset="0.35" stopColor="#00bfff" />
                <stop offset="1" stopColor="#0042e1" />
              </linearGradient>
              <linearGradient id="hb-sheen" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <clipPath id="hb-clip">
                {MARK.map((d) => (
                  <path key={d} d={d} />
                ))}
              </clipPath>
            </defs>

            <g transform="translate(-8.43 -5)">
              {/* extruded depth, back to front */}
              {Array.from({ length: DEPTH }, (_, i) => DEPTH - i).map((n) => (
                <g key={n} transform={`translate(${n * 0.55} ${n * 0.7})`} className={styles.layer} style={{ "--n": n }}>
                  {MARK.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </g>
              ))}

              {/* front face */}
              {MARK.map((d, i) => (
                <path key={d} d={d} fill={FILLS[i]} />
              ))}

              {/* light sweeping across the face */}
              <g clipPath="url(#hb-clip)">
                <rect className={styles.sheen} x="-40" y="0" width="40" height="130" fill="url(#hb-sheen)" />
              </g>

              {/* outline that draws itself in */}
              {MARK.map((d) => (
                <path key={d} d={d} pathLength="1" className={styles.outline} />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
