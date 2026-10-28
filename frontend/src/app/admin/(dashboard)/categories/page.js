import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import CategoriesManager from "@/components/admin/categories/CategoriesManager";

export const metadata = { title: "Categories" };

export default async function AdminCategoriesPage() {
  const user = await requireAdminUser();
  const categories = await serverApi("/categories");

  // Authors can see categories but not change them (same as WordPress)
  const canManage = user.role === "admin" || user.role === "editor";

  return (
    <>
      <div className="admin-page-header">
        <h1>Categories</h1>
      </div>
      <CategoriesManager categories={categories} canManage={canManage} />
    </>
  );
}
