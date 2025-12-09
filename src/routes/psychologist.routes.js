import { Router } from "express";
import { registerPsychologist } from "../controllers/user.controller.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/", registerPsychologist);

export default router;
