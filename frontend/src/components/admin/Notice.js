"use client";

import { X } from "lucide-react";

// WordPress-style message bar: type = success | error | warning
export default function Notice({ type = "success", children, onDismiss }) {
  return (
    <div
      className={`admin-notice ${type !== "success" ? `admin-notice--${type}` : ""}`}
      role={type === "error" ? "alert" : "status"}
    >
      <p>{children}</p>
      {onDismiss && (
        <button type="button" className="admin-notice-dismiss" onClick={onDismiss} aria-label="Dismiss this notice">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
