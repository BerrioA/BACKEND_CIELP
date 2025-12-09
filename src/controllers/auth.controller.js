import { authLogin, authLogout, getUserProfile } from "../services/index.js";

// Controlador para obtener el perfil del usuario autenticado
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

// Controlador para manejar el inicio de sesión
export const login = async (req, res) => {
  try {
    const result = await authLogin(req.body, res);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error en el controlador de login:", error.message);

    return res.status(403).json({
      message: error.message || "Error al iniciar sesión.",
    });
  }
};

// Controlador para manejar el cierre de sesión
export const logout = async (req, res) => {
  try {
    const result = authLogout(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al intentar cerrar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
