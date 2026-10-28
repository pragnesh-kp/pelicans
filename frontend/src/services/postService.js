import { api } from "@/lib/api";

const json = (data) => JSON.stringify(data);

// Public website (published posts only)
export const getPublishedPosts = (page = 1) => api(`/posts?page=${page}`);
export const getPostBySlug = (slug) => api(`/posts/slug/${encodeURIComponent(slug)}`);

// Admin panel
export const createPost = (data) => api("/posts", { method: "POST", body: json(data) });
export const updatePost = (id, data) => api(`/posts/${id}`, { method: "PUT", body: json(data) });
export const trashPost = (id) => updatePost(id, { status: "trash" });
export const restorePost = (id, status = "draft") => updatePost(id, { status });
// Permanent — only works for posts already in the Trash
export const deletePost = (id) => api(`/posts/${id}`, { method: "DELETE" });
