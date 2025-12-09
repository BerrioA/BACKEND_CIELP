import { validationResult } from "express-validator";
import { registerUser } from "../services/index.js";

// Nuevo controlador para registrar psicólogos usando el authService
export const registerAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userData } = req.body;

    if (
      !userData ||
      !userData.email ||
      !userData.given_name ||
      !userData.password
    ) {
      return res.status(400).json({
        error:
          "Los datos del Administrador (email, given_name y password) son requeridos",
      });
    }

    await registerUser(
      {
        userData,
        representativeData: null,
      },
      "admin"
    );

    return res
      .status(201)
      .json({ message: "Administrador registrado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Nuevo controlador para registrar psicólogos usando el mismo servicio
export const registerPsychologist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userData } = req.body;

    if (
      !userData ||
      !userData.email ||
      !userData.given_name ||
      !userData.password
    ) {
      return res.status(400).json({
        error:
          "Los datos del psicólogo (email, given_name y password) son requeridos",
      });
    }

    // Llamar al mismo servicio pero indicando el rol deseado
    await registerUser(
      {
        userData,
        representativeData: null,
      },
      "psychologist"
    );

    return res
      .status(201)
      .json({ message: "Psicólogo registrado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
