import { getAllServices } from "../services/services.service.js";

// Controlador para obtener todos los servicios
export const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (error) {
    console.error("Se ha presentado un error al obtener los servicios", error);
    res.status(500).json({ error: error.message });
  }
};
