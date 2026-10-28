import { Router } from "express";
import * as controller from "../controllers/setting.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", controller.getAll);
router.put("/", protect, authorize("admin"), controller.update);

export default router;
