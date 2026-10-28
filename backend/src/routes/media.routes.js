import { Router } from "express";
import * as controller from "../controllers/media.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.use(protect, authorize("admin", "editor", "author"));
router.get("/", controller.getAll);
router.post("/", upload.single("file"), controller.upload);

export default router;
