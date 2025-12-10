import {
  Role,
  User,
  Service,
  LegalRepresentative,
  AdditionalInformation,
} from "../models/index.js";

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

    const patient = await User.findByPk(patientId, {
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
        {
          model: LegalRepresentative,
          as: "legalRepresentatives",
          attributes: ["id", "legal_representative_id"],
          required: false,
          include: [
            {
              model: User,
              as: "legalRepresentativeUser",
              attributes: ["id", "given_name", "surname", "email", "phone"],
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
    });

    const patientData = patient.toJSON();
    const representanteInfo = patientData.legalRepresentatives;

    return {
      id: patientData.id,
      given_name: patientData.given_name,
      surname: patientData.surname,
      phone: patientData.phone,
      email: patientData.email,
      created_at: patientData.created_at,
      date_of_birth: patientData.additional_information?.date_of_birth,
      sex: patientData.additional_information?.sex,
      data_privacy_consent:
        patientData.additional_information?.data_privacy_consent,
      psychological_treatment_consent:
        patientData.additional_information?.psychological_treatment_consent,
      service_id: patientData.additional_information?.service_id,
      service_name: patientData.additional_information?.service?.name,
      legal_representative: representanteInfo[0]?.legalRepresentativeUser,
    };
  } catch (error) {
    throw new Error("Error al obtener el paciente: " + error.message);
  }
};
