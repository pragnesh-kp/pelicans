import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import { UserProvider } from "@/context/UserContext";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

// Unread contact messages for the sidebar badge (admins and editors only)
async function getBadges(user) {
  if (user.role !== "admin" && user.role !== "editor") return {};
  try {
    const counts = await serverApi("/contact/counts");
    return { "/admin/messages": counts.unread };
  } catch {
    return {}; // the badge is optional; never block the admin panel
  }
}

export default async function AdminLayout({ children }) {
  const user = await requireAdminUser();
  const badges = await getBadges(user);

  return (
    <UserProvider user={user}>
      <div className="admin-shell">
        <Topbar />
        <div className="admin-body">
          <Sidebar badges={badges} />
          <main className="admin-main">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
