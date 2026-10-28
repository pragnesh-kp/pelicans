// Server-side only: reads the login cookie and asks the backend who the user is.
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

// Roles allowed into the admin panel
export const ADMIN_ROLES = ["admin", "editor", "author"];

export const canAccessAdmin = (user) => Boolean(user && ADMIN_ROLES.includes(user.role));

// cache() makes this run once per request, even if several components call it
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Cookie: `token=${token}` },
      cache: "no-store",
    });
    return res.ok ? await res.json() : null;
  } catch {
    // Backend is down or unreachable
    return null;
  }
});

// Use in every admin layout/page that needs the user. Next.js may render a page
// at the same time as its layout, so each one must check for itself.
export async function requireAdminUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  if (!canAccessAdmin(user)) redirect("/admin/login?error=forbidden");
  return user;
}
