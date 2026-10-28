import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";

const str = (v) => (typeof v === "string" ? v.trim() : "");

// Checks and cleans category data from the admin form
export function validateCategory(body = {}) {
  const errors = {};

  const name = str(body.name);
  if (!name) errors.name = "Please enter a name.";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  const slug = slugify(str(body.slug) || name).slice(0, 120);
  if (name && !slug) errors.slug = "Please use letters or numbers in the name or slug.";

  const description = str(body.description).slice(0, 1000) || null;

  let parent_id = null;
  if (body.parent_id !== undefined && body.parent_id !== null && body.parent_id !== "") {
    parent_id = Number(body.parent_id);
    if (!Number.isInteger(parent_id) || parent_id < 1) errors.parent_id = "Invalid parent category.";
  }

  if (Object.keys(errors).length) {
    const err = new ApiError(400, "Please fix the highlighted fields.");
    err.errors = errors;
    throw err;
  }

  return { name, slug, description, parent_id };
}
