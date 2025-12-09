import { getAllSpaces } from "../services/space.services.js";

// Controlador para obtener todos los espacios
export const getSpaces = async (req, res) => {
  try {
    const spaces = await getAllSpaces();
    res.status(200).json(spaces);
  } catch (error) {
    console.error("Se ha presentado un error al obtener los espacios", error);
    res.status(500).json({ error: error.message });
  }
};
