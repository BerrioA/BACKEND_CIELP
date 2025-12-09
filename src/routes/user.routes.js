import { Router } from "express";
import {
  getAllUsersTrash,
  registerAdmin,
  registerPsychologist,
} from "../controllers/index.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/trash", getAllUsersTrash);
router.post("/psychologists", registerPsychologist);
router.post("/admins", registerAdmin);

export default router;
