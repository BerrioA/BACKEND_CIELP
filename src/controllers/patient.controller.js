import { validationResult } from "express-validator";
import { registerUser } from "../services/auth.service.js";
import {
  getAllPatients,
  getOnePatient,
} from "../services/patient.service.js";
import { deleteUser, deleteUsersComplete } from "../services/index.js";

// Controlador para registrar pacientes
export const registerPatient = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extraer directamente userData y representativeData del body
    const { userData, representativeData } = req.body;

    // Validar que userData existe y tiene los campos requeridos
    if (!userData || !userData.email || !userData.given_name) {
      return res.status(400).json({
        error: "Los datos del usuario son requeridos",
      });
    }

    await registerUser({
      userData,
      representativeData: representativeData || null,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para obtener todos los pacientes
export const getPatients = async (_, res) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Se ha presentado un error al obtener los pacientes", error);
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un paciente por ID
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

// Controlador para eliminar un paciente
export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params;

    const result = await deleteUser(patientId);

    if (!result) {
      return res.status(401).json({ message: "Paciente no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar eliminar el paciente",
      error
    );
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un paciente por completo
export const deletePatientComplete = async (req, res) => {
  try {
    const patientId = req.params;

    const result = await deleteUsersComplete(patientId);

    if (!result) {
      return res.status(401).json({ message: "Paciente no encontrado" });
    }

    return res.status(200).json({
      message: "Paciente eliminado correctamente de la papelera de reciclaje",
    });
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar eliminar el paciente definitivamente",
      error
    );
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los pacientes
// export const getPatientsReciclaje = async (req, res) => {
//   try {
//     const deletedUsers = await getUsersTrash();
//     res.status(200).json(deletedUsers);
//   } catch (error) {
//     console.error(
//       "Se ha presentado un error al obtener intentar obtener los usuarios en papelera de reciclaje",
//       error
//     );
//     res.status(500).json({ error: error.message });
//   }
// };
