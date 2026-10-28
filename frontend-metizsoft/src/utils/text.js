// Plain text from post HTML (for descriptions and reading time)
export const stripHtml = (html = "") =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

// Shortens text at a word boundary: "Lorem ipsum dolor…"
export function truncate(text = "", max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : max)}…`;
}

// About 200 words per minute, minimum 1 minute
export const readingTime = (html) => Math.max(1, Math.round(stripHtml(html).split(" ").filter(Boolean).length / 200));
