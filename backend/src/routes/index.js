import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import pageRoutes from "./page.routes.js";
import categoryRoutes from "./category.routes.js";
import mediaRoutes from "./media.routes.js";
import settingRoutes from "./setting.routes.js";
import contactRoutes from "./contact.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/pages", pageRoutes);
router.use("/categories", categoryRoutes);
router.use("/media", mediaRoutes);
router.use("/settings", settingRoutes);
router.use("/contact", contactRoutes);

export default router;
