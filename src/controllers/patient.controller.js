import { getAllPatients, getOnePatient } from "../services/patient.service.js";

export const getPatients = async (req, res) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Se ha presentado un error al obtener los pacientes", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params;

    if (!patientId)
      return res.status(404).json({ error: "Id del paciente no existe!" });

    const patient = await getOnePatient(patientId);
    res.status(200).json(patient);
  } catch (error) {
    console.error("Se ha presentado un error al obtener los pacientes", error);
    res.status(500).json({ error: error.message });
  }
};
