import bcryptjs from "bcryptjs";
import { User } from "../models/index.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import { NODE_ENV } from "../config/env.js";

// Servicio para iniciar sesión
export const authLogin = async (userAuth, res) => {
  const { email, password } = userAuth;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Credenciales incorrectas.");
  }

  const matchPassword = await bcryptjs.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Credenciales incorrectas.");
  }

  const { token, expiresIn } = generateToken(user.id);
  generateRefreshToken(user.id, user.roleId, res);

  return {
    token,
    expiresIn,
  };
};

// Servicio para cerrar sesión
export const authLogout = (req, res) => {
  // Si no hay token, simplemente salir
  if (!req.cookies?.refreshToken) {
    return { message: "No hay sesión activa." };
  }

  // Limpiar cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
  });

  return { message: "Sesión cerrada correctamente." };
};
