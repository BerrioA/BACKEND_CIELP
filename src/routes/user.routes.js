import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/", userRegisterValidator, createUser);


export default router;
