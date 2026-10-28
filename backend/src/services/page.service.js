import { Page } from "../models/page.model.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";

// Business logic lives here; controllers stay thin
export const getAll = () => Page.findAll();

export async function getById(id) {
  const item = await Page.findById(id);
  if (!item) throw new ApiError(404, "Not found");
  return item;
}

export async function getBySlug(slug) {
  const item = await Page.findBySlug(slug);
  if (!item) throw new ApiError(404, "Not found");
  return item;
}

export function create(data) {
  const slug = data.slug || slugify(data.title || data.name || "");
  return Page.create({ ...data, slug });
}

export async function update(id, data) {
  await getById(id);
  return Page.update(id, data);
}

export async function remove(id) {
  if (!(await Page.remove(id))) throw new ApiError(404, "Not found");
}
