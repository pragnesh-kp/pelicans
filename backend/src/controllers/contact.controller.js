import { ContactMessage } from "../models/contact.model.js";
import { validateContact } from "../validators/contact.validator.js";
import { ApiError } from "../utils/ApiError.js";
import { notifyNewContactMessage } from "../services/contactNotify.service.js";

const SUCCESS = { message: "Thank you! Your message has been sent. Our team will contact you soon." };
const PAGE_SIZE = 20;

const toPositiveInt = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  return Number.isInteger(n) && n > 0 ? n : fallback;
};

// Public: website contact form
export async function submit(req, res) {
  // Hidden "website" field: real visitors leave it empty, spam bots fill it in.
  // Pretend it worked so bots don't learn they were caught.
  if (req.body?.website) return res.status(201).json(SUCCESS);

  const data = validateContact(req.body);
  const id = await ContactMessage.create({ ...data, ip_address: req.ip });
  res.status(201).json(SUCCESS);

  // Email the team in the background. The message is already saved, so a mail
  // problem never affects the visitor — it is only logged.
  notifyNewContactMessage({ ...data, id, created_at: new Date() }).catch((err) =>
    console.error(`Contact email for message #${id} failed: ${err.message}`)
  );
}

// Admin: list a folder (inbox | unread | archived) with search + pages
export async function list(req, res) {
  const folder = ["inbox", "unread", "archived"].includes(req.query.folder) ? req.query.folder : "inbox";
  const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";
  const page = toPositiveInt(req.query.page, 1);

  const [{ messages, total }, counts] = await Promise.all([
    ContactMessage.list({ folder, search, page, limit: PAGE_SIZE }),
    ContactMessage.counts(),
  ]);
  res.json({ messages, total, page, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)), counts });
}

// Admin: unread count for the sidebar badge
export const counts = async (req, res) => res.json(await ContactMessage.counts());

// Admin: one full message
export async function getOne(req, res) {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) throw new ApiError(404, "Message not found");
  res.json(message);
}

// Admin: mark as new (unread) / read / archived
export async function updateStatus(req, res) {
  const { status } = req.body ?? {};
  if (!["new", "read", "archived"].includes(status)) throw new ApiError(400, "Invalid status");
  if (!(await ContactMessage.updateStatus(req.params.id, status))) throw new ApiError(404, "Message not found");
  res.json(await ContactMessage.findById(req.params.id));
}

// Admin: delete permanently
export async function remove(req, res) {
  if (!(await ContactMessage.remove(req.params.id))) throw new ApiError(404, "Message not found");
  res.status(204).end();
}
