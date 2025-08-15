import { Router } from "express";
import {
  getPartientById,
  getPartients,
} from "../controllers/patient.controller.js";

const router = Router();

router.get("/", getPartients);
router.get("/:patientId", getPartientById);

export default router;
