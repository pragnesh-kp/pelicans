import { Router } from "express";
import * as controller from "../controllers/post.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();
const staff = [protect, authorize("admin", "editor", "author")];

// Public website: published posts only
router.get("/", controller.listPublished);
router.get("/slug/:slug", controller.getBySlug);

// Admin panel: all statuses (drafts, trash)
router.get("/admin", ...staff, controller.listAdmin);
router.get("/admin/:id", ...staff, controller.getForEdit);
router.post("/", ...staff, controller.create);
router.put("/:id", ...staff, controller.update);
router.delete("/:id", ...staff, controller.remove);

export default router;
