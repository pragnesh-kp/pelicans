import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as controller from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// Slows down password guessing: 10 failed attempts per 15 minutes per IP
const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again in 15 minutes." },
});

router.post("/login", passwordLimiter, controller.login);
router.post("/logout", controller.logout);
router.get("/me", protect, controller.me);
router.put("/me", protect, controller.updateMe);
router.put("/password", protect, passwordLimiter, controller.changePassword);

export default router;
