import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";
import { sanitizeContent } from "../utils/sanitizeContent.js";

export const POST_STATUSES = ["draft", "published", "trash"];

const str = (v) => (typeof v === "string" ? v.trim() : "");

// Featured image: an uploaded file ("/uploads/...") or a full http(s) URL
const IMAGE_RE = /^(\/uploads\/[\w.-]+|https?:\/\/\S+)$/i;

/**
 * Checks and cleans post data from the admin editor.
 * `partial` = true for updates (only the fields that were sent are checked).
 * Returns { data, categoryIds } where categoryIds is undefined if not sent.
 */
export function validatePost(body = {}, { partial = false } = {}) {
  const errors = {};
  const data = {};
  const has = (key) => !partial || key in body;

  if (has("title")) {
    data.title = str(body.title);
    if (!data.title) errors.title = "Please add a title.";
    else if (data.title.length > 255) errors.title = "Title must be 255 characters or fewer.";
  }

  if ("slug" in body || !partial) {
    // Clean whatever was typed; fall back to the title
    const slug = slugify(str(body.slug) || data.title || "").slice(0, 200);
    if (slug) data.slug = slug;
    else if (!partial) errors.slug = "Please add a title or a link (slug).";
  }

  if (has("content")) data.content = sanitizeContent(typeof body.content === "string" ? body.content : "");

  if (has("excerpt")) {
    data.excerpt = str(body.excerpt).slice(0, 1000) || null;
  }

  if (has("status")) {
    data.status = body.status ?? "draft";
    if (!POST_STATUSES.includes(data.status)) errors.status = "Invalid status.";
  }

  if (has("featured_image")) {
    const img = str(body.featured_image);
    if (img && !IMAGE_RE.test(img)) errors.featured_image = "Invalid image.";
    data.featured_image = img || null;
  }

  let categoryIds;
  if ("categories" in body) {
    if (!Array.isArray(body.categories)) errors.categories = "Categories must be a list.";
    else {
      categoryIds = [...new Set(body.categories.map(Number))].filter((n) => Number.isInteger(n) && n > 0);
    }
  }

  if (Object.keys(errors).length) {
    const err = new ApiError(400, "Please fix the highlighted fields.");
    err.errors = errors;
    throw err;
  }

  return { data, categoryIds };
}
