import { Router } from "express";
import {
  getPatientById,
  getPatients,
} from "../controllers/patient.controller.js";

const router = Router();

router.get("/", getPatients);
router.get("/:patientId", getPatientById);

export default router;
