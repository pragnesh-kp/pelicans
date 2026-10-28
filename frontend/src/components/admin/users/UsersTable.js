"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Notice from "@/components/admin/Notice";
import { ROLES, roleLabel } from "@/constants/roles";
import { formatDate, formatShortDate } from "@/utils/formatDate";
import styles from "./UsersTable.module.css";

function usersUrl({ role = "", search = "" }) {
  const q = new URLSearchParams();
  if (role) q.set("role", role);
  if (search) q.set("search", search);
  const qs = q.toString();
  return `/admin/users${qs ? `?${qs}` : ""}`;
}

export default function UsersTable({ data, role, search, currentUserId, deletedName }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(search);
  const [notice, setNotice] = useState(deletedName ? `User “${deletedName}” deleted.` : null);
  const { users, counts } = data;

  const tabs = [{ value: "", plural: "All" }, ...ROLES];

  function onSearch(e) {
    e.preventDefault();
    router.push(usersUrl({ role, search: searchText.trim() }));
  }

  return (
    <>
      {notice && <Notice onDismiss={() => setNotice(null)}>{notice}</Notice>}

      <div className={styles.toolbar}>
        <nav aria-label="Filter users by role">
          <ul className={styles.tabs}>
            {tabs.map((t) => (
              <li key={t.value || "all"}>
                <Link
                  href={usersUrl({ role: t.value, search })}
                  className={role === t.value ? styles.activeTab : undefined}
                  aria-current={role === t.value ? "page" : undefined}
                >
                  {t.plural} <span className={styles.count}>({counts[t.value || "all"] ?? 0})</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form className={styles.search} onSubmit={onSearch} role="search">
          <label htmlFor="user-search" className="visually-hidden">
            Search users
          </label>
          <input
            id="user-search"
            type="search"
            placeholder="Search name or email…"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="admin-btn admin-btn--secondary">
            <Search aria-hidden="true" /> Search
          </button>
        </form>
      </div>

      {search && (
        <p className={styles.searchInfo}>
          Results for “{search}” — <Link href={usersUrl({ role })}>clear search</Link>
        </p>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Role</th>
            <th scope="col" className={styles.colNum}>
              Posts
            </th>
            <th scope="col" className={styles.colDate}>
              Last login
            </th>
            <th scope="col" className={styles.colDate}>
              Joined
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                {search ? "No users match your search." : "No users with this role."}
              </td>
            </tr>
          )}
          {users.map((u) => {
            const isMe = u.id === currentUserId;
            const href = isMe ? "/admin/profile" : `/admin/users/${u.id}/edit`;
            return (
              <tr key={u.id}>
                <td>
                  <div className={styles.userCell}>
                    <span className={styles.avatar} aria-hidden="true">
                      {u.name[0]?.toUpperCase()}
                    </span>
                    <div className={styles.userText}>
                      <Link href={href} className={styles.name}>
                        {u.name}
                      </Link>
                      {isMe && <span className={styles.you}>(you)</span>}
                      <span className={styles.email}>{u.email}</span>
                      <div className={styles.rowActions}>
                        <Link href={href}>{isMe ? "Edit your profile" : "Edit"}</Link>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge role-badge--${u.role}`}>{roleLabel(u.role)}</span>
                </td>
                <td className={styles.colNum}>{u.post_count}</td>
                <td className={styles.colDate}>
                  {u.last_login_at ? (
                    <time dateTime={u.last_login_at} suppressHydrationWarning>
                      {formatShortDate(u.last_login_at)}
                    </time>
                  ) : (
                    <span className={styles.muted}>Never</span>
                  )}
                </td>
                <td className={styles.colDate}>{formatDate(u.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
