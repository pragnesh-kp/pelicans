// Uploaded files are served by the backend (e.g. "/uploads/123.jpg").
// These helpers turn them into full URLs the browser can load, and back.
const API_ORIGIN = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").origin;

export const mediaUrl = (path) => (path?.startsWith("/uploads/") ? `${API_ORIGIN}${path}` : path || "");

// Post HTML stores uploaded images as src="/uploads/..." so it keeps working if the
// backend's address changes. Expand them for display…
export const expandMediaUrls = (html = "") => html.replaceAll('src="/uploads/', `src="${API_ORIGIN}/uploads/`);

// …and shorten them again before saving.
export const shortenMediaUrls = (html = "") => html.replaceAll(`src="${API_ORIGIN}/uploads/`, 'src="/uploads/');
