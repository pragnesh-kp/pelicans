"use client";

// Shown inside the admin panel when a page fails to load (e.g. backend is down)
export default function AdminError({ reset }) {
  return (
    <>
      <h1>Something went wrong</h1>
      <div className="admin-notice admin-notice--error" role="alert">
        <p>This page could not be loaded. Check that the backend server is running, then try again.</p>
      </div>
      <button type="button" className="admin-btn admin-btn--primary" onClick={reset}>
        Try again
      </button>
    </>
  );
}
