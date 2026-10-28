"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authService";

export default function Topbar() {
  const user = useUser();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      router.replace("/admin/login?loggedOut=1");
      router.refresh();
    }
  }

  const initial = user?.name?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <Link href="/admin">Pelicans Admin</Link>
        <Link href="/" className="topbar-site" target="_blank">
          Visit Site ↗
        </Link>
      </div>

      <div className="topbar-user">
        <span className="topbar-greeting">
          Howdy, <Link href="/admin/profile" className="topbar-profile" title="Edit your profile"><strong>{user?.name}</strong></Link>
        </span>
        <span className="topbar-role">{user?.role}</span>
        <span className="topbar-avatar" title={user?.email} aria-hidden="true">
          {initial}
        </span>
        <button type="button" className="topbar-logout" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? "Logging out…" : "Log Out"}
        </button>
      </div>
    </header>
  );
}
