import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/", createUser);

export default router;
