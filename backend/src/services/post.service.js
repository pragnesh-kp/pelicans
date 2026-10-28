import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { validatePost, POST_STATUSES } from "../validators/post.validator.js";

const PAGE_SIZE = 20;

// Admins and editors manage every post; authors only their own
function assertCanEdit(user, post) {
  if (user.role === "admin" || user.role === "editor") return;
  if (user.role === "author" && post.author_id === user.id) return;
  throw new ApiError(403, "You can only edit your own posts.");
}

// Makes the slug unique by adding -2, -3, ... if needed
async function uniqueSlug(slug, excludeId) {
  let candidate = slug;
  for (let n = 2; await Post.slugTaken(candidate, excludeId); n++) {
    candidate = `${slug.slice(0, 195)}-${n}`;
  }
  return candidate;
}

const toPositiveInt = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  return Number.isInteger(n) && n > 0 ? n : fallback;
};

// ---------- Public ----------
export async function listPublished(query) {
  const page = toPositiveInt(query.page, 1);
  const limit = Math.min(toPositiveInt(query.limit, 10), 50);
  const { posts, total } = await Post.listPublished({ page, limit });
  return { posts, total, page, pages: Math.max(1, Math.ceil(total / limit)) };
}

export async function getPublishedBySlug(slug) {
  const post = await Post.findPublishedBySlug(slug);
  if (!post) throw new ApiError(404, "Post not found");
  return post;
}

// ---------- Admin ----------
export async function listAdmin(query) {
  const status = ["all", ...POST_STATUSES].includes(query.status) ? query.status : "all";
  const search = typeof query.search === "string" ? query.search.trim().slice(0, 100) : "";
  const page = toPositiveInt(query.page, 1);

  const [{ posts, total }, counts] = await Promise.all([
    Post.listAdmin({ status, search, page, limit: PAGE_SIZE }),
    Post.countByStatus(),
  ]);
  return { posts, total, page, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)), counts };
}

export async function getForEdit(id, user) {
  const post = await Post.findById(id);
  if (!post) throw new ApiError(404, "Post not found");
  assertCanEdit(user, post);
  return post;
}

export async function create(body, user) {
  const { data, categoryIds } = validatePost(body);
  data.slug = await uniqueSlug(data.slug);
  data.author_id = user.id;
  if (data.status === "published") data.published_at = new Date();
  return Post.create(data, categoryIds);
}

export async function update(id, body, user) {
  const existing = await getForEdit(id, user);
  const { data, categoryIds } = validatePost(body, { partial: true });

  if (data.slug) data.slug = await uniqueSlug(data.slug, existing.id);
  // First time it is published: remember the date
  if (data.status === "published" && !existing.published_at) data.published_at = new Date();

  return Post.update(existing.id, data, categoryIds);
}

// Permanent delete — only allowed from the Trash, so nothing is lost by one click
export async function remove(id, user) {
  const existing = await getForEdit(id, user);
  if (existing.status !== "trash") throw new ApiError(400, "Move the post to the Trash before deleting it permanently.");
  await Post.remove(existing.id);
}
