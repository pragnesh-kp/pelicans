import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Managing other users is for administrators only.
// (Everyone can edit their own details via /api/auth/me and /api/auth/password.)
router.use(protect, authorize("admin"));
router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove); // ?reassign=<userId> moves their posts

export default router;
