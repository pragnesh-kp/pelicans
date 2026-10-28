"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle, KeyRound, Trash2 } from "lucide-react";
import Notice from "@/components/admin/Notice";
import PasswordField from "./PasswordField";
import { createUser, updateUser, deleteUser } from "@/services/userService";
import { errorMessage } from "@/lib/api";
import { ROLES } from "@/constants/roles";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import styles from "./UserForm.module.css";

const toForm = (u) => ({ name: u?.name ?? "", email: u?.email ?? "", role: u?.role ?? "author", password: "" });

// Add New User (user = null) or Edit User
export default function UserForm({ user: initialUser, otherUsers = [], created = false }) {
  const router = useRouter();
  const isNew = !initialUser;
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState(() => toForm(initialUser));
  const [showPassword, setShowPassword] = useState(isNew);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(created ? { type: "success", text: "User created." } : null);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const selectedRole = ROLES.find((r) => r.value === form.role);

  async function onSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Please enter a name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errs.email = "Please enter a valid email address.";
    if ((isNew || form.password) && form.password.length < 8) errs.password = "Use at least 8 characters.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      document.getElementById(`user-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    setSaving(true);
    setNotice(null);
    try {
      if (isNew) {
        const createdUser = await createUser(form);
        router.replace(`/admin/users/${createdUser.id}/edit?created=1`);
        return;
      }
      const res = await updateUser(user.id, form);
      setUser({ ...user, ...res.user });
      setForm(toForm(res.user));
      setShowPassword(false);
      setNotice({
        type: "success",
        text: res.passwordChanged
          ? "User updated. Their password was changed and they've been logged out everywhere."
          : "User updated.",
      });
      router.refresh();
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>{isNew ? "Add New User" : `Edit User: ${user.name}`}</h1>
        {!isNew && (
          <Link href="/admin/users/new" className="admin-btn admin-btn--secondary">
            Add New User
          </Link>
        )}
      </div>

      {notice && (
        <Notice type={notice.type} onDismiss={() => setNotice(null)}>
          {notice.text} {notice.type === "success" && <Link href="/admin/users">← Back to all users</Link>}
        </Notice>
      )}

      <form className={styles.panel} onSubmit={onSubmit} noValidate>
        {!isNew && (
          <p className={styles.meta} style={{ marginTop: 16 }}>
            Joined {formatDate(user.created_at)} ·{" "}
            <span suppressHydrationWarning>
              {user.last_login_at ? `Last login ${formatDateTime(user.last_login_at)}` : "Has never logged in"}
            </span>{" "}
            · {user.post_count} post{user.post_count === 1 ? "" : "s"}
          </p>
        )}

        <div className={styles.row}>
          <label htmlFor="user-name" className={styles.label}>
            Name <span className={styles.required}>(required)</span>
          </label>
          <div className={styles.field}>
            <input
              id="user-name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              maxLength={100}
              autoComplete="off"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "user-name-error" : undefined}
            />
            {errors.name && (
              <p id="user-name-error" className={styles.error}>
                {errors.name}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="user-email" className={styles.label}>
            Email <span className={styles.required}>(required)</span>
          </label>
          <div className={styles.field}>
            <input
              id="user-email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              maxLength={150}
              autoComplete="off"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby="user-email-help"
            />
            {errors.email ? (
              <p id="user-email-help" className={styles.error}>
                {errors.email}
              </p>
            ) : (
              <p id="user-email-help" className={styles.help}>
                Used to log in.
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="user-role" className={styles.label}>
            Role
          </label>
          <div className={styles.field}>
            <select
              id="user-role"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              aria-invalid={errors.role ? true : undefined}
              aria-describedby="user-role-help"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {errors.role ? (
              <p id="user-role-help" className={styles.error}>
                {errors.role}
              </p>
            ) : (
              <p id="user-role-help" className={styles.help}>
                {selectedRole?.description}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="user-password" className={styles.label}>
            {isNew ? (
              <>
                Password <span className={styles.required}>(required)</span>
              </>
            ) : (
              "New password"
            )}
          </label>
          <div className={styles.field}>
            {showPassword ? (
              <>
                <PasswordField
                  id="user-password"
                  value={form.password}
                  onChange={(v) => update("password", v)}
                  error={errors.password}
                />
                {!isNew && (
                  <p className={styles.help}>
                    Saving a new password logs this user out on all their devices.{" "}
                    <button
                      type="button"
                      className="admin-link"
                      onClick={() => {
                        setShowPassword(false);
                        update("password", "");
                      }}
                    >
                      Cancel
                    </button>
                  </p>
                )}
                {isNew && (
                  <p className={styles.help}>Share the password with them securely; they can change it from their Profile.</p>
                )}
              </>
            ) : (
              <button
                type="button"
                className={`admin-btn admin-btn--secondary ${styles.passwordToggle}`}
                onClick={() => setShowPassword(true)}
              >
                <KeyRound aria-hidden="true" /> Set New Password
              </button>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving && <LoaderCircle className={styles.spin} aria-hidden="true" />}
            {isNew ? "Add New User" : "Update User"}
          </button>
          <Link href="/admin/users" className="admin-link">
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && <DeleteUser user={user} otherUsers={otherUsers} />}
    </>
  );
}

function DeleteUser({ user, otherUsers }) {
  const router = useRouter();
  const canReassign = otherUsers.length > 0;
  const [mode, setMode] = useState(user.post_count > 0 && canReassign ? "reassign" : "keep");
  const [reassignTo, setReassignTo] = useState(otherUsers[0]?.id ? String(otherUsers[0].id) : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const hasPosts = user.post_count > 0;

  async function onDelete() {
    const target = otherUsers.find((u) => String(u.id) === reassignTo);
    const postsNote = !hasPosts
      ? ""
      : mode === "reassign" && target
        ? `\n\nTheir ${user.post_count} post(s) will be given to ${target.name}.`
        : `\n\nTheir ${user.post_count} post(s) will stay on the site without an author.`;
    if (!window.confirm(`Permanently delete ${user.name}'s account? They'll be logged out immediately.${postsNote}`)) return;

    setBusy(true);
    setError("");
    try {
      await deleteUser(user.id, hasPosts && mode === "reassign" ? reassignTo : null);
      router.push(`/admin/users?deleted=${encodeURIComponent(user.name)}`);
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  }

  return (
    <section className={`${styles.panel} ${styles.danger}`} aria-labelledby="delete-user-title">
      <h2 id="delete-user-title" className={styles.panelTitle}>
        Delete user
      </h2>
      <p className={styles.panelText}>Permanently removes {user.name}&apos;s account. This can&apos;t be undone.</p>

      {hasPosts && (
        <fieldset className={styles.choices} style={{ border: 0, padding: 0 }}>
          <legend className="visually-hidden">What should happen to their posts?</legend>
          {canReassign && (
          <label>
            <input type="radio" name="delete-mode" checked={mode === "reassign"} onChange={() => setMode("reassign")} />
            Give their {user.post_count} post{user.post_count === 1 ? "" : "s"} to
            <select
              value={reassignTo}
              onChange={(e) => {
                setReassignTo(e.target.value);
                setMode("reassign");
              }}
              aria-label="User who receives the posts"
            >
              {otherUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
          )}
          <label>
            <input type="radio" name="delete-mode" checked={mode === "keep"} onChange={() => setMode("keep")} />
            Keep the posts without an author
          </label>
        </fieldset>
      )}

      {error && <p className={styles.error} role="alert">{error}</p>}

      <button type="button" className="admin-btn admin-btn--danger" onClick={onDelete} disabled={busy} style={{ marginTop: 8 }}>
        {busy ? <LoaderCircle className={styles.spin} aria-hidden="true" /> : <Trash2 aria-hidden="true" />} Delete User
      </button>
    </section>
  );
}
