import { Router } from "express";
import { createPsychologist } from "../controllers/user.controller.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/", createPsychologist);

export default router;
