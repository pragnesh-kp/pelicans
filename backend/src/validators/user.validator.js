import { ApiError } from "../utils/ApiError.js";
import { ROLES } from "../models/user.model.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v) => (typeof v === "string" ? v.trim() : "");

export function fieldErrors(errors, message = "Please fix the highlighted fields.") {
  const err = new ApiError(400, message);
  err.errors = errors;
  return err;
}

// Returns an error message, or null if the password is acceptable.
// (bcrypt only uses the first 72 bytes, so longer passwords are refused rather than silently cut.)
export function passwordProblem(password, email = "") {
  if (typeof password !== "string" || password.length < 8) return "Use at least 8 characters.";
  if (Buffer.byteLength(password, "utf8") > 72) return "Use 72 characters or fewer.";
  if (/^\s|\s$/.test(password)) return "Remove spaces from the start or end.";
  if (email && password.toLowerCase() === email.toLowerCase()) return "Don't use your email address as the password.";
  return null;
}

/**
 * Checks user details. Only the fields listed in `fields` are read.
 * Returns the cleaned values.
 */
export function validateUser(body = {}, fields = ["name", "email", "role", "password"]) {
  const errors = {};
  const data = {};

  if (fields.includes("name")) {
    data.name = str(body.name).replace(/\s+/g, " ");
    if (data.name.length < 2) errors.name = "Please enter a name.";
    else if (data.name.length > 100) errors.name = "Name must be 100 characters or fewer.";
  }

  if (fields.includes("email")) {
    data.email = str(body.email).toLowerCase();
    if (!EMAIL_RE.test(data.email) || data.email.length > 150) errors.email = "Please enter a valid email address.";
  }

  if (fields.includes("role")) {
    data.role = body.role;
    if (!ROLES.includes(data.role)) errors.role = "Please choose a role.";
  }

  if (fields.includes("password")) {
    const problem = passwordProblem(body.password, data.email || body.email);
    if (problem) errors.password = problem;
    else data.password = body.password;
  }

  if (Object.keys(errors).length) throw fieldErrors(errors);
  return data;
}
