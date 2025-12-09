import { Router } from "express";
import { getServices } from "../controllers/index.js";
const router = Router();

router.get("/", getServices);

export default router;
