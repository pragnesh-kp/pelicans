import { api } from "@/lib/api";

export const sendContactMessage = (data) => api("/contact", { method: "POST", body: JSON.stringify(data) });
