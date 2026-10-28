import { api } from "@/lib/api";

const json = (data) => JSON.stringify(data);

export const getCategories = () => api("/categories");
export const createCategory = (data) => api("/categories", { method: "POST", body: json(data) });
export const updateCategory = (id, data) => api(`/categories/${id}`, { method: "PUT", body: json(data) });
export const deleteCategory = (id) => api(`/categories/${id}`, { method: "DELETE" });
