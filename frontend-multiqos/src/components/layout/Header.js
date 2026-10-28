"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react";
import Logo from "./Logo";
import { MAIN_MENU } from "@/content/menu";
import styles from "./Header.module.css";

// Every URL inside a menu item (used to highlight the active item)
const itemHrefs = (item) => [item.href, ...(item.groups || []).flatMap((g) => g.links.map((l) => l.href))].filter(Boolean);

// Mega menu panel. Menus with several groups (Hire Talent, Technologies) get
// category tabs on the left; single-group menus list their links directly.
// A "next step" card sits on the right of every panel.
function MegaPanel({ item, id, open, pathname }) {
  const [tab, setTab] = useState(0);
  const tabbed = item.groups.length > 1;
  const group = item.groups[Math.min(tab, item.groups.length - 1)];
  const focusable = open ? 0 : -1;

  useEffect(() => {
    if (!open) setTab(0);
  }, [open]);

  return (
    <div id={id} className={`${styles.panel} ${open ? styles.panelOpen : ""}`} data-lenis-prevent>
      <div className={`${styles.panelInner} ${tabbed ? styles.tabbed : ""}`}>
        {tabbed && (
          <ul className={styles.tabs} role="tablist" aria-label={item.label}>
            {item.groups.map((g, i) => (
              <li key={g.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  tabIndex={focusable}
                  className={`${styles.tab} ${i === tab ? styles.tabActive : ""}`}
                  onMouseEnter={() => setTab(i)}
                  onFocus={() => setTab(i)}
                  onClick={() => setTab(i)}
                >
                  {g.title}
                  <span className={styles.tabArrow}>
                    <ChevronRight size={16} aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.links}>
          <p className={styles.linksTitle}>{tabbed ? group.title : item.label}</p>
          <ul className={styles.linkGrid} style={{ "--cols": tabbed ? 2 : Math.min(item.columns || 2, 3) }}>
            {group.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`${styles.menuLink} ${pathname === l.href ? styles.menuLinkActive : ""}`} tabIndex={focusable}>
                  <span className={styles.menuLabel}>{l.label}</span>
                  {l.text && <span className={styles.menuText}>{l.text}</span>}
                </Link>
              </li>
            ))}
          </ul>
          {item.href && (
            <Link href={item.href} className={styles.viewAll} tabIndex={focusable}>
              View all {item.label.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className={styles.panelCta}>
          <p className={styles.ctaTitle}>Didn&apos;t find what you&apos;re looking for?</p>
          <p className={styles.ctaText}>Tell us what you need and we&apos;ll shape a solution around it.</p>
          <Link href="/contact" className="btn btn--sm" tabIndex={focusable}>
            Contact Us <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile menu
  const [dropdown, setDropdown] = useState(null); // desktop mega menu (item label)
  const [expanded, setExpanded] = useState(null); // mobile accordion (item label)
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
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

  // Thin shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the page scrolling behind the open mobile menu. Locked on <html>, not <body>:
  // an overflow on body would turn it into the scroller and unstick the header.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
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
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Logo priority />

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
                <li key={item.label} className={styles.hasMenu} onMouseEnter={() => hoverOpen(item.label)} onMouseLeave={() => setDropdown(null)}>
                  <button
                    type="button"
                    className={`${styles.link} ${active || isOpen ? styles.active : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.label)}
                  >
                    {item.label}
                    <ChevronDown size={16} aria-hidden="true" className={styles.chevron} />
                  </button>
                  <MegaPanel item={item} id={panelId} open={isOpen} pathname={pathname} />
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className={`btn ${styles.cta}`}>
          Contact Us <ArrowUpRight aria-hidden="true" />
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
                  className={`${styles.mobileLink} ${isActive(item) || isExpanded ? styles.mobileActive : ""}`}
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  tabIndex={open ? 0 : -1}
                >
                  {item.label}
                  <ChevronDown size={20} aria-hidden="true" className={styles.chevron} />
                </button>
                {isExpanded && (
                  <div className={styles.mobileSub}>
                    {item.groups.map((group, i) => (
                      <div key={group.title || i}>
                        {group.title && <p className={styles.mobileGroup}>{group.title}</p>}
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
                    {item.href && (
                      <Link href={item.href} className={styles.viewAll}>
                        View all {item.label.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <Link href="/contact" className="btn" tabIndex={open ? 0 : -1}>
          Contact Us <ArrowUpRight aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
