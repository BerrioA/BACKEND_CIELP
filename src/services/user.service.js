import bcrypt from "bcryptjs";
import { sequelize } from "../config/db.js";
import { User } from "../models/user.model.js";
import { AdditionalInformation } from "../models/additional.information.model.js";
import { Service } from "../models/services.model.js";
import { Role } from "../models/roles.model.js";
import { LegalRepresentative } from "../models/legal.representative.model.js";

export const registerUser = async (
  { userData, representativeData },
  roleName = "patient"
) => {
  const {
    given_name,
    surname,
    phone,
    email,
    password,
    date_of_birth,
    service_id,
    sex,
    data_privacy_consent,
    psychological_treatment_consent,
  } = userData;

  const { rep_given_name, rep_surname, rep_phone, rep_email } =
    representativeData || {};

  const transaction = await sequelize.transaction();

  try {
    // Validar duplicados
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("El correo ya está registrado.");

    const existingCell = phone
      ? await User.findOne({ where: { phone } })
      : null;
    if (existingCell)
      throw new Error("El número de celular ya se encuentra registrado.");

    // Validar servicio sólo si se provee (p. ej. paciente puede requerirlo)
    let service = null;
    if (service_id) {
      service = await Service.findByPk(service_id);
      if (!service)
        throw new Error("El servicio seleccionado no está disponible.");
    } else if (roleName === "patient") {
      // Para pacientes insistir en service_id si tu modelo lo requiere
      throw new Error(
        "El servicio es requerido para el registro de pacientes."
      );
    }

    // Roles dinámicos según roleName
    const role = await Role.findOne({ where: { name: roleName } });
    const roleRepresentative = await Role.findOne({
      where: { name: "legal_representative" },
    });

    if (!role) throw new Error("El rol asignado no existe.");

    // Hash si viene password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Crear usuario (paciente, psicólogo, etc.)
    const newUser = await User.create(
      {
        given_name,
        surname,
        phone,
        email,
        password: hashedPassword,
        role_id: role.id,
      },
      { transaction }
    );

    // Crear representante legal solo si viene data y rol del paciente
    let newLegalRepresentative = null;

    if (representativeData && roleName === "patient") {
      newLegalRepresentative = await User.create(
        {
          given_name: rep_given_name,
          surname: rep_surname,
          phone: rep_phone,
          email: rep_email,
          password: null,
          role_id: roleRepresentative?.id,
        },
        { transaction }
      );

      await LegalRepresentative.create(
        {
          patient_id: newUser.id,
          legal_representative_id: newLegalRepresentative.id,
        },
        { transaction }
      );
    }

    // Información adicional: crear solo si hay datos relevantes
    const hasAdditionalInfo =
      date_of_birth ||
      sex ||
      typeof data_privacy_consent !== "undefined" ||
      typeof psychological_treatment_consent !== "undefined" ||
      service;

    if (hasAdditionalInfo) {
      await AdditionalInformation.create(
        {
          date_of_birth: date_of_birth || null,
          sex: sex || null,
          data_privacy_consent: data_privacy_consent || null,
          psychological_treatment_consent:
            psychological_treatment_consent || null,
          user_id: newUser.id,
          service_id: service ? service.id : null,
        },
        { transaction }
      );
    }

    await transaction.commit();
    return newUser;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al registrar el usuario:", error.message);
    throw error;
  }
};

export const getUserProfile = async (uid) => {
  const user = await User.findByPk(uid, {
    include: {
      model: Role,
      attributes: ["name"],
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return {
    uid: user.id,
    given_name: user.given_name,
    surname: user.surname,
    email: user.email,
    role: user.role?.name,
  };
};
