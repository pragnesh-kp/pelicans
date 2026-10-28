"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Notice from "@/components/admin/Notice";
import { trashPost, restorePost, deletePost } from "@/services/postService";
import { errorMessage } from "@/lib/api";
import { formatDate } from "@/utils/formatDate";
import styles from "./PostsTable.module.css";

const TABS = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
  { key: "trash", label: "Trash" },
];

const STATUS_LABEL = { draft: "Draft", published: "Published", trash: "Trash" };

// Builds /admin/posts?status=...&search=...&page=... leaving out defaults
function listUrl({ status = "all", search = "", page = 1 }) {
  const q = new URLSearchParams();
  if (status !== "all") q.set("status", status);
  if (search) q.set("search", search);
  if (page > 1) q.set("page", String(page));
  const qs = q.toString();
  return `/admin/posts${qs ? `?${qs}` : ""}`;
}

export default function PostsTable({ data, status, search }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState(null);
  const [notice, setNotice] = useState(null); // { type, text, undo? }
  const [searchText, setSearchText] = useState(search);

  const { posts, counts, page, pages, total } = data;

  // Runs an action on one post, then reloads the list from the server
  async function run(id, action, successNotice) {
    setBusyId(id);
    setNotice(null);
    try {
      await action();
      setNotice(successNotice);
      startTransition(() => router.refresh());
    } catch (err) {
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setBusyId(null);
    }
  }

  const onTrash = (post) =>
    run(post.id, () => trashPost(post.id), {
      type: "success",
      text: `“${post.title}” moved to the Trash.`,
      undo: () => run(post.id, () => restorePost(post.id, post.status), { type: "success", text: "Post restored." }),
    });

  const onRestore = (post) =>
    run(post.id, () => restorePost(post.id), { type: "success", text: `“${post.title}” restored as a draft.` });

  const onDelete = (post) => {
    if (!window.confirm(`Permanently delete “${post.title}”? This cannot be undone.`)) return;
    run(post.id, () => deletePost(post.id), { type: "success", text: "Post permanently deleted." });
  };

  function onSearch(e) {
    e.preventDefault();
    router.push(listUrl({ status, search: searchText.trim() }));
  }

  return (
    <div className={styles.wrap} aria-busy={isPending}>
      {notice && (
        <Notice type={notice.type} onDismiss={() => setNotice(null)}>
          {notice.text}{" "}
          {notice.undo && (
            <button type="button" className="admin-link" onClick={notice.undo}>
              Undo
            </button>
          )}
        </Notice>
      )}

      {/* Status tabs + search */}
      <div className={styles.toolbar}>
        <nav aria-label="Filter posts by status">
          <ul className={styles.tabs}>
            {TABS.map((tab) => (
              <li key={tab.key}>
                <Link
                  href={listUrl({ status: tab.key, search })}
                  className={status === tab.key ? styles.activeTab : undefined}
                  aria-current={status === tab.key ? "page" : undefined}
                >
                  {tab.label} <span className={styles.count}>({counts[tab.key] ?? 0})</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form className={styles.search} onSubmit={onSearch} role="search">
          <label htmlFor="post-search" className="visually-hidden">
            Search posts
          </label>
          <input
            id="post-search"
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search posts…"
          />
          <button type="submit" className="admin-btn admin-btn--secondary">
            <Search aria-hidden="true" /> Search
          </button>
        </form>
      </div>

      {search && (
        <p className={styles.searchInfo}>
          Search results for “{search}” — <Link href={listUrl({ status })}>clear search</Link>
        </p>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col" className={styles.colAuthor}>Author</th>
            <th scope="col" className={styles.colCategories}>Categories</th>
            <th scope="col" className={styles.colDate}>Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                {search
                  ? "No posts match your search."
                  : status === "trash"
                    ? "The Trash is empty."
                    : "No posts yet."}{" "}
                {status !== "trash" && !search && <Link href="/admin/posts/new">Write your first post</Link>}
              </td>
            </tr>
          )}

          {posts.map((post) => {
            const busy = busyId === post.id;
            const inTrash = post.status === "trash";
            return (
              <tr key={post.id} className={busy ? styles.busyRow : undefined}>
                <td className={styles.titleCell}>
                  <strong>
                    {inTrash ? (
                      <span>{post.title}</span>
                    ) : (
                      <Link href={`/admin/posts/${post.id}/edit`}>{post.title}</Link>
                    )}
                    {status === "all" && post.status === "draft" && <span className={styles.state}> — Draft</span>}
                  </strong>

                  {/* Shown only on small screens, where the other columns are hidden */}
                  <span className={styles.mobileMeta}>
                    {post.author_name || "—"} · {STATUS_LABEL[post.status]} · {formatDate(post.published_at || post.updated_at)}
                  </span>

                  <div className={styles.rowActions}>
                    {inTrash ? (
                      <>
                        <button type="button" className="admin-link" onClick={() => onRestore(post)} disabled={busy}>
                          Restore
                        </button>
                        <span aria-hidden="true">|</span>
                        <button
                          type="button"
                          className="admin-link admin-link--danger"
                          onClick={() => onDelete(post)}
                          disabled={busy}
                        >
                          Delete Permanently
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                        <span aria-hidden="true">|</span>
                        <button
                          type="button"
                          className="admin-link admin-link--danger"
                          onClick={() => onTrash(post)}
                          disabled={busy}
                        >
                          Trash
                        </button>
                        {post.status === "published" && (
                          <>
                            <span aria-hidden="true">|</span>
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </td>
                <td className={styles.colAuthor}>{post.author_name || "—"}</td>
                <td className={styles.colCategories}>
                  {post.categories.length ? post.categories.map((c) => c.name).join(", ") : "—"}
                </td>
                <td className={styles.colDate}>
                  <span className={styles.dateLabel}>
                    {post.status === "published" ? "Published" : "Last modified"}
                  </span>
                  {formatDate(post.status === "published" ? post.published_at : post.updated_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.footer}>
        <span>
          {total} {total === 1 ? "item" : "items"}
        </span>
        {pages > 1 && (
          <nav className={styles.pagination} aria-label="Pagination">
            {page > 1 ? (
              <Link href={listUrl({ status, search, page: page - 1 })} className="admin-btn admin-btn--secondary">
                <ChevronLeft aria-hidden="true" /> Previous
              </Link>
            ) : (
              <span className="admin-btn admin-btn--secondary" aria-disabled="true" style={{ opacity: 0.5 }}>
                <ChevronLeft aria-hidden="true" /> Previous
              </span>
            )}
            <span>
              Page {page} of {pages}
            </span>
            {page < pages ? (
              <Link href={listUrl({ status, search, page: page + 1 })} className="admin-btn admin-btn--secondary">
                Next <ChevronRight aria-hidden="true" />
              </Link>
            ) : (
              <span className="admin-btn admin-btn--secondary" aria-disabled="true" style={{ opacity: 0.5 }}>
                Next <ChevronRight aria-hidden="true" />
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
