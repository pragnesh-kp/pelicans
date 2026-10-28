import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { config } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { validateUser, passwordProblem, fieldErrors } from "../validators/user.validator.js";

const BCRYPT_ROUNDS = 12;

// tv = token version: when it changes in the database, older tokens stop working
const issueToken = (user) =>
  jwt.sign({ id: user.id, tv: user.token_version ?? 0 }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

export const hashPassword = (password) => bcrypt.hash(password, BCRYPT_ROUNDS);

export async function login(email, password) {
  const user = await User.findByEmailWithPassword(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  await User.touchLogin(user.id);
  return { token: issueToken(user), user: await User.findById(user.id) };
}

// Used by the admin Users screen and the seed script
export async function createUser(body) {
  const data = validateUser(body);
  if (await User.emailTaken(data.email)) throw fieldErrors({ email: "A user with this email already exists." });
  return User.create({ ...data, password: await hashPassword(data.password) });
}

// Logged-in user updates their own name/email
export async function updateProfile(userId, body) {
  const data = validateUser(body, ["name", "email"]);
  if (await User.emailTaken(data.email, userId)) throw fieldErrors({ email: "Another user already has this email." });
  return User.update(userId, data);
}

// Logged-in user changes their own password (needs the current one).
// Returns a fresh token so this browser stays logged in while all others are logged out.
export async function changeOwnPassword(user, { currentPassword, newPassword } = {}) {
  const hash = await User.findPasswordHash(user.id);
  if (typeof currentPassword !== "string" || !(await bcrypt.compare(currentPassword, hash))) {
    throw fieldErrors({ currentPassword: "That isn't your current password." }, "Your current password is incorrect.");
  }
  const problem = passwordProblem(newPassword, user.email);
  if (problem) throw fieldErrors({ newPassword: problem });
  if (await bcrypt.compare(newPassword, hash)) {
    throw fieldErrors({ newPassword: "Choose a password different from your current one." });
  }

  await User.setPassword(user.id, await hashPassword(newPassword));
  const fresh = await User.findAuthState(user.id);
  return issueToken(fresh);
}
