import { Router } from "express";
import { login, logout, profile, refreshToken } from "../controllers/index.js";
import { requireToken, requireRefreshToken } from "../middlewares/index.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/profile", requireToken, profile);

export default router;
