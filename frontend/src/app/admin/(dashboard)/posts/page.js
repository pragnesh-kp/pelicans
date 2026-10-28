import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import PostsTable from "@/components/admin/posts/PostsTable";

export const metadata = { title: "Posts" };

const STATUSES = ["all", "published", "draft", "trash"];

export default async function AdminPostsPage({ searchParams }) {
  await requireAdminUser();
  const params = await searchParams;

  const status = STATUSES.includes(params.status) ? params.status : "all";
  const search = typeof params.search === "string" ? params.search : "";
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);

  const query = new URLSearchParams({ status, page: String(page) });
  if (search) query.set("search", search);
  const data = await serverApi(`/posts/admin?${query}`);

  return (
    <>
      <div className="admin-page-header">
        <h1>Posts</h1>
        <Link href="/admin/posts/new" className="admin-btn admin-btn--secondary">
          <Plus aria-hidden="true" /> Add New Post
        </Link>
      </div>

      {/* key: reset local state (notices, search box) when the filters change */}
      <PostsTable key={`${status}|${search}|${page}`} data={data} status={status} search={search} />
    </>
  );
}
