// Server-side data for the public website (published content only).
// Results are cached for 60 seconds, so a post you publish or edit
// shows up on the website within about a minute.
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE_SECONDS = 60;
// Give up on a slow or unreachable backend instead of hanging the page
// (and the build, which stops any page that takes over 60 seconds).
const TIMEOUT_MS = 8000;

async function get(path) {
  if (!API_URL) throw new Error("API_URL / NEXT_PUBLIC_API_URL is not set");

  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`API request timed out for ${path}`)), TIMEOUT_MS);
  });
  try {
    const res = await Promise.race([
      fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE_SECONDS } }),
      timeout,
    ]);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API request failed (${res.status}) for ${path}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const getPublishedPosts = ({ page = 1, limit = 9 } = {}) => get(`/posts?page=${page}&limit=${limit}`);

export const getPublishedPost = (slug) => get(`/posts/slug/${encodeURIComponent(slug)}`);
