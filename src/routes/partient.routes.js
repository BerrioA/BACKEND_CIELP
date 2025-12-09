import { Router } from "express";
import {
  getPatientById,
  getPatients,
  registerPatient,
} from "../controllers/index.js";
import { deletePatient } from "../controllers/patient.controller.js";

const router = Router();

router.post("/", registerPatient);
router.get("/", getPatients);
router.get("/:patientId", getPatientById);
router.delete("/:patientId", deletePatient);

export default router;
