import { api } from "@/lib/api";

export const getPages = () => api("/pages");
export const getPageBySlug = (slug) => api(`/pages/slug/${slug}`);
