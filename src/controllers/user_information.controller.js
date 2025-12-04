import { registerUserInformation } from "../services/user_information.service.js";

export const createUserInformation = async (req, res) => {
  try {
    const { userId, serviceId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "El campo userId es obligatorio." });
    }

    const userInfo = await registerUserInformation({ userId, serviceId });

    res.status(201).json({
      message: "Información del usuario registrada correctamente.",
      data: userInfo,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
