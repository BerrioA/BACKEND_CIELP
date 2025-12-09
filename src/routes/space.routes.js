import { Router } from "express";
import { getSpaces } from "../controllers/index.js";
const router = Router();

router.get("/", getSpaces);

export default router;
