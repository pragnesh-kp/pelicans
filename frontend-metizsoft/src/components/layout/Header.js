"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { MAIN_MENU } from "@/content/menu";
import { menuIcon } from "@/content/menuIcons";
import styles from "./Header.module.css";

// Every URL inside a menu item (used to highlight the active item)
const itemHrefs = (item) => [item.href, ...(item.groups || []).flatMap((g) => g.links.map((l) => l.href))].filter(Boolean);

function LinkIcon({ link }) {
  const { Icon, logo } = menuIcon(link);
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt="" width={16} height={16} className={styles.linkLogo} loading="lazy" />;
  }
  return <Icon size={16} aria-hidden="true" className={styles.linkIcon} />;
}

// Mega menu: a white panel the width of the page. Menus with named groups
// (Hire Talent, Technologies) show one column per group under a small
// uppercase title; single-group menus show icon + label + one line of text.
function MegaPanel({ item, id, open, pathname }) {
  const focusable = open ? 0 : -1;
  const titled = item.groups.some((g) => g.title);

  return (
    <div id={id} className={`${styles.panel} ${open ? styles.panelOpen : ""}`} data-lenis-prevent>
      <div className={styles.panelInner}>
        {titled ? (
          <div className={styles.groups} style={{ "--cols": Math.min(item.groups.length, 4) }}>
            {item.groups.map((g) => (
              <div key={g.title} className={styles.group}>
                <p className={styles.groupTitle}>{g.title}</p>
                <ul className={styles.groupLinks}>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={`${styles.menuLink} ${pathname === l.href ? styles.menuLinkActive : ""}`} tabIndex={focusable}>
                        <LinkIcon link={l} />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.group}>
            <p className={styles.groupTitle}>{item.label}</p>
            <ul className={styles.richLinks} style={{ "--cols": Math.min(item.columns || 3, 3) }}>
              {item.groups[0].links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`${styles.richLink} ${pathname === l.href ? styles.menuLinkActive : ""}`} tabIndex={focusable}>
                    <span className={styles.richIcon}>
                      <LinkIcon link={l} />
                    </span>
                    <span>
                      <span className={styles.richLabel}>{l.label}</span>
                      {l.text && <span className={styles.richText}>{l.text}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.panelFoot}>
          <p>
            Not sure where to start? <span>Tell us about your idea — we&apos;ll suggest the right team and stack.</span>
          </p>
          <div className={styles.panelFootLinks}>
            {item.href && (
              <Link href={item.href} className="link-arrow" tabIndex={focusable}>
                View all {item.label.toLowerCase()} <ArrowUpRight aria-hidden="true" />
              </Link>
            )}
            <Link href="/contact" className="btn btn--sm" tabIndex={focusable}>
              Talk to an Expert <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
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
  const closeTimer = useRef(null);
  // Hovering opens a dropdown, so a click right after must not close it again
  const openedByHover = useRef(false);

  const hoverOpen = (label) => {
    clearTimeout(closeTimer.current);
    openedByHover.current = true;
    setDropdown(label);
  };
  // Short delay so moving the mouse down into the panel doesn't close it
  const hoverClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(null), 120);
  };
  const toggle = (label) => {
    setDropdown((current) => (current === label && !openedByHover.current ? null : label));
    openedByHover.current = false;
  };

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  // White bar with a hairline once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the page scrolling behind the open mobile menu
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
    <header className={`${styles.header} ${scrolled || open || dropdown ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Logo priority />

        <nav className={styles.desktopNav} aria-label="Main" ref={navRef}>
          <ul className={styles.navList}>
            {MAIN_MENU.map((item) => {
              const active = isActive(item);
              const isOpen = dropdown === item.label;
              const panelId = `menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
              const icon = item.icon === "sparkles" && <Sparkles size={15} aria-hidden="true" className={styles.navIcon} />;
              if (!item.groups) {
                return (
                  <li key={item.label}>
                    <Link href={item.href} className={`${styles.link} ${active ? styles.active : ""}`} aria-current={pathname === item.href ? "page" : undefined}>
                      {icon}
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.label} onMouseEnter={() => hoverOpen(item.label)} onMouseLeave={hoverClose}>
                  <button
                    type="button"
                    className={`${styles.link} ${active || isOpen ? styles.active : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.label)}
                  >
                    {icon}
                    {item.label}
                    <ChevronDown size={14} aria-hidden="true" className={styles.chevron} />
                  </button>
                  <MegaPanel item={item} id={panelId} open={isOpen} pathname={pathname} />
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className={`btn btn--sm ${styles.cta}`}>
          Get in Touch
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
                  <span className={styles.mobilePlus} aria-hidden="true">
                    <ChevronDown size={16} />
                  </span>
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
                                <LinkIcon link={l} />
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {item.href && (
                      <Link href={item.href} className="link-arrow">
                        View all {item.label.toLowerCase()} <ArrowUpRight aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <Link href="/contact" className="btn btn--block" tabIndex={open ? 0 : -1}>
          Get in Touch <ArrowUpRight aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
