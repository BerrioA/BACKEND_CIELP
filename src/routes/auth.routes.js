import { Router } from "express";
import { login, logout, profile } from "../controllers/index.js";
import { refreshToken } from "../controllers/refreshToken.controller.js";
import { requireRefreshToken } from "../middlewares/auth/requireRefreshToken.js";
import { requireToken } from "../middlewares/auth/requireToken.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/profile", requireToken, profile);

export default router;
