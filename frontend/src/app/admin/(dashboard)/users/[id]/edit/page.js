import { notFound, redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import Notice from "@/components/admin/Notice";
import UserForm from "@/components/admin/users/UserForm";

export const metadata = { title: "Edit User" };

export default async function EditUserPage({ params, searchParams }) {
  const me = await requireAdminUser();
  if (me.role !== "admin") {
    return (
      <>
        <h1>Edit User</h1>
        <Notice type="error">Only administrators can edit other users.</Notice>
      </>
    );
  }

  const { id } = await params;
  const { created } = await searchParams;
  if (!/^\d+$/.test(id)) notFound();
  // Your own account is edited on the Profile page (role and password rules differ)
  if (Number(id) === me.id) redirect("/admin/profile");

  let user;
  try {
    user = await serverApi(`/users/${id}`);
  } catch (err) {
    if (err.status === 404) notFound();
    throw err;
  }

  // Everyone else, for "give their posts to…" when deleting
  const { users } = await serverApi("/users");
  const otherUsers = users.filter((u) => u.id !== user.id && u.role !== "subscriber").map(({ id: uid, name }) => ({ id: uid, name }));

  return <UserForm key={user.id} user={user} otherUsers={otherUsers} created={created === "1"} />;
}
