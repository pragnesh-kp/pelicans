"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Logo.module.css";

// Logo files live in /public/images:
//   light = white text, for dark backgrounds (header, footer)
//   dark  = dark text, for light backgrounds
//   auto  = whichever matches the light/dark theme (header)
const LOGOS = {
  light: "/images/pelicans-web-logo-light.svg",
  dark: "/images/pelicans-web-logo-dark.svg",
};

// The SVGs are 756.53 × 120
const WIDTH = 214;
const HEIGHT = 34;

export default function Logo({ variant = "light", priority = false, className = "" }) {
  const pathname = usePathname();

  // Already on the home page: glide back to the top instead of doing nothing
  const onClick = (e) => {
    if (pathname !== "/") return;
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link href="/" onClick={onClick} className={`${styles.logo} ${className}`} aria-label="Pelicans Technologies — home">
      {variant === "auto" ? (
        // Follows the light/dark theme: CSS shows the matching file
        <>
          <Image src={LOGOS.light} alt="Pelicans Technologies" width={WIDTH} height={HEIGHT} priority={priority} unoptimized className={`${styles.image} ${styles.onDark}`} />
          <Image src={LOGOS.dark} alt="" width={WIDTH} height={HEIGHT} priority={priority} unoptimized className={`${styles.image} ${styles.onLight}`} />
        </>
      ) : (
        <Image src={LOGOS[variant]} alt="Pelicans Technologies" width={WIDTH} height={HEIGHT} priority={priority} unoptimized className={styles.image} />
      )}
    </Link>
  );
}
