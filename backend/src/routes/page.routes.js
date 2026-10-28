import { Router } from "express";
import * as controller from "../controllers/page.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Public (used by the website)
router.get("/", controller.getAll);
router.get("/slug/:slug", controller.getBySlug);
router.get("/:id", controller.getById);

// Admin only
router.post("/", protect, authorize("admin", "editor"), controller.create);
router.put("/:id", protect, authorize("admin", "editor"), controller.update);
router.delete("/:id", protect, authorize("admin"), controller.remove);

export default router;
