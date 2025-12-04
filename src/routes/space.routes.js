import { Router } from "express";
import { getSpaces } from "../controllers/spaces.controller.js";

const router = Router();

router.get("/", getSpaces);

export default router;
