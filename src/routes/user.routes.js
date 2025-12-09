import { Router } from "express";
import {
  registerAdmin,
  registerPsychologist,
} from "../controllers/user.controller.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/psychologists", registerPsychologist);
router.post("/admins", registerAdmin);

export default router;
