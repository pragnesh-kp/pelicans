import { requireAdminUser } from "@/lib/session";
import Notice from "@/components/admin/Notice";
import UserForm from "@/components/admin/users/UserForm";

export const metadata = { title: "Add New User" };

export default async function NewUserPage() {
  const me = await requireAdminUser();
  if (me.role !== "admin") {
    return (
      <>
        <h1>Add New User</h1>
        <Notice type="error">Only administrators can add users.</Notice>
      </>
    );
  }
  return <UserForm user={null} />;
}
