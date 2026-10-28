import Link from "next/link";
import { UserPlus } from "lucide-react";
import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import Notice from "@/components/admin/Notice";
import UsersTable from "@/components/admin/users/UsersTable";
import { ROLES } from "@/constants/roles";

export const metadata = { title: "Users" };

export default async function AdminUsersPage({ searchParams }) {
  const me = await requireAdminUser();
  if (me.role !== "admin") {
    return (
      <>
        <h1>Users</h1>
        <Notice type="error">Only administrators can manage users. You can edit your own details on the Profile page.</Notice>
      </>
    );
  }

  const params = await searchParams;
  const role = ROLES.some((r) => r.value === params.role) ? params.role : "";
  const search = typeof params.search === "string" ? params.search : "";

  const query = new URLSearchParams();
  if (role) query.set("role", role);
  if (search) query.set("search", search);
  const data = await serverApi(`/users?${query}`);

  return (
    <>
      <div className="admin-page-header">
        <h1>Users</h1>
        <Link href="/admin/users/new" className="admin-btn admin-btn--secondary">
          <UserPlus aria-hidden="true" /> Add New User
        </Link>
      </div>
      <UsersTable
        key={`${role}|${search}`}
        data={data}
        role={role}
        search={search}
        currentUserId={me.id}
        deletedName={typeof params.deleted === "string" ? params.deleted : null}
      />
    </>
  );
}
