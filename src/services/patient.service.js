import { Rol } from "../models/roles.model.js";
import { User } from "../models/user.model.js";

export const getAllPatients = async () => {
  try {
    const patients = await User.findAll({
      include: [
        {
          model: Rol,
          where: {
            role: "Paciente",
          },
        },
      ],
      attributes: [
        "id",
        "name",
        "second_name",
        "last_name",
        "second_last_name",
        "gender",
        "cellphone",
        "email",
      ],
      order: [["name", "ASC"]],
    });

    return patients;
  } catch (error) {
    throw new Error("Error al obtener los servicios: " + error.message);
  }
};

export const getOnePatient = async (id) => {
  try {
    const { patientId } = id;

    console.log(patientId);

    const patients = await User.findByPk(patientId, {
      include: [
        {
          model: Rol,
          where: {
            role: "Paciente",
          },
          attributes: ["id", "role"],
        },
      ],
      attributes: [
        "id",
        "name",
        "second_name",
        "last_name",
        "second_last_name",
        "gender",
        "cellphone",
        "email",
      ],
      order: [["name", "ASC"]],
    });

    return patients;
  } catch (error) {
    throw new Error("Error al obtener los servicios: " + error.message);
  }
};
