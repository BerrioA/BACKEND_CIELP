import { validationResult } from "express-validator";
import { getUserProfile, registerUser } from "../services/index.js";



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
