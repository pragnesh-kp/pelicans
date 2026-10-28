import { User, ROLES } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { validateUser, passwordProblem, fieldErrors } from "../validators/user.validator.js";
import { createUser, hashPassword } from "./auth.service.js";

async function getOrFail(id) {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  return user;
}

export async function list(query) {
  const role = ROLES.includes(query.role) ? query.role : "";
  const search = typeof query.search === "string" ? query.search.trim().slice(0, 100) : "";
  const [users, counts] = await Promise.all([User.list({ role, search }), User.countsByRole()]);
  return { users, counts };
}

export const get = (id) => getOrFail(id);

export const create = (body) => createUser(body);

/**
 * Admin edits a user: name, email, role and (optionally) a new password.
 * Rules: you can't change your own role, and there must always be an admin.
 */
export async function update(id, body, actingUser) {
  const target = await getOrFail(id);
  const isSelf = target.id === actingUser.id;

  const data = validateUser(body, ["name", "email", "role"]);
  if (await User.emailTaken(data.email, target.id)) throw fieldErrors({ email: "Another user already has this email." });

  if (isSelf && data.role !== target.role) {
    throw fieldErrors({ role: "You can't change your own role." });
  }
  if (target.role === "admin" && data.role !== "admin" && (await User.countAdmins()) <= 1) {
    throw fieldErrors({ role: "This is the only administrator. Make someone else an administrator first." });
  }

  // Optional password reset (leave empty to keep the current password)
  const newPassword = typeof body.password === "string" && body.password !== "" ? body.password : null;
  if (newPassword) {
    if (isSelf) throw fieldErrors({ password: "Change your own password on the Your Profile page." });
    const problem = passwordProblem(newPassword, data.email);
    if (problem) throw fieldErrors({ password: problem });
  }

  const updated = await User.update(target.id, data);
  if (newPassword) await User.setPassword(target.id, await hashPassword(newPassword)); // also logs them out
  return { user: updated, passwordChanged: Boolean(newPassword) };
}

/**
 * Deletes a user. Their posts move to `reassignTo` if given,
 * otherwise they stay on the site without an author.
 */
export async function remove(id, actingUser, reassignTo) {
  const target = await getOrFail(id);
  if (target.id === actingUser.id) throw new ApiError(400, "You can't delete your own account.");
  if (target.role === "admin" && (await User.countAdmins()) <= 1) {
    throw new ApiError(400, "You can't delete the only administrator.");
  }

  let reassignId = null;
  if (reassignTo !== undefined && reassignTo !== null && reassignTo !== "") {
    reassignId = Number(reassignTo);
    if (!Number.isInteger(reassignId) || reassignId === target.id || !(await User.findById(reassignId))) {
      throw new ApiError(400, "Choose a valid user to receive the posts.");
    }
  }

  await User.remove(target.id, reassignId);
}
