"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LoaderCircle } from "lucide-react";
import Notice from "@/components/admin/Notice";
import RichTextEditor from "./RichTextEditor";
import FeaturedImage from "./FeaturedImage";
import { createPost, updatePost, trashPost, restorePost } from "@/services/postService";
import { errorMessage } from "@/lib/api";
import { expandMediaUrls, shortenMediaUrls } from "@/lib/media";
import { formatDate } from "@/utils/formatDate";
import { slugify } from "@/utils/slugify";
import { flattenTree } from "@/utils/categoryTree";
import styles from "./PostEditor.module.css";

const SAVED_NOTICES = {
  published: "Post published.",
  draft: "Draft saved.",
};

// The editable fields (status is chosen by the button you click)
const toForm = (post) => ({
  title: post?.title ?? "",
  slug: post?.slug ?? "",
  content: expandMediaUrls(post?.content ?? ""), // full image URLs while editing
  excerpt: post?.excerpt ?? "",
  featured_image: post?.featured_image ?? "",
  categories: post?.categories?.map((c) => c.id) ?? [],
});

const sameForm = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default function PostEditor({ post: initialPost, categories, savedStatus }) {
  const router = useRouter();
  const [post, setPost] = useState(initialPost); // latest version from the server
  const isNew = !post;

  const [form, setForm] = useState(() => toForm(initialPost));
  const [savedForm, setSavedForm] = useState(() => toForm(initialPost));
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(null); // which action is running
  const [notice, setNotice] = useState(
    SAVED_NOTICES[savedStatus] ? { type: "success", text: SAVED_NOTICES[savedStatus] } : null
  );

  const dirty = !sameForm(form, savedForm);
  const status = post?.status ?? "draft";
  const titleRef = useRef(null);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  function onTitleChange(e) {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: slugEdited ? f.slug : slugify(title) }));
    if (errors.title) setErrors((er) => ({ ...er, title: undefined }));
  }

  function toggleCategory(id) {
    update("categories", form.categories.includes(id) ? form.categories.filter((c) => c !== id) : [...form.categories, id]);
  }

  async function save(nextStatus) {
    if (!form.title.trim()) {
      setErrors({ title: "Please add a title." });
      titleRef.current?.focus();
      return;
    }

    setSaving(nextStatus);
    setNotice(null);
    setErrors({});
    try {
      const payload = { ...form, content: shortenMediaUrls(form.content), status: nextStatus };

      if (isNew) {
        const created = await createPost(payload);
        setSavedForm(form); // nothing unsaved any more
        router.replace(`/admin/posts/${created.id}/edit?saved=${created.status}`);
        return; // the edit page takes over
      }

      const wasPublished = post.status === "published";
      const updated = await updatePost(post.id, payload);
      const fresh = toForm(updated);
      setPost(updated);
      setForm(fresh);
      setSavedForm(fresh);

      let text = "Draft saved.";
      if (updated.status === "published") text = wasPublished ? "Post updated." : "Post published.";
      else if (wasPublished) text = "Post switched to draft — it is no longer on the website.";
      setNotice({ type: "success", text });
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setSaving(null);
    }
  }

  async function moveToTrash() {
    setSaving("trash");
    try {
      await trashPost(post.id);
      setSavedForm(form);
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setNotice({ type: "error", text: errorMessage(err) });
      setSaving(null);
    }
  }

  async function restore() {
    setSaving("restore");
    try {
      const restored = await restorePost(post.id);
      setPost(restored);
      setNotice({ type: "success", text: "Post restored as a draft." });
    } catch (err) {
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setSaving(null);
    }
  }

  // Ctrl+S / Cmd+S saves (keeps the current status)
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (status !== "trash") saveRef.current(status === "published" ? "published" : "draft");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  // Warn before closing the tab with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const busy = saving !== null;
  const spinner = (action) => saving === action && <LoaderCircle className={styles.spin} aria-hidden="true" />;

  return (
    <>
      <div className="admin-page-header">
        <h1>{isNew ? "Add New Post" : "Edit Post"}</h1>
        {!isNew && (
          <Link href="/admin/posts/new" className="admin-btn admin-btn--secondary">
            Add New Post
          </Link>
        )}
      </div>

      {notice && (
        <Notice type={notice.type} onDismiss={() => setNotice(null)}>
          {notice.text}{" "}
          {notice.type === "success" && post?.status === "published" && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
              View post
            </a>
          )}
        </Notice>
      )}

      {status === "trash" && (
        <Notice type="warning">This post is in the Trash. Restore it to edit or publish it again.</Notice>
      )}

      <div className={styles.layout}>
        {/* ---------- Main column ---------- */}
        <div className={styles.main}>
          <label htmlFor="post-title" className="visually-hidden">
            Title
          </label>
          <input
            ref={titleRef}
            id="post-title"
            className={styles.title}
            value={form.title}
            onChange={onTitleChange}
            placeholder="Add title"
            maxLength={255}
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={errors.title ? "post-title-error" : undefined}
            disabled={status === "trash"}
          />
          {errors.title && (
            <p id="post-title-error" className={styles.fieldError}>
              {errors.title}
            </p>
          )}

          <div className={styles.slugRow}>
            <label htmlFor="post-slug">Link:</label>
            <span className={styles.slugPrefix}>/blog/</span>
            <input
              id="post-slug"
              className={styles.slugInput}
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true);
                update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              onBlur={() => update("slug", slugify(form.slug || form.title))}
              placeholder="post-link"
              disabled={status === "trash"}
            />
          </div>
          {errors.slug && <p className={styles.fieldError}>{errors.slug}</p>}

          <span id="post-content-label" className="visually-hidden">
            Post content
          </span>
          <RichTextEditor
            id="post-content"
            labelledBy="post-content-label"
            value={form.content}
            onChange={(html) => update("content", html)}
          />

          <div className={styles.box}>
            <label htmlFor="post-excerpt" className={styles.boxTitle}>
              Excerpt
            </label>
            <textarea
              id="post-excerpt"
              className={styles.textarea}
              rows={3}
              maxLength={1000}
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              disabled={status === "trash"}
            />
            <p className={styles.help}>Optional short summary shown in the blog list and in search results.</p>
          </div>
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className={styles.sidebar} aria-label="Post settings">
          <section className={styles.box}>
            <h2 className={styles.boxTitle}>Publish</h2>
            <dl className={styles.meta}>
              <div>
                <dt>Status:</dt>
                <dd>{isNew ? "Not saved yet" : status === "published" ? "Published" : status === "trash" ? "In Trash" : "Draft"}</dd>
              </div>
              {post?.published_at && (
                <div>
                  <dt>Published on:</dt>
                  <dd>{formatDate(post.published_at)}</dd>
                </div>
              )}
              {post && (
                <div>
                  <dt>Author:</dt>
                  <dd>{post.author_name || "—"}</dd>
                </div>
              )}
            </dl>

            {dirty && status !== "trash" && <p className={styles.unsaved}>You have unsaved changes.</p>}

            <div className={styles.actions}>
              {status === "trash" ? (
                <button type="button" className="admin-btn admin-btn--primary" onClick={restore} disabled={busy}>
                  {spinner("restore")} Restore
                </button>
              ) : status === "published" ? (
                <>
                  <button
                    type="button"
                    className="admin-link"
                    onClick={() => save("draft")}
                    disabled={busy}
                    title="Hide this post from the website"
                  >
                    Switch to draft
                  </button>
                  <button type="button" className="admin-btn admin-btn--primary" onClick={() => save("published")} disabled={busy}>
                    {spinner("published")} Update
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="admin-btn admin-btn--secondary" onClick={() => save("draft")} disabled={busy}>
                    {spinner("draft")} Save Draft
                  </button>
                  <button type="button" className="admin-btn admin-btn--primary" onClick={() => save("published")} disabled={busy}>
                    {spinner("published")} Publish
                  </button>
                </>
              )}
            </div>

            {post && status !== "trash" && (
              <div className={styles.boxFooter}>
                <button type="button" className="admin-link admin-link--danger" onClick={moveToTrash} disabled={busy}>
                  Move to Trash
                </button>
                {status === "published" && (
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
                    View post <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
            <p className={styles.help}>Tip: press Ctrl+S to save.</p>
          </section>

          <section className={styles.box}>
            <h2 className={styles.boxTitle}>Categories</h2>
            {categories.length === 0 ? (
              <p className={styles.help}>No categories yet.</p>
            ) : (
              <ul className={styles.categoryList}>
                {flattenTree(categories).map((cat) => (
                  <li key={cat.id} style={{ paddingLeft: cat.depth * 20 }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={form.categories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        disabled={status === "trash"}
                      />
                      {cat.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/admin/categories" className={styles.manageLink}>
              Manage categories
            </Link>
          </section>

          <section className={styles.box}>
            <h2 className={styles.boxTitle}>Featured image</h2>
            <FeaturedImage value={form.featured_image} onChange={(url) => update("featured_image", url)} />
            {errors.featured_image && <p className={styles.fieldError}>{errors.featured_image}</p>}
          </section>
        </aside>
      </div>
    </>
  );
}
