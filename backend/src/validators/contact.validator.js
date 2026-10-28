import { ApiError } from "../utils/ApiError.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/;

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Returns cleaned data, or throws a 400 error listing what is wrong
export function validateContact(body = {}) {
  const data = {
    // Names are one line: collapse line breaks/tabs/extra spaces
    name: clean(body.name, 100).replace(/\s+/g, " "),
    email: clean(body.email, 150).toLowerCase(),
    phone: clean(body.phone, 30),
    service: clean(body.service, 100),
    message: clean(body.message, 5000),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = "Please enter a valid phone number.";

  if (Object.keys(errors).length) {
    const err = new ApiError(400, "Please check the highlighted fields.");
    err.errors = errors;
    throw err;
  }

  return {
    ...data,
    phone: data.phone || null,
    service: data.service || null,
    message: data.message || null,
  };
}
