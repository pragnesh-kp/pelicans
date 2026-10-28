import { api } from "@/lib/api";

export const login = (email, password) =>
  api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const logout = () => api("/auth/logout", { method: "POST" });
export const getMe = () => api("/auth/me");
