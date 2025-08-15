import bcrypt from "bcryptjs";
import { sequelize } from "../config/db.js";
import { User } from "../models/user.model.js";
import { UserInformation } from "../models/user_information.model.js";
import { Service } from "../models/services.model.js";
import { Rol } from "../models/roles.model.js";

export const registerUser = async (userData) => {
  const {
    name,
    second_name,
    last_name,
    second_last_name,
    gender,
    cellphone,
    email,
    password,
    serviceId,
  } = userData;

  const transaction = await sequelize.transaction();

  try {
    // Validar existencia de correo y celular
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El correo ya está registrado.");
    }

    const existingCell = await User.findOne({ where: { cellphone } });
    if (existingCell) {
      throw new Error("El número de celular ya está registrado.");
    }

    // Validar que el servicio exista
    const service = await Service.findByPk(serviceId);
    if (!service) {
      throw new Error("El servicio seleccionado no existe.");
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario dentro de la transacción
    const newUser = await User.create(
      {
        name,
        second_name,
        last_name,
        second_last_name,
        gender,
        cellphone,
        email,
        password: hashedPassword,
      },
      { transaction }
    );

    // Crear la información del usuario con relación al servicio
    await UserInformation.create(
      {
        userId: newUser.id,
        serviceId: service.id,
      },
      { transaction }
    );

    // Confirmar la transacción
    await transaction.commit();

    return newUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getUserProfile = async (uid) => {
  const user = await User.findByPk(uid, {
    include: {
      model: Rol,
      as: "role",
      attributes: ["role"],
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return {
    uid: user.id,
    name: user.name,
    second_name: user.second_name,
    last_name: user.last_name,
    second_last_name: user.second_last_name,
    gender: user.gender,
    cellphone: user.cellphone,
    email: user.email,
    role: user.role?.role,
  };
};

// export const registerUser = async (userData) => {
//   const {
//     name,
//     second_name,
//     last_name,
//     second_last_name,
//     gender,
//     cellphone,
//     email,
//     password,
//   } = userData;

//   // Verifica si ya existe un usuario con ese email o celular
//   const existingUser = await User.findOne({
//     where: {
//       email,
//     },
//   });

//   if (existingUser) {
//     throw new Error("El correo ya está registrado.");
//   }

//   const existingCell = await User.findOne({
//     where: {
//       cellphone,
//     },
//   });

//   if (existingCell) {
//     throw new Error("El número de celular ya está registrado.");
//   }

//   // Encripta la contraseña
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Crea el nuevo usuario
//   const newUser = await User.create({
//     name,
//     second_name,
//     last_name,
//     second_last_name,
//     gender,
//     cellphone,
//     email,
//     password: hashedPassword,
//   });

//   return newUser;
// };
