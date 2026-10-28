import nodemailer from "nodemailer";
import { config } from "../config/env.js";

const { mail } = config;

export const isMailConfigured = () => Boolean(mail.host && mail.from);

let transporter = null;

// Created on first use, then reused (keeps the SMTP connection settings in one place)
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: mail.host,
      port: mail.port,
      secure: mail.secure,
      auth: mail.user ? { user: mail.user, pass: mail.pass } : undefined,
      // Don't let a slow mail server hang for minutes
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

// Removes line breaks so user input can never add extra email headers
export const headerSafe = (value = "") => String(value).replace(/[\r\n]+/g, " ").trim();

/**
 * Sends one email. Returns false (and does nothing) when email isn't set up.
 * Throws if the mail server rejects it — callers decide whether that matters.
 */
export async function sendMail({ to, subject, text, html, replyTo }) {
  if (!isMailConfigured()) return false;
  await getTransporter().sendMail({
    from: mail.from,
    to,
    subject: headerSafe(subject),
    text,
    html,
    ...(replyTo && { replyTo: { name: headerSafe(replyTo.name), address: headerSafe(replyTo.address) } }),
  });
  return true;
}

// Checks the login/connection without sending anything
export const verifyMailConnection = () => getTransporter().verify();
