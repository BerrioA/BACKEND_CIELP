import jwt from "jsonwebtoken";

export const generateToken = (uid, roleId) => {
  try {
    const expiresIn = 60 * 15; // 15 minutos
    const token = jwt.sign({ uid, roleId }, process.env.JWT_SECRET, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.error("Error generando token:", error);
    throw new Error("Error al generar el token");
  }
};

export const generateRefreshToken = (uid, roleId, res) => {
  const expiresIn = 60 * 60 * 15; // 15 horas en segundos

  try {
    const refreshToken = jwt.sign({ uid, roleId }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expiresIn * 1000, // 15 horas en milisegundos
    });
  } catch (error) {
    console.error("Error generando refresh token:", error);
    throw new Error("Error al generar el refresh token");
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT mal formado",
  "jwt must be provided": "JWT es requerido",
  
};
