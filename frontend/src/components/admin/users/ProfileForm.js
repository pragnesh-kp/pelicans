"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import Notice from "@/components/admin/Notice";
import PasswordField from "./PasswordField";
import { updateProfile, changePassword } from "@/services/userService";
import { errorMessage } from "@/lib/api";
import { roleLabel, ROLES } from "@/constants/roles";
import { formatDate } from "@/utils/formatDate";
import styles from "./UserForm.module.css";

export default function ProfileForm({ user }) {
  return (
    <>
      <div className="admin-page-header">
        <h1>Your Profile</h1>
      </div>
      <DetailsForm user={user} />
      <PasswordForm />
    </>
  );
}

function DetailsForm({ user }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const saved = await updateProfile(form);
      setForm({ name: saved.name, email: saved.email });
      setNotice({ type: "success", text: "Profile updated." });
      router.refresh(); // updates the name in the top bar
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className={styles.panel} onSubmit={onSubmit} noValidate aria-labelledby="details-title">
      <h2 id="details-title" className={styles.panelTitle}>
        Your details
      </h2>
      {notice && (
        <Notice type={notice.type} onDismiss={() => setNotice(null)}>
          {notice.text}
        </Notice>
      )}

      <div className={styles.row}>
        <span className={styles.label}>Role</span>
        <div className={styles.field} style={{ paddingTop: 6 }}>
          <span className={`role-badge role-badge--${user.role}`}>{roleLabel(user.role)}</span>
          <p className={styles.help}>
            {ROLES.find((r) => r.value === user.role)?.description} Member since {formatDate(user.created_at)}.
          </p>
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="profile-name" className={styles.label}>
          Name
        </label>
        <div className={styles.field}>
          <input
            id="profile-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={100}
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="profile-email" className={styles.label}>
          Email
        </label>
        <div className={styles.field}>
          <input
            id="profile-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={150}
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby="profile-email-help"
          />
          {errors.email ? (
            <p id="profile-email-help" className={styles.error}>
              {errors.email}
            </p>
          ) : (
            <p id="profile-email-help" className={styles.help}>
              You log in with this email.
            </p>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          {saving && <LoaderCircle className={styles.spin} aria-hidden="true" />} Update Profile
        </button>
      </div>
    </form>
  );
}

function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!current) errs.currentPassword = "Enter your current password.";
    if (next.length < 8) errs.newPassword = "Use at least 8 characters.";
    else if (next !== confirm) errs.confirm = "The two new passwords don't match.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    setNotice(null);
    try {
      const res = await changePassword(current, next);
      setCurrent("");
      setNext("");
      setConfirm("");
      setNotice({ type: "success", text: res.message });
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className={styles.panel} onSubmit={onSubmit} noValidate aria-labelledby="password-title">
      <h2 id="password-title" className={styles.panelTitle}>
        Change password
      </h2>
      <p className={styles.panelText}>
        <ShieldCheck size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px", marginRight: 2 }} /> Changing your password logs you
        out on all other devices. You stay logged in here.
      </p>
      {notice && (
        <Notice type={notice.type} onDismiss={() => setNotice(null)}>
          {notice.text}
        </Notice>
      )}

      {/* Hidden username helps password managers save the right account */}
      <input type="text" name="username" autoComplete="username" hidden readOnly />

      <div className={styles.row}>
        <label htmlFor="current-password" className={styles.label}>
          Current password
        </label>
        <div className={styles.field}>
          <PasswordField
            id="current-password"
            value={current}
            onChange={(v) => {
              setCurrent(v);
              setErrors((e) => ({ ...e, currentPassword: undefined }));
            }}
            error={errors.currentPassword}
            autoComplete="current-password"
            generate={false}
            hideHelp
          />
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="new-password" className={styles.label}>
          New password
        </label>
        <div className={styles.field}>
          <PasswordField
            id="new-password"
            value={next}
            onChange={(v) => {
              setNext(v);
              setErrors((e) => ({ ...e, newPassword: undefined, confirm: undefined }));
            }}
            error={errors.newPassword}
            onGenerated={(pw) => setConfirm(pw)} // generated passwords are shown, so no need to retype
          />
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="confirm-password" className={styles.label}>
          Confirm new password
        </label>
        <div className={styles.field}>
          <input
            id="confirm-password"
            type="password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((er) => ({ ...er, confirm: undefined }));
            }}
            autoComplete="new-password"
            maxLength={72}
            aria-invalid={errors.confirm ? true : undefined}
            aria-describedby={errors.confirm ? "confirm-error" : undefined}
          />
          {errors.confirm && (
            <p id="confirm-error" className={styles.error}>
              {errors.confirm}
            </p>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          {saving && <LoaderCircle className={styles.spin} aria-hidden="true" />} Change Password
        </button>
      </div>
    </form>
  );
}
