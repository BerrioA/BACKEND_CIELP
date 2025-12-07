import { validationResult } from "express-validator";
import { getUserProfile, registerUser } from "../services/index.js";

export const createUser = async (req, res) => {
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

// Nuevo controlador para registrar psicólogos usando el mismo servicio
export const createPsychologist = async (req, res) => {
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

export const profile = async (req, res) => {
  try {
    const profileData = await getUserProfile(req.uid);
    return res.status(200).json(profileData);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error.message);

    const statusCode = error.message === "Usuario no encontrado." ? 404 : 500;
    return res.status(statusCode).json({ message: error.message });
  }
};
