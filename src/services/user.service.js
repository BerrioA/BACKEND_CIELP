import { Op } from "sequelize";
import bcryptjs from "bcryptjs";
import { AdditionalInformation, Role, Service, User } from "../models/index.js";

// Servicio para obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const patients = await User.findAll({
      include: [
        {
          model: Role,
          where: {
            name: {
              [Op.in]: ["psychologist", "admin", "superAdmin", "developer"],
            },
          },
          attributes: ["name"],
        },
        {
          model: AdditionalInformation,
          attributes: [
            "id",
            "date_of_birth",
            "sex",
            "data_privacy_consent",
            "psychological_treatment_consent",
            "service_id",
          ],
          required: false,
        },
      ],
      attributes: [
        "id",
        "given_name",
        "surname",
        "phone",
        "email",
        "created_at",
      ],
      order: [["given_name", "ASC"]],
    });

    const formattedPatients = patients.map((patient) => {
      const patientData = patient.toJSON();

      const additionalInfo = patientData.additional_information;

      return {
        id: patientData.id,
        given_name: patientData.given_name,
        surname: patientData.surname,
        phone: patientData.phone,
        email: patientData.email,
        role: patientData.role?.name || null,
        date_of_birth: additionalInfo?.date_of_birth || null,
        sex: additionalInfo?.sex || null,
        service_id: additionalInfo?.service_id || null,
        service_name: additionalInfo?.service?.name || null,
        created_at: patientData.created_at,
      };
    });

    return formattedPatients;
  } catch (error) {
    throw new Error("Error al obtener los pacientes: " + error.message);
  }
};

// Servicio para actualizar un usuario
export const updateUser = async ({
  userId,
  patientId,
  dataUserUpdate,
  transaction,
}) => {
  try {
    const idToSearch = userId || patientId;

    const user = await User.findByPk(idToSearch, {
      attributes: [
        "id",
        "given_name",
        "surname",
        "phone",
        "email",
        "status",
        "createdAt",
      ],
      transaction,
    });

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    await user.update(dataUserUpdate, { transaction });

    return user;
  } catch (error) {
    console.error({ message: error });
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};

// Servicio para eliminar un usuario de cualquier rol
export const deleteUser = async ({ userId, patientId }) => {
  try {
    const idToSearch = userId ?? patientId;

    const user = await User.findByPk(idToSearch);

    if (!user) return null;

    await user.destroy();

    return true;
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
};

// Servicio para obtener todos los usuarios en papelera de reciclaje
export const getUsersTrash = async () => {
  try {
    const users = await User.findAll({
      where: {
        deletedAt: { [Op.ne]: null },
      },
      paranoid: false,
      include: [
        {
          model: Role,
          where: { name: "patient" },
          attributes: [],
        },
        {
          model: AdditionalInformation,
          attributes: [
            "id",
            "date_of_birth",
            "sex",
            "data_privacy_consent",
            "psychological_treatment_consent",
            "service_id",
          ],
          required: false,
          include: [
            {
              model: Service,
              attributes: ["id", "name"],
              required: false,
            },
          ],
        },
      ],
      attributes: [
        "id",
        "given_name",
        "surname",
        "phone",
        "email",
        "created_at",
      ],
      order: [["given_name", "ASC"]],
    });

    const formattedUsers = users.map((user) => {
      const userData = user.toJSON();

      const additionalInfo = userData.additional_information;

      return {
        id: userData.id,
        given_name: userData.given_name,
        surname: userData.surname,
        phone: userData.phone,
        email: userData.email,
        date_of_birth: additionalInfo?.date_of_birth || null,
        sex: additionalInfo?.sex || null,
        service_id: additionalInfo?.service_id || null,
        service_name: additionalInfo?.service?.name || null,
        created_at: userData.created_at,
      };
    });

    return formattedUsers;
  } catch (error) {
    throw new Error(
      "Error al intentar obtener los usuarios en papelera: " + error.message
    );
  }
};

// Servicio para eliminar un usuario por completo desde la papelera de reciclaje
export const deleteUsersComplete = async ({ userId, patientId }) => {
  try {
    const idToSearch = userId ?? patientId;

    const user = await User.findByPk(idToSearch, { paranoid: false });

    if (!user) return null;

    await user.destroy({ force: true });

    return true;
  } catch (error) {
    throw new Error(
      "Error al intentar eliminar el usuario definitivamente: " + error.message
    );
  }
};

// Servicio para actualizar contraseña
export const updatePassword = async ({
  userId,
  patientId,
  newPassword,
  oldPassword,
}) => {
  try {
    const idToSearch = userId || patientId;

    const user = await User.findByPk(idToSearch, {
      attributes: ["id", "password"],
    });

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    const comparePassword = await bcryptjs.compare(oldPassword, user.password);

    if (!comparePassword) {
      return { error: "La contraseña actual es incorrecta" };
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return { message: "Contraseña actiializada correctamente." };
  } catch (error) {
    console.error({ message: error });
    throw new Error("Error al actualizar la contraseña: " + error.message);
  }
};

// Servicio para actualizar contraseña de usuario logueado
export const updateMePassword = async ({
  userId,
  newPassword,
  oldPassword,
}) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "password"],
    });

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    const comparePassword = await bcryptjs.compare(oldPassword, user.password);

    if (!comparePassword) {
      return { error: "Credenciales incorrectas." };
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return { message: "Contraseña actiializada correctamente." };
  } catch (error) {
    console.error({ message: error });
    throw new Error("Error al actualizar la contraseña: " + error.message);
  }
};
