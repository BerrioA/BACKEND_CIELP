import { validationResult } from "express-validator";
import { getUsersTrash, registerUser, updateUser } from "../services/index.js";

// Controlador para actualizar usuarios
export const updateUsers = async (req, res) => {
  try {
    const { userId } = req.params; // Desestructurar correctamente
    const dataUserUpdate = req.body;

    const userToUpdate = await updateUser({ userId, dataUserUpdate });

    // Verificar si hubo un error
    if (userToUpdate.error) {
      return res.status(404).json({ message: userToUpdate.error });
    }

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: userToUpdate,
    });
  } catch (error) {
    console.error(
      "Ha ocurrido un error al intentar actualizar el usuario:",
      error
    );
    return res.status(500).json({
      message: "Ha ocurrido un error al intentar actualizar el usuario",
      error: error.message,
    });
  }
};

// Controlador para registrar administradores usando authService
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

// Controlador para registrar psicólogos usando authService
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

// Controlador para obtener todos los usuarios en papelera de reciclaje
export const getAllUsersTrash = async (req, res) => {
  try {
    const deletedUsers = await getUsersTrash();
    res.status(200).json(deletedUsers);
  } catch (error) {
    console.error(
      "Se ha presentado un error al obtener intentar obtener los usuarios en papelera de reciclaje",
      error
    );
    res.status(500).json({ error: error.message });
  }
};
