import { Service } from "../models/services.model.js";

export const getAllServices = async () => {
  try {
    const services = await Service.findAll({
      attributes: ["id", "name", "description", "items"],
      order: [["name", "ASC"]],
    });

    return services;
  } catch (error) {
    throw new Error("Error al obtener los servicios: " + error.message);
  }
};
