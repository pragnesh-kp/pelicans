import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { validateCategory } from "../validators/category.validator.js";

const fieldError = (field, message) => {
  const err = new ApiError(400, message);
  err.errors = { [field]: message };
  return err;
};

async function uniqueSlug(slug, excludeId) {
  let candidate = slug;
  for (let n = 2; await Category.slugTaken(candidate, excludeId); n++) {
    candidate = `${slug.slice(0, 115)}-${n}`;
  }
  return candidate;
}

// The parent must exist, and can't be the category itself or one of its own sub-categories
async function checkParent(parentId, selfId) {
  if (!parentId) return;
  if (parentId === selfId) throw fieldError("parent_id", "A category can't be its own parent.");

  let current = parentId;
  for (let depth = 0; current; depth++) {
    const parent = await Category.parentOf(current);
    if (parent === undefined) throw fieldError("parent_id", "That parent category no longer exists.");
    // (only possible when editing — a new category has no sub-categories yet)
    if (selfId && parent === selfId) {
      throw fieldError("parent_id", "A category can't be placed inside its own sub-category.");
    }
    if (depth > 50) break; // safety stop for damaged data
    current = parent;
  }
}

async function checkName(data, excludeId) {
  if (await Category.nameTaken(data.name, data.parent_id, excludeId)) {
    throw fieldError("name", "A category with this name already exists at this level.");
  }
}

export const list = () => Category.findAll();

export async function getBySlug(slug) {
  const category = await Category.findBySlug(slug);
  if (!category) throw new ApiError(404, "Category not found");
  return category;
}

export async function create(body) {
  const data = validateCategory(body);
  await checkParent(data.parent_id, null);
  await checkName(data);
  data.slug = await uniqueSlug(data.slug);
  return Category.create(data);
}

export async function update(id, body) {
  const existing = await Category.findById(id);
  if (!existing) throw new ApiError(404, "Category not found");

  const data = validateCategory(body);
  await checkParent(data.parent_id, existing.id);
  await checkName(data, existing.id);
  data.slug = await uniqueSlug(data.slug, existing.id);
  return Category.update(existing.id, data);
}

export async function remove(id) {
  if (!(await Category.remove(id))) throw new ApiError(404, "Category not found");
}
