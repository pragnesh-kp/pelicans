"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown, PhoneCall } from "lucide-react";
import Logo from "./Logo";
import { MAIN_MENU } from "@/content/menu";
import { SITE } from "@/content/siteContent";
import styles from "./Header.module.css";

// Every URL inside a menu item (used to highlight the active item)
const itemHrefs = (item) => [item.href, ...(item.groups || []).flatMap((g) => g.links.map((l) => l.href))].filter(Boolean);

// Is this CSS colour light? null = (nearly) transparent, keep looking further down
function isLight(color) {
  const parts = color.match(/[\d.]+/g)?.map(Number);
  if (!parts || parts.length < 3) return null;
  const [r, g, b, a = 1] = parts;
  if (a < 0.5) return null;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
}

// Looks at the page section right behind the header bar and reports whether it is light.
// Only wide blocks count, so a white card or logo tile passing behind doesn't flip it.
// Photos and gradients without a background colour count as dark.
function backgroundIsLight(header) {
  const y = header.getBoundingClientRect().height / 2;
  const x = window.innerWidth / 2;
  const minWidth = window.innerWidth * 0.6;
  const behind = document.elementsFromPoint(x, y).find((el) => !header.contains(el));
  for (let el = behind; el && el !== document.documentElement; el = el.parentElement) {
    if (el.getBoundingClientRect().width < minWidth) continue; // card, tile, chip…
    const style = getComputedStyle(el);
    const light = isLight(style.backgroundColor);
    if (light !== null) return light;
    if (style.backgroundImage !== "none") return false;
  }
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile menu
  const [dropdown, setDropdown] = useState(null); // desktop mega menu (item label)
  const [expanded, setExpanded] = useState(null); // mobile accordion (item label)
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const [onLight, setOnLight] = useState(false); // white section behind the header?
  // Hovering opens a dropdown, so a click right after must not close it again
  const openedByHover = useRef(false);

  const hoverOpen = (label) => {
    openedByHover.current = true;
    setDropdown(label);
  };
  const toggle = (label) => {
    setDropdown((current) => (current === label && !openedByHover.current ? null : label));
    openedByHover.current = false;
  };

  // Close menus after navigating
  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  // Slightly stronger background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // White text over dark sections, black text over light ones
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      if (headerRef.current) setOnLight(backgroundIsLight(headerRef.current));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    const late = setTimeout(check, 400); // after images/fonts settle
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(late);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // Stop the page scrolling behind the open mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  // Escape or a click outside closes the desktop dropdown
  useEffect(() => {
    if (!dropdown) return;
    const onKey = (e) => e.key === "Escape" && setDropdown(null);
    const onClick = (e) => !navRef.current?.contains(e.target) && setDropdown(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [dropdown]);

  const isActive = (item) =>
    itemHrefs(item).some((href) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/")));

  return (
    <header
      ref={headerRef}
      data-header-on={onLight && !open ? "light" : "dark"}
      className={`${styles.header} ${scrolled || open ? styles.scrolled : ""} ${onLight && !open ? styles.onLight : ""}`}
    >
      {/* Floating pill bar */}
      <div className={styles.bar}>
        <Logo variant="auto" priority />

        <nav className={styles.desktopNav} aria-label="Main" ref={navRef}>
          <ul className={styles.navList}>
            {MAIN_MENU.map((item) => {
              const active = isActive(item);
              const isOpen = dropdown === item.label;
              const panelId = `menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
              if (!item.groups) {
                return (
                  <li key={item.label}>
                    <Link href={item.href} className={`${styles.link} ${active ? styles.active : ""}`} aria-current={pathname === item.href ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li
                  key={item.label}
                  className={`${styles.hasMenu} ${(item.columns || 1) <= 2 ? styles.narrow : ""}`}
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button
                    type="button"
                    className={`${styles.link} ${active ? styles.active : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.label)}
                  >
                    {item.label}
                    <ChevronDown size={16} aria-hidden="true" className={styles.chevron} />
                  </button>

                  {/* section--light: the dropdown uses the light colour set */}
                  <div id={panelId} className={`section--light ${styles.panel} ${isOpen ? styles.panelOpen : ""}`} data-lenis-prevent>
                    <div className={styles.panelGrid} style={{ "--cols": item.columns || 1 }}>
                      {item.groups.map((group, i) => (
                        <div key={group.title || i} className={group.title ? "" : styles.flatGroup}>
                          {group.title && <p className={styles.groupTitle}>{group.title}</p>}
                          <ul className={styles.groupLinks}>
                            {group.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className={`${styles.menuLink} ${pathname === l.href ? styles.menuLinkActive : ""}`} tabIndex={isOpen ? 0 : -1}>
                                  <span className={styles.menuLabel}>{l.label}</span>
                                  {l.text && <span className={styles.menuText}>{l.text}</span>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {item.href && (
                      <Link href={item.href} className={styles.panelAll} tabIndex={isOpen ? 0 : -1}>
                        View all {item.label.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                    <div className={styles.panelCta}>
                      <p>Didn&apos;t find what you&apos;re looking for? Tell us what you need and we&apos;ll shape a solution around it.</p>
                      <Link href="/contact" className="btn btn--primary" tabIndex={isOpen ? 0 : -1}>
                        Schedule a Free Consultation
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className={`btn btn--primary ${styles.cta}`}>
          Contact Us <ArrowUpRight aria-hidden="true" />
        </Link>

        <a href={SITE.phoneHref} className={styles.callButton} aria-label={`Call us on ${SITE.phone}`}>
          <PhoneCall size={20} aria-hidden="true" />
        </a>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Reading progress (CSS scroll timeline, where supported) */}
      <span className={styles.progress} aria-hidden="true" />

      <nav id="mobile-menu" className={`${styles.mobileNav} ${open ? styles.mobileOpen : ""}`} aria-label="Mobile" data-lenis-prevent>
        <ul className={styles.mobileList}>
          {MAIN_MENU.map((item) => {
            const isExpanded = expanded === item.label;
            if (!item.groups) {
              return (
                <li key={item.label}>
                  <Link href={item.href} className={`${styles.mobileLink} ${isActive(item) ? styles.mobileActive : ""}`} tabIndex={open ? 0 : -1}>
                    {item.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={`${styles.mobileLink} ${isActive(item) ? styles.mobileActive : ""}`}
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  tabIndex={open ? 0 : -1}
                >
                  {item.label}
                  <ChevronDown size={22} aria-hidden="true" className={styles.chevron} />
                </button>
                {isExpanded && (
                  <div className={styles.mobileSub}>
                    {item.href && (
                      <Link href={item.href} className={styles.mobileAll}>
                        View all {item.label.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                    {item.groups.map((group, i) => (
                      <div key={group.title || i}>
                        {group.title && <p className={styles.groupTitle}>{group.title}</p>}
                        <ul className={styles.mobileSubLinks}>
                          {group.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <Link href="/contact" className="btn btn--primary" tabIndex={open ? 0 : -1}>
          Contact Us <ArrowUpRight aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
