import { Router } from "express";
import * as controller from "../controllers/category.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();
// Like WordPress: admins and editors manage categories, authors can only pick them
const managers = [protect, authorize("admin", "editor")];

// Public (website + post editor)
router.get("/", controller.list);
router.get("/slug/:slug", controller.getBySlug);

// Admin panel
router.post("/", ...managers, controller.create);
router.put("/:id", ...managers, controller.update);
router.delete("/:id", ...managers, controller.remove);

export default router;
