// The email sent to the team when someone uses the website contact form.
// Every value comes from a visitor, so it is escaped before going into HTML.

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatWhen = (date) =>
  new Date(date).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

/**
 * @param {object} msg  { id, name, email, phone, service, message, created_at }
 * @param {string} adminUrl  link to this message in the admin panel
 */
export function contactNotificationEmail(msg, adminUrl) {
  const subject = `New enquiry from ${msg.name}${msg.service ? ` – ${msg.service}` : ""}`;
  const when = formatWhen(msg.created_at || new Date());

  const rows = [
    ["Name", escapeHtml(msg.name)],
    ["Email", `<a href="mailto:${escapeHtml(msg.email)}" style="color:#1d4ed8">${escapeHtml(msg.email)}</a>`],
    ["Phone", msg.phone ? escapeHtml(msg.phone) : '<span style="color:#9aa0a6">Not given</span>'],
    ["Service", msg.service ? escapeHtml(msg.service) : '<span style="color:#9aa0a6">Not selected</span>'],
    ["Received", escapeHtml(when)],
  ];

  const messageHtml = msg.message
    ? escapeHtml(msg.message).replace(/\r?\n/g, "<br>")
    : '<span style="color:#9aa0a6">No message — the visitor only left their contact details.</span>';

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:24px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <tr><td style="background:#0f172a;padding:20px 28px">
            <span style="color:#f59e0b;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">New website enquiry</span>
            <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;line-height:1.3">${escapeHtml(msg.name)}</h1>
          </td></tr>
          <tr><td style="padding:24px 28px 8px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px">
              ${rows
                .map(
                  ([label, value]) => `<tr>
                <td style="padding:6px 0;width:90px;color:#475569;vertical-align:top">${label}</td>
                <td style="padding:6px 0;vertical-align:top">${value}</td>
              </tr>`
                )
                .join("")}
            </table>
          </td></tr>
          <tr><td style="padding:8px 28px 24px">
            <div style="border-top:1px solid #e2e8f0;padding-top:18px;font-size:15px;line-height:1.6">${messageHtml}</div>
          </td></tr>
          <tr><td style="padding:0 28px 28px">
            <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 20px;border-radius:8px">Open in admin panel</a>
            <p style="margin:16px 0 0;font-size:13px;color:#475569">Tip: just press <strong>Reply</strong> to answer ${escapeHtml(msg.name)} directly.</p>
          </td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:#9aa0a6">Sent by the Pelicans Technologies website contact form.</p>
      </td></tr>
    </table>
  </body>
</html>`;

  const text = [
    "New website enquiry",
    "",
    `Name:     ${msg.name}`,
    `Email:    ${msg.email}`,
    `Phone:    ${msg.phone || "Not given"}`,
    `Service:  ${msg.service || "Not selected"}`,
    `Received: ${when}`,
    "",
    "Message:",
    msg.message || "(No message — contact details only.)",
    "",
    `Open in admin panel: ${adminUrl}`,
    "Reply to this email to answer the visitor directly.",
  ].join("\n");

  return { subject, text, html };
}
