import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import PostEditor from "@/components/admin/posts/PostEditor";
import Notice from "@/components/admin/Notice";

export const metadata = { title: "Edit Post" };

export default async function EditPostPage({ params, searchParams }) {
  await requireAdminUser();
  const { id } = await params;
  const { saved } = await searchParams;

  if (!/^\d+$/.test(id)) notFound();

  let post;
  try {
    post = await serverApi(`/posts/admin/${id}`);
  } catch (err) {
    if (err.status === 404) notFound();
    if (err.status === 403) {
      return (
        <>
          <h1>Edit Post</h1>
          <Notice type="error">{err.message}</Notice>
          <Link href="/admin/posts">← Back to all posts</Link>
        </>
      );
    }
    throw err;
  }

  const categories = await serverApi("/categories");

  // key: start fresh if you jump from one post straight to another
  return <PostEditor key={post.id} post={post} categories={categories} savedStatus={saved} />;
}
