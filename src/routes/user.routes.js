import { Router } from "express";
import {
  getUsers,
  getAllUsersTrash,
  registerAdmin,
  updateUsers,
  registerPsychologist,
  changePassword,
} from "../controllers/index.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", getUsers);
router.get("/trash", getAllUsersTrash);
router.post("/psychologists", registerPsychologist);
router.post("/admins", registerAdmin);
router.patch("/:userId", updateUsers);
router.patch("/:userId/password", changePassword);

export default router;
