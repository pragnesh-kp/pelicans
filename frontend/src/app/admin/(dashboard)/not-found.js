import Link from "next/link";

export default function AdminNotFound() {
  return (
    <>
      <h1>Not found</h1>
      <div className="admin-notice admin-notice--warning">
        <p>This item doesn&apos;t exist — it may have been deleted.</p>
      </div>
      <Link href="/admin/posts" className="admin-btn admin-btn--secondary">
        ← Back to all posts
      </Link>
    </>
  );
}
