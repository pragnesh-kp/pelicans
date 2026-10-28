"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Mail, Phone, Reply, Archive, Inbox, MailOpen, MailWarning, Trash2, ArrowLeft,
  Copy, Check, ChevronLeft, ChevronRight, MessageSquare,
} from "lucide-react";
import Notice from "@/components/admin/Notice";
import { setMessageStatus, deleteMessage } from "@/services/messageService";
import { errorMessage } from "@/lib/api";
import { formatShortDate, formatDateTime } from "@/utils/formatDate";
import styles from "./MessagesInbox.module.css";

const TABS = [
  { key: "inbox", label: "Inbox" },
  { key: "unread", label: "Unread" },
  { key: "archived", label: "Archived" },
];

// /admin/messages?folder=...&search=...&page=...&id=... (defaults left out)
function inboxUrl({ folder = "inbox", search = "", page = 1, id = null }) {
  const q = new URLSearchParams();
  if (folder !== "inbox") q.set("folder", folder);
  if (search) q.set("search", search);
  if (page > 1) q.set("page", String(page));
  if (id) q.set("id", String(id));
  const qs = q.toString();
  return `/admin/messages${qs ? `?${qs}` : ""}`;
}

// Pre-filled reply email (quoted text kept short so the mail link isn't too long)
function replyLink(msg) {
  const firstName = msg.name.split(" ")[0];
  const subject = `Re: Your enquiry${msg.service ? ` about ${msg.service}` : ""} – Pelicans Technologies`;
  const quoted = (msg.message || "").slice(0, 800).split("\n").map((line) => `> ${line}`).join("\n");
  const body = `Hi ${firstName},\n\nThank you for contacting Pelicans Technologies.\n\n\n\n—\nOn ${formatDateTime(msg.created_at)}, ${msg.name} wrote:\n${quoted}`;
  return `mailto:${msg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function MessagesInbox({ data, folder, search, selected, missingId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [busy, setBusy] = useState(null);
  const [notice, setNotice] = useState(missingId ? { type: "warning", text: "That message no longer exists." } : null);
  const [searchText, setSearchText] = useState(search);
  const [copied, setCopied] = useState(false);
  const markedRef = useRef(new Set());

  const { messages, counts, page, pages, total } = data;
  const here = { folder, search, page };
  const refresh = () => startTransition(() => router.refresh());

  // Opening an unread message marks it as read (once per message)
  useEffect(() => {
    if (!selected || selected.status !== "new" || markedRef.current.has(selected.id)) return;
    markedRef.current.add(selected.id);
    setMessageStatus(selected.id, "read")
      .then(refresh)
      .catch(() => {}); // not critical — it simply stays unread
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id, selected?.status]);

  useEffect(() => setCopied(false), [selected?.id]);

  async function act(action, fn, { successText, leave = false } = {}) {
    setBusy(action);
    setNotice(null);
    try {
      await fn();
      if (successText) setNotice({ type: "success", text: successText });
      if (leave) router.push(inboxUrl(here));
      refresh();
    } catch (err) {
      setNotice({ type: "error", text: errorMessage(err) });
    } finally {
      setBusy(null);
    }
  }

  const markUnread = () =>
    act("unread", () => setMessageStatus(selected.id, "new"), { successText: "Marked as unread." });
  const archive = () =>
    act("archive", () => setMessageStatus(selected.id, "archived"), {
      successText: `Message from ${selected.name} archived.`,
      leave: true,
    });
  const unarchive = () =>
    act("unarchive", () => setMessageStatus(selected.id, "read"), {
      successText: "Moved back to the Inbox.",
      leave: true,
    });
  const remove = () => {
    if (!window.confirm(`Permanently delete the message from ${selected.name}? This cannot be undone.`)) return;
    act("delete", () => deleteMessage(selected.id), { successText: "Message deleted.", leave: true });
  };

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(selected.email);
      setCopied(true);
    } catch {
      /* clipboard blocked — the email is still visible to copy by hand */
    }
  }

  function onSearch(e) {
    e.preventDefault();
    router.push(inboxUrl({ folder, search: searchText.trim() }));
  }

  return (
    <>
      {notice && (
        <Notice type={notice.type} onDismiss={() => setNotice(null)}>
          {notice.text}
        </Notice>
      )}

      <div className={`${styles.inbox} ${selected ? styles.hasSelection : ""}`} aria-busy={isPending}>
        {/* ---------- Message list ---------- */}
        <section className={styles.listPanel} aria-label="Messages">
          <nav className={styles.tabs} aria-label="Folders">
            {TABS.map((tab) => (
              <Link
                key={tab.key}
                href={inboxUrl({ folder: tab.key, search })}
                className={folder === tab.key ? styles.activeTab : undefined}
                aria-current={folder === tab.key ? "page" : undefined}
              >
                {tab.label}
                <span className={styles.tabCount}>{counts[tab.key]}</span>
              </Link>
            ))}
          </nav>

          <form className={styles.search} onSubmit={onSearch} role="search">
            <Search size={16} aria-hidden="true" />
            <label htmlFor="message-search" className="visually-hidden">
              Search messages
            </label>
            <input
              id="message-search"
              type="search"
              placeholder="Search name, email or text…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
          {search && (
            <p className={styles.searchInfo}>
              {total} result{total === 1 ? "" : "s"} for “{search}” · <Link href={inboxUrl({ folder })}>clear</Link>
            </p>
          )}

          {messages.length === 0 ? (
            <div className={styles.emptyList}>
              <MessageSquare size={32} aria-hidden="true" />
              <p>
                {search
                  ? "No messages match your search."
                  : folder === "archived"
                    ? "No archived messages."
                    : folder === "unread"
                      ? "You're all caught up — no unread messages."
                      : "No messages yet. They'll appear here when someone uses the contact form."}
              </p>
            </div>
          ) : (
            <ul className={styles.list}>
              {messages.map((m) => {
                const isSelected = selected?.id === m.id;
                const unread = m.status === "new";
                return (
                  <li key={m.id}>
                    <Link
                      href={inboxUrl({ ...here, id: m.id })}
                      className={`${styles.item} ${isSelected ? styles.selected : ""} ${unread ? styles.unread : ""}`}
                      aria-current={isSelected ? "true" : undefined}
                      scroll={false}
                    >
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.itemTop}>
                        <span className={styles.itemName}>
                          {m.name}
                          {unread && <span className="visually-hidden"> (unread)</span>}
                        </span>
                        <time className={styles.itemDate} dateTime={m.created_at} suppressHydrationWarning>
                          {formatShortDate(m.created_at)}
                        </time>
                      </span>
                      {m.service && <span className={styles.itemService}>{m.service}</span>}
                      <span className={styles.itemSnippet}>{m.snippet || "No message — contact details only."}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {pages > 1 && (
            <nav className={styles.pagination} aria-label="Pagination">
              <Link
                href={inboxUrl({ folder, search, page: page - 1 })}
                aria-disabled={page <= 1}
                className={page <= 1 ? styles.disabled : undefined}
                tabIndex={page <= 1 ? -1 : undefined}
              >
                <ChevronLeft size={16} aria-hidden="true" /> Newer
              </Link>
              <span>
                {page} / {pages}
              </span>
              <Link
                href={inboxUrl({ folder, search, page: page + 1 })}
                aria-disabled={page >= pages}
                className={page >= pages ? styles.disabled : undefined}
                tabIndex={page >= pages ? -1 : undefined}
              >
                Older <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </nav>
          )}
        </section>

        {/* ---------- Reading pane ---------- */}
        <section className={styles.readPanel} aria-label="Message">
          {!selected ? (
            <div className={styles.placeholder}>
              <MailOpen size={40} aria-hidden="true" />
              <p>Select a message to read it.</p>
            </div>
          ) : (
            <article className={styles.message}>
              <Link href={inboxUrl(here)} className={styles.back} scroll={false}>
                <ArrowLeft size={16} aria-hidden="true" /> Back to messages
              </Link>

              <header className={styles.messageHeader}>
                <span className={styles.avatar} aria-hidden="true">
                  {selected.name[0]?.toUpperCase()}
                </span>
                <div className={styles.headerText}>
                  <h2 className={styles.from}>{selected.name}</h2>
                  <p className={styles.received}>
                    <time dateTime={selected.created_at} suppressHydrationWarning>
                      {formatDateTime(selected.created_at)}
                    </time>
                    {selected.status === "archived" && <span className={styles.archivedTag}>Archived</span>}
                  </p>
                </div>
              </header>

              <dl className={styles.details}>
                <div>
                  <dt>
                    <Mail size={15} aria-hidden="true" /> Email
                  </dt>
                  <dd>
                    <a href={`mailto:${selected.email}`}>{selected.email}</a>
                    <button type="button" className={styles.copy} onClick={copyEmail} aria-label="Copy email address">
                      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </dd>
                </div>
                <div>
                  <dt>
                    <Phone size={15} aria-hidden="true" /> Phone
                  </dt>
                  <dd>
                    {selected.phone ? (
                      <a href={`tel:${selected.phone.replace(/[^\d+]/g, "")}`}>{selected.phone}</a>
                    ) : (
                      <span className={styles.muted}>Not given</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>{selected.service || <span className={styles.muted}>Not selected</span>}</dd>
                </div>
              </dl>

              <div className={styles.actions}>
                <a href={replyLink(selected)} className="admin-btn admin-btn--primary">
                  <Reply aria-hidden="true" /> Reply by email
                </a>
                {selected.status !== "archived" ? (
                  <>
                    <button type="button" className="admin-btn admin-btn--secondary" onClick={markUnread} disabled={busy !== null}>
                      <MailWarning aria-hidden="true" /> Mark as unread
                    </button>
                    <button type="button" className="admin-btn admin-btn--secondary" onClick={archive} disabled={busy !== null}>
                      <Archive aria-hidden="true" /> Archive
                    </button>
                  </>
                ) : (
                  <button type="button" className="admin-btn admin-btn--secondary" onClick={unarchive} disabled={busy !== null}>
                    <Inbox aria-hidden="true" /> Move to Inbox
                  </button>
                )}
                <button type="button" className={`admin-link admin-link--danger ${styles.delete}`} onClick={remove} disabled={busy !== null}>
                  <Trash2 size={15} aria-hidden="true" /> Delete
                </button>
              </div>

              <div className={styles.body}>
                {selected.message ? (
                  selected.message
                ) : (
                  <span className={styles.muted}>No message — the visitor only left their contact details.</span>
                )}
              </div>

              {selected.ip_address && <p className={styles.meta}>Sent from IP {selected.ip_address}</p>}
            </article>
          )}
        </section>
      </div>
    </>
  );
}
