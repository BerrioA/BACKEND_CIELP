import { Router } from "express";
import {
  getAllUsersTrash,
  registerAdmin,
  registerPsychologist,
} from "../controllers/index.js";
import { updateUsers } from "../controllers/user.controller.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/trash", getAllUsersTrash);
router.post("/psychologists", registerPsychologist);
router.post("/admins", registerAdmin);
router.patch("/:userId", updateUsers);

export default router;
