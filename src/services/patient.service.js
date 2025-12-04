import { AdditionalInformation } from "../models/additional.information.model.js";
import { Role } from "../models/roles.model.js";
import { Service } from "../models/services.model.js";
import { User } from "../models/user.model.js";

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

    console.log(formattedPatients);
    return formattedPatients;
  } catch (error) {
    throw new Error("Error al obtener los pacientes: " + error.message);
  }
};

export const getOnePatient = async (id) => {
  try {
    const { patientId } = id;

    console.log(patientId);

    const patients = await User.findByPk(patientId, {
      include: [
        {
          model: Role,
          where: {
            name: "Paciente",
          },
          attributes: ["id", "name"],
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
