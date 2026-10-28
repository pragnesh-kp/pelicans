import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import PostEditor from "@/components/admin/posts/PostEditor";

export const metadata = { title: "Add New Post" };

export default async function NewPostPage() {
  await requireAdminUser();
  const categories = await serverApi("/categories");

  return <PostEditor post={null} categories={categories} />;
}
