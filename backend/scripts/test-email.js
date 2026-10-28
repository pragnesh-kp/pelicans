// Checks your SMTP settings and sends a sample contact alert.
// Usage: npm run test:email            (sends to CONTACT_NOTIFY_TO)
//        npm run test:email -- you@example.com
import { config } from "../src/config/env.js";
import { isMailConfigured, verifyMailConnection, sendMail } from "../src/services/mail.service.js";
import { contactNotificationEmail } from "../src/emails/contactNotification.js";

const to = process.argv[2] || config.mail.contactNotifyTo;

if (!isMailConfigured()) {
  console.error("Email is not set up. Add SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_FROM to backend/.env (see .env.example).");
  process.exit(1);
}

console.log(`Connecting to ${config.mail.host}:${config.mail.port} (secure: ${config.mail.secure}) as ${config.mail.user || "(no login)"}…`);
try {
  await verifyMailConnection();
  console.log("✓ Login OK");
} catch (err) {
  console.error(`✗ Could not connect or log in: ${err.message}`);
  console.error("  Check SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER and SMTP_PASS.");
  process.exit(1);
}

const sample = {
  id: 0,
  name: "Test Visitor",
  email: "test.visitor@example.com",
  phone: "+91 98765 43210",
  service: "Web Development",
  message: "This is a test of the website contact form alert.\n\nIf you can read this, email alerts are working.",
  created_at: new Date(),
};
const { subject, text, html } = contactNotificationEmail(sample, `${config.frontendUrl}/admin/messages`);

try {
  await sendMail({ to, subject: `[TEST] ${subject}`, text, html, replyTo: { name: sample.name, address: sample.email } });
  console.log(`✓ Test email sent to ${to}. Check the inbox (and spam folder).`);
} catch (err) {
  console.error(`✗ Sending failed: ${err.message}`);
  process.exit(1);
}
