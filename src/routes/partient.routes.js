import { Router } from "express";
import {
  deletePatient,
  getPatientById,
  getPatients,
  registerPatient,
  deletePatientComplete,
} from "../controllers/index.js";

const router = Router();

router.post("/", registerPatient);
router.get("/", getPatients);
router.get("/:patientId", getPatientById);
router.delete("/:patientId", deletePatient);
router.delete("/:patientId/permanent", deletePatientComplete);

export default router;
