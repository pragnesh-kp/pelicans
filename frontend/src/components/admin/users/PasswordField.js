"use client";

import { useState } from "react";
import { Eye, EyeOff, Wand2 } from "lucide-react";
import styles from "./UserForm.module.css";

// No look-alike characters (0/O, 1/l/I) so generated passwords are easy to read out
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*-_=+?";
const COMMON = ["password", "12345678", "123456789", "qwerty123", "11111111", "iloveyou", "admin123", "welcome1"];

// Strong random password using the browser's secure random generator (no modulo bias)
export function generatePassword(length = 16) {
  const out = [];
  const max = 256 - (256 % CHARSET.length);
  while (out.length < length) {
    const bytes = crypto.getRandomValues(new Uint8Array(length * 2));
    for (const b of bytes) {
      if (b < max && out.length < length) out.push(CHARSET[b % CHARSET.length]);
    }
  }
  return out.join("");
}

// 0 = too short … 4 = strong
export function passwordStrength(pw = "") {
  if (pw.length < 8) return 0;
  if (COMMON.includes(pw.toLowerCase()) || /^(.)\1+$/.test(pw)) return 1;
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(pw)).length;
  let score = 1;
  if (pw.length >= 12) score++;
  if (kinds >= 3) score++;
  if (pw.length >= 16 && kinds >= 3) score++;
  return Math.min(score, 4);
}

const LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];

// hideHelp: no strength meter or hint (e.g. "current password")
// onGenerated: called with the new password after "Generate"
export default function PasswordField({
  id,
  value,
  onChange,
  error,
  autoComplete = "new-password",
  generate = true,
  hideHelp = false,
  onGenerated,
  describedBy,
}) {
  const [visible, setVisible] = useState(false);
  const strength = passwordStrength(value);
  const helpId = `${id}-help`;

  function onGenerate() {
    const pw = generatePassword();
    onChange(pw);
    onGenerated?.(pw);
    setVisible(true); // so it can be copied and shared
  }

  return (
    <div>
      <div className={styles.passwordRow}>
        <div className={styles.passwordInput}>
          <input
            id={id}
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete={autoComplete}
            maxLength={72}
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={[helpId, describedBy].filter(Boolean).join(" ")}
          />
          <button
            type="button"
            className={styles.eye}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {generate && (
          <button type="button" className="admin-btn admin-btn--secondary" onClick={onGenerate}>
            <Wand2 aria-hidden="true" /> Generate
          </button>
        )}
      </div>

      {value && !hideHelp && (
        <div className={styles.strength} data-level={strength} aria-live="polite">
          <span className={styles.strengthBar} aria-hidden="true">
            <span />
          </span>
          <span className={styles.strengthLabel}>Strength: {LABELS[strength]}</span>
        </div>
      )}

      {error ? (
        <p id={helpId} className={styles.error}>
          {error}
        </p>
      ) : hideHelp ? null : (
        <p id={helpId} className={styles.help}>
          At least 8 characters. A mix of upper and lower case letters, numbers and symbols is strongest.
        </p>
      )}
    </div>
  );
}
