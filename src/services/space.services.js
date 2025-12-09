import { Space } from "../models/spaces.model.js";

// Servicio para obtener todos los espacios
export const getAllSpaces = async () => {
  try {
    const spaces = await Space.findAll({
      attributes: ["id", "title", "description", "url", "image_url"],
      order: [["title", "ASC"]],
    });

    return spaces;
  } catch (error) {
    throw new Error("Error al obtener los espacios: " + error.message);
  }
};
