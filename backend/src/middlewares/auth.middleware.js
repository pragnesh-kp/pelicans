import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

/**
 * Checks the login token (cookie or Authorization header), then confirms
 * with the database that the account still exists and the session is still valid.
 * So deleting a user, changing their role or resetting their password
 * takes effect immediately — not when the token expires.
 */
export async function protect(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Not logged in");

  let payload;
  try {
    payload = jwt.verify(token, config.jwt.secret);
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findAuthState(payload.id);
  if (!user || (payload.tv ?? 0) !== user.token_version) {
    throw new ApiError(401, "Your session has ended. Please log in again.");
  }

  // Role comes from the database, never from the token
  req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
  next();
}

// Usage: authorize("admin", "editor")
export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) throw new ApiError(403, "Not allowed");
  next();
};
