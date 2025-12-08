import { sequelize } from "../config/db.js";
import { AdditionalInformation } from "../models/additional.information.model.js";
import { LegalRepresentative } from "../models/legal.representative.model.js";
import { Role } from "../models/roles.model.js";
import { Service } from "../models/services.model.js";
import { User } from "../models/user.model.js";

// Servicio para obtener todos los pacientes
export const getAllPatients = async () => {
  try {
    const patients = await User.findAll({
      include: [
        {
          model: Role,
          where: { name: "patient" },
          attributes: [],
        },
        {
          model: AdditionalInformation,
          attributes: [
            "id",
            "date_of_birth",
            "sex",
            "data_privacy_consent",
            "psychological_treatment_consent",
            "service_id",
          ],
          required: false,
          include: [
            {
              model: Service,
              attributes: ["id", "name"],
              required: false,
            },
          ],
        },
      ],
      attributes: [
        "id",
        "given_name",
        "surname",
        "phone",
        "email",
        "created_at",
      ],
      order: [["given_name", "ASC"]],
    });

    const formattedPatients = patients.map((patient) => {
      const patientData = patient.toJSON();

      const additionalInfo = patientData.additional_information;

      return {
        id: patientData.id,
        given_name: patientData.given_name,
        surname: patientData.surname,
        phone: patientData.phone,
        email: patientData.email,
        date_of_birth: additionalInfo?.date_of_birth || null,
        sex: additionalInfo?.sex || null,
        service_id: additionalInfo?.service_id || null,
        service_name: additionalInfo?.service?.name || null,
        created_at: patientData.created_at,
      };
    });

    return formattedPatients;
  } catch (error) {
    throw new Error("Error al obtener los pacientes: " + error.message);
  }
};

// Servicio para obtener un paciente por ID
export const getOnePatient = async (id) => {
  try {
    const { patientId } = id;

    const patients = await User.findByPk(patientId, {
      include: [
        {
          model: Role,
          where: {
            name: "patient",
          },
          attributes: [],
        },
        {
          model: AdditionalInformation,
          attributes: [
            "id",
            "date_of_birth",
            "sex",
            "data_privacy_consent",
            "psychological_treatment_consent",
            "service_id",
          ],
          required: false,
          include: [
            {
              model: Service,
              attributes: ["id", "name"],
              required: false,
            },
          ],
        },
      ],
      include: [
        {
          model: LegalRepresentative,
          attributes: ["id", "legal_representative_id"],
          required: false,
        },
      ],
      attributes: [
        "id",
        "given_name",
        "surname",
        "phone",
        "email",
        "created_at",
      ],
      order: [["given_name", "ASC"]],
    });

    return patients;
  } catch (error) {
    throw new Error("Error al obtener los servicios: " + error.message);
  }
};
