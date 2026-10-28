import { api } from "@/lib/api";

const json = (data) => JSON.stringify(data);

// Admin: manage users
export const createUser = (data) => api("/users", { method: "POST", body: json(data) });
export const updateUser = (id, data) => api(`/users/${id}`, { method: "PUT", body: json(data) });
export const deleteUser = (id, reassignTo) =>
  api(`/users/${id}${reassignTo ? `?reassign=${reassignTo}` : ""}`, { method: "DELETE" });

// Anyone logged in: their own profile
export const updateProfile = (data) => api("/auth/me", { method: "PUT", body: json(data) });
export const changePassword = (currentPassword, newPassword) =>
  api("/auth/password", { method: "PUT", body: json({ currentPassword, newPassword }) });
