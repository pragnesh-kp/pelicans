// Server-side data for the public website (published content only).
// Results are cached for 60 seconds, so a post you publish or edit
// shows up on the website within about a minute.
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE_SECONDS = 60;

async function get(path) {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API request failed (${res.status}) for ${path}`);
  return res.json();
}

export const getPublishedPosts = ({ page = 1, limit = 9 } = {}) => get(`/posts?page=${page}&limit=${limit}`);

export const getPublishedPost = (slug) => get(`/posts/slug/${encodeURIComponent(slug)}`);
