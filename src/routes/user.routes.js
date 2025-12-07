import { Router } from "express";
import { registerPatient } from "../controllers/patient.controller.js";
// import { userRegisterValidator } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/", registerPatient);

export default router;
