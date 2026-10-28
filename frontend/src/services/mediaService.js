import { api } from "@/lib/api";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // must match the backend limit
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function uploadMedia(file) {
  const form = new FormData();
  form.append("file", file);
  return api("/media", { method: "POST", body: form });
}
