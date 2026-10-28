"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, LoaderCircle } from "lucide-react";
import Notice from "@/components/admin/Notice";
import { createCategory, updateCategory, deleteCategory } from "@/services/categoryService";
import { errorMessage } from "@/lib/api";
import { flattenTree, withDescendants } from "@/utils/categoryTree";
import { slugify } from "@/utils/slugify";
import styles from "./CategoriesManager.module.css";

const EMPTY = { name: "", slug: "", parent_id: "", description: "" };

const toForm = (cat) => ({
  name: cat.name,
  slug: cat.slug,
  parent_id: cat.parent_id ? String(cat.parent_id) : "",
  description: cat.description || "",
});

export default function CategoriesManager({ categories, canManage }) {
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const [editing, setEditing] = useState(null); // category being edited, or null = adding
  const [form, setForm] = useState(EMPTY);
  const [slugEdited, setSlugEdited] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [notice, setNotice] = useState(null);
  const [search, setSearch] = useState("");
  const nameRef = useRef(null);
  const formRef = useRef(null);

  const tree = useMemo(() => flattenTree(categories), [categories]);
  const childCount = useMemo(() => {
    const counts = new Map();
    for (const c of categories) if (c.parent_id) counts.set(c.parent_id, (counts.get(c.parent_id) || 0) + 1);
    return counts;
  }, [categories]);

  const query = search.trim().toLowerCase();
  const rows = query ? tree.filter((c) => c.name.toLowerCase().includes(query) || c.slug.includes(query)) : tree;

  // When editing, a category can't move inside itself or its own sub-categories
  const blockedParents = editing ? withDescendants(categories, editing.id) : new Set();

  const refresh = () => startTransition(() => router.refresh());

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function onNameChange(e) {
    const name = e.target.value;
    setForm((f) => ({ ...f, name, slug: slugEdited ? f.slug : slugify(name) }));
    if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
  }

  function startEdit(cat) {
    setEditing(cat);
    setForm(toForm(cat));
    setSlugEdited(true);
    setErrors({});
    setNotice(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 50);
  }

  function resetForm() {
    setEditing(null);
    setForm(EMPTY);
    setSlugEdited(false);
    setErrors({});
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrors({ name: "Please enter a name." });
      nameRef.current?.focus();
      return;
    }

    setSaving(true);
    setNotice(null);
    const payload = { ...form, parent_id: form.parent_id ? Number(form.parent_id) : null };
    try {
      if (editing) {
        const saved = await updateCategory(editing.id, payload);
        setNotice({ type: "success", text: `Category “${saved.name}” updated.` });
      } else {
        const saved = await createCategory(payload);
        setNotice({ type: "success", text: `Category “${saved.name}” added.` });
      }
      resetForm();
      refresh();
      nameRef.current?.focus();
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(cat) {
    const parts = [`Delete the category “${cat.name}”?`];
    if (cat.post_count > 0) parts.push(`It will be removed from ${cat.post_count} published post(s) — the posts themselves are kept.`);
    if (childCount.get(cat.id)) parts.push(`Its ${childCount.get(cat.id)} sub-categor${childCount.get(cat.id) === 1 ? "y" : "ies"} will move up a level.`);
    parts.push("This cannot be undone.");
    if (!window.confirm(parts.join("\n\n"))) return;

    setBusyId(cat.id);
    setNotice(null);
    try {
      await deleteCategory(cat.id);
      if (editing?.id === cat.id) resetForm();
      setNotice({ type: "success", text: `Category “${cat.name}” deleted.` });
      refresh();
    } catch (err) {
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      {notice && (
        <Notice type={notice.type} onDismiss={() => setNotice(null)}>
          {notice.text}
        </Notice>
      )}
      {!canManage && (
        <Notice type="warning">Only administrators and editors can add or change categories.</Notice>
      )}

      <div className={`${styles.layout} ${canManage ? "" : styles.single}`}>
        {/* ---------- Add / edit form ---------- */}
        {canManage && (
          <section ref={formRef} className={styles.formPanel} aria-labelledby="category-form-title">
            <h2 id="category-form-title" className={styles.formTitle}>
              {editing ? `Edit “${editing.name}”` : "Add New Category"}
            </h2>

            <form onSubmit={onSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="cat-name">Name</label>
                <input
                  ref={nameRef}
                  id="cat-name"
                  value={form.name}
                  onChange={onNameChange}
                  maxLength={100}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby="cat-name-help"
                />
                {errors.name ? (
                  <p id="cat-name-help" className={styles.error}>
                    {errors.name}
                  </p>
                ) : (
                  <p id="cat-name-help" className={styles.help}>
                    How the category appears on your website.
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="cat-slug">Slug</label>
                <input
                  id="cat-slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  onBlur={() => update("slug", slugify(form.slug || form.name))}
                  maxLength={120}
                  aria-invalid={errors.slug ? true : undefined}
                  aria-describedby="cat-slug-help"
                />
                {errors.slug ? (
                  <p id="cat-slug-help" className={styles.error}>
                    {errors.slug}
                  </p>
                ) : (
                  <p id="cat-slug-help" className={styles.help}>
                    The web-address version of the name: lowercase letters, numbers and hyphens.
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="cat-parent">Parent category</label>
                <select
                  id="cat-parent"
                  value={form.parent_id}
                  onChange={(e) => update("parent_id", e.target.value)}
                  aria-invalid={errors.parent_id ? true : undefined}
                  aria-describedby="cat-parent-help"
                >
                  <option value="">None (top level)</option>
                  {tree
                    .filter((c) => !blockedParents.has(c.id))
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {"   ".repeat(c.depth)}
                        {c.name}
                      </option>
                    ))}
                </select>
                {errors.parent_id ? (
                  <p id="cat-parent-help" className={styles.error}>
                    {errors.parent_id}
                  </p>
                ) : (
                  <p id="cat-parent-help" className={styles.help}>
                    Optional. Put this inside another category, e.g. “Next.js” inside “Web Development”.
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="cat-description">Description</label>
                <textarea
                  id="cat-description"
                  rows={4}
                  maxLength={1000}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  aria-describedby="cat-description-help"
                />
                <p id="cat-description-help" className={styles.help}>
                  Optional short summary of what this category covers.
                </p>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                  {saving && <LoaderCircle className={styles.spin} aria-hidden="true" />}
                  {editing ? "Update Category" : "Add New Category"}
                </button>
                {editing && (
                  <button type="button" className="admin-link" onClick={resetForm} disabled={saving}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

        {/* ---------- Table ---------- */}
        <section className={styles.listPanel} aria-label="All categories" aria-busy={isRefreshing}>
          <div className={styles.toolbar}>
            <span className={styles.total}>
              {categories.length} {categories.length === 1 ? "category" : "categories"}
            </span>
            <div className={styles.search}>
              <label htmlFor="cat-search" className="visually-hidden">
                Search categories
              </label>
              <Search size={16} aria-hidden="true" />
              <input
                id="cat-search"
                type="search"
                placeholder="Search categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" className={styles.colDescription}>Description</th>
                <th scope="col" className={styles.colSlug}>Slug</th>
                <th scope="col" className={styles.colCount} title="Published posts">
                  Posts
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.empty}>
                    {query
                      ? "No categories match your search."
                      : canManage
                        ? "No categories yet. Add your first one with the form."
                        : "No categories yet."}
                  </td>
                </tr>
              )}

              {rows.map((cat) => (
                <tr
                  key={cat.id}
                  className={`${editing?.id === cat.id ? styles.editingRow : ""} ${busyId === cat.id ? styles.busyRow : ""}`}
                >
                  <td>
                    <strong className={styles.name}>
                      {cat.depth > 0 && (
                        <span className={styles.nest} aria-hidden="true">
                          {"— ".repeat(cat.depth)}
                        </span>
                      )}
                      {canManage ? (
                        <button type="button" className={styles.nameButton} onClick={() => startEdit(cat)}>
                          {cat.name}
                        </button>
                      ) : (
                        cat.name
                      )}
                    </strong>
                    {cat.depth > 0 && (
                      <span className="visually-hidden">
                        {" "}
                        (sub-category of {categories.find((c) => c.id === cat.parent_id)?.name})
                      </span>
                    )}
                    <span className={styles.mobileMeta}>
                      /{cat.slug} · {cat.post_count} {cat.post_count === 1 ? "post" : "posts"}
                    </span>

                    {canManage && (
                      <div className={styles.rowActions}>
                        <button type="button" className="admin-link" onClick={() => startEdit(cat)} disabled={busyId === cat.id}>
                          Edit
                        </button>
                        <span aria-hidden="true">|</span>
                        <button
                          type="button"
                          className="admin-link admin-link--danger"
                          onClick={() => onDelete(cat)}
                          disabled={busyId === cat.id}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                  <td className={styles.colDescription}>{cat.description || <span className={styles.muted}>—</span>}</td>
                  <td className={styles.colSlug}>{cat.slug}</td>
                  <td className={styles.colCount}>{cat.post_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length > 0 && (
            <p className={styles.note}>
              Deleting a category doesn&apos;t delete its posts — they simply lose that category.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
