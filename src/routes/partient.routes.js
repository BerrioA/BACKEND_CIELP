import { Router } from "express";
import {
  getPatientById,
  getPatients,
  registerPatient,
} from "../controllers/index.js";

const router = Router();

router.post("/", registerPatient);
router.get("/", getPatients);
router.get("/:patientId", getPatientById);

export default router;
