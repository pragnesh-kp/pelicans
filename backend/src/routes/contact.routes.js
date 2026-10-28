import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as controller from "../controllers/contact.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();
const staff = [protect, authorize("admin", "editor")];

// Limits spam: 5 messages per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many messages sent. Please try again later or email us directly." },
});

// Public: website contact form
router.post("/", contactLimiter, controller.submit);

// Admin panel
router.get("/", ...staff, controller.list);
router.get("/counts", ...staff, controller.counts);
router.get("/:id", ...staff, controller.getOne);
router.patch("/:id", ...staff, controller.updateStatus);
router.delete("/:id", ...staff, controller.remove);

export default router;
