// Small fetch wrapper for calling the backend API from the browser
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(path, options = {}) {
  // File uploads (FormData) must let the browser set its own Content-Type
  const isForm = options.body instanceof FormData;

  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: isForm ? options.headers : { "Content-Type": "application/json", ...options.headers },
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.message || "Request failed");
    error.status = res.status;
    error.errors = data?.errors; // per-field messages, e.g. { email: "..." }
    throw error;
  }
  return data;
}

// Turns a "Failed to fetch" network error into a readable message
export const errorMessage = (err) =>
  err?.message === "Failed to fetch" ? "Cannot reach the server. Is the backend running?" : err?.message || "Something went wrong.";
