import { config } from "../config/env.js";
import { isMailConfigured, sendMail } from "./mail.service.js";
import { contactNotificationEmail } from "../emails/contactNotification.js";

// Emails the team about a new contact form message.
export async function notifyNewContactMessage(msg) {
  if (!isMailConfigured()) return false;

  const adminUrl = `${config.frontendUrl}/admin/messages?id=${msg.id}`;
  const { subject, text, html } = contactNotificationEmail(msg, adminUrl);

  return sendMail({
    to: config.mail.contactNotifyTo,
    subject,
    text,
    html,
    // "Reply" in your email app goes straight to the visitor
    replyTo: { name: msg.name, address: msg.email },
  });
}
