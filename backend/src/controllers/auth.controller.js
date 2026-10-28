import * as authService from "../services/auth.service.js";
import { User } from "../models/user.model.js";
import { config } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

const cookieOptions = {
  httpOnly: true,
  secure: config.env === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function login(req, res) {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const { token, user } = await authService.login(email.trim().toLowerCase(), password);
  res.cookie("token", token, cookieOptions).json({ user });
}

export function logout(req, res) {
  res.clearCookie("token", cookieOptions).json({ message: "Logged out" });
}

export async function me(req, res) {
  const user = await User.findById(req.user.id);
  // The account may have been deleted after the token was issued
  if (!user) throw new ApiError(401, "Not logged in");
  res.json(user);
}

// Your Profile: name + email
export async function updateMe(req, res) {
  res.json(await authService.updateProfile(req.user.id, req.body));
}

// Your Profile: change password (logs out your other devices, keeps this one)
export async function changePassword(req, res) {
  const token = await authService.changeOwnPassword(req.user, req.body);
  res.cookie("token", token, cookieOptions).json({ message: "Password changed. Other devices have been logged out." });
}
