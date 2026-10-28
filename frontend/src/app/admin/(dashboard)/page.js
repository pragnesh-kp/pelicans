import { requireAdminUser } from "@/lib/session";
import { formatDate } from "@/utils/formatDate";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireAdminUser();

  return (
    <>
      <h1>Dashboard</h1>
      <div className="admin-card">
        <h2>Welcome, {user.name}!</h2>
        <p>
          Logged in as <strong>{user.email}</strong> ({user.role})
        </p>
        <p>Member since {formatDate(user.created_at)}</p>
      </div>
    </>
  );
}
