"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_MENU } from "@/constants/adminMenu";
import { useUser } from "@/context/UserContext";

// badges: { "/admin/messages": 3 } shows a count bubble next to that item
export default function Sidebar({ badges = {} }) {
  const pathname = usePathname();
  const user = useUser();

  // "/admin" matches only itself; other items also match their sub-pages
  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);

  const items = ADMIN_MENU.filter((item) => !item.roles || item.roles.includes(user?.role));

  return (
    <nav className="admin-sidebar" aria-label="Admin menu">
      {items.map((item) => {
        const count = badges[item.href] || 0;
        return (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined}>
            {item.label}
            {count > 0 && (
              <span className="admin-badge" aria-label={`${count} unread`}>
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
