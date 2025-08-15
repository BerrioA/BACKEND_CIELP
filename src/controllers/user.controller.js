import { validationResult } from "express-validator";
import { getUserProfile, registerUser } from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    // Validación de campos desde express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await registerUser(req.body);
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
