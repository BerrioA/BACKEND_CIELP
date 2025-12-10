import { validationResult } from "express-validator";
import {
  getUsersTrash,
  registerUser,
  updateAdditionalInformation,
  updateUser,
} from "../services/index.js";
import { sequelize } from "../config/db.js";

// Controlador para actualizar usuarios e informacion adicional
export const updateUsers = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { userId } = req.params;
    const { dataUserUpdate, dataAdditionalInformationUpdate } = req.body;

    // Validar que al menos uno de los objetos tenga datos
    if (!dataUserUpdate && !dataAdditionalInformationUpdate) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Debe proporcionar al menos un dato para actualizar",
      });
    }

    let userToUpdate = null;
    let updateInformation = null;

    // Actualizar usuario si se proporcionaron datos
    if (dataUserUpdate && Object.keys(dataUserUpdate).length > 0) {
      userToUpdate = await updateUser({
        userId,
        dataUserUpdate,
        transaction,
      });

      if (userToUpdate.error) {
        await transaction.rollback();
        return res.status(404).json({ message: userToUpdate.error });
      }
    }

    // Actualizar información adicional si se proporcionaron datos
    if (
      dataAdditionalInformationUpdate &&
      Object.keys(dataAdditionalInformationUpdate).length > 0
    ) {
      updateInformation = await updateAdditionalInformation({
        userId,
        dataAdditionalInformationUpdate,
        transaction,
      });

      if (updateInformation.error) {
        await transaction.rollback();
        return res.status(404).json({ message: updateInformation.error });
      }
    }

    await transaction.commit();

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: userToUpdate,
      additionalInformation: updateInformation,
    });
  } catch (error) {
    await transaction.rollback();

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


