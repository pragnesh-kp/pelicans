// Server-side only: calls the backend with the visitor's login cookie.
// Used by admin pages (server components) to load data before rendering.
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function serverApi(path) {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(`${API_URL}${path}`, {
    headers: token ? { Cookie: `token=${token}` } : {},
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.message || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}
