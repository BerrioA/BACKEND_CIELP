import { User } from "../models/user.model.js";
import { Service } from "../models/services.model.js";
import { UserInformation } from "../models/user_information.model.js";

export const registerUserInformation = async ({ userId, serviceId }) => {
  // Validación de existencia de usuario
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  // Validación de existencia de servicio (si se proporciona)
  let service = null;
  if (serviceId) {
    service = await Service.findByPk(serviceId);
    if (!service) {
      throw new Error("Servicio no encontrado.");
    }
  }

  // Verificar si ya existe una relación entre el usuario y ese servicio (opcional)
  const existing = await UserInformation.findOne({
    where: { userId, serviceId },
  });

  if (existing) {
    throw new Error("Este usuario ya tiene este servicio asignado.");
  }

  // Crear el registro en user_informations
  const userInfo = await UserInformation.create({
    userId,
    serviceId: serviceId || null,
  });

  return userInfo;
};
