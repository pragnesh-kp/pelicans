import { api } from "@/lib/api";

// status: "new" (unread) | "read" | "archived"
export const setMessageStatus = (id, status) =>
  api(`/contact/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });

export const deleteMessage = (id) => api(`/contact/${id}`, { method: "DELETE" });
