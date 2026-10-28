import { requireAdminUser } from "@/lib/session";
import { serverApi } from "@/lib/serverApi";
import Notice from "@/components/admin/Notice";
import MessagesInbox from "@/components/admin/messages/MessagesInbox";

export const metadata = { title: "Messages" };

const FOLDERS = ["inbox", "unread", "archived"];

export default async function AdminMessagesPage({ searchParams }) {
  const user = await requireAdminUser();
  if (user.role !== "admin" && user.role !== "editor") {
    return (
      <>
        <h1>Messages</h1>
        <Notice type="error">Only administrators and editors can read contact messages.</Notice>
      </>
    );
  }

  const params = await searchParams;
  const folder = FOLDERS.includes(params.folder) ? params.folder : "inbox";
  const search = typeof params.search === "string" ? params.search : "";
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);
  const id = /^\d+$/.test(params.id || "") ? params.id : null;

  const query = new URLSearchParams({ folder, page: String(page) });
  if (search) query.set("search", search);

  const [data, selected] = await Promise.all([
    serverApi(`/contact?${query}`),
    id ? serverApi(`/contact/${id}`).catch((err) => (err.status === 404 ? null : Promise.reject(err))) : null,
  ]);

  return (
    <>
      <div className="admin-page-header">
        <h1>Messages</h1>
      </div>
      <MessagesInbox
        // reset local state when the folder/search/page changes
        key={`${folder}|${search}|${page}`}
        data={data}
        folder={folder}
        search={search}
        selected={selected}
        missingId={id && !selected ? id : null}
      />
    </>
  );
}
