import bcrypt from "bcryptjs";
import { sequelize } from "../config/db.js";
import { User } from "../models/user.model.js";
import { AdditionalInformation } from "../models/additional.information.model.js";
import { Service } from "../models/services.model.js";
import { Role } from "../models/roles.model.js";
import { LegalRepresentative } from "../models/legal.representative.model.js";

export const registerUser = async ({ userData, representativeData }) => {
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

    const existingCell = await User.findOne({ where: { phone } });
    if (existingCell)
      throw new Error("El número de celular ya se encuentra registrado.");

    // Validar servicio
    const service = await Service.findByPk(service_id);
    if (!service)
      throw new Error("El servicio seleccionado no está disponible.");

    // Roles
    const role = await Role.findOne({ where: { name: "patient" } });
    const roleRepresentative = await Role.findOne({
      where: { name: "legal_representative" },
    });

    if (!role || !roleRepresentative)
      throw new Error("El rol asignado no existe.");

    // Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear paciente
    const newPatient = await User.create(
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

    // Crear representante legal solo si viene data
    let newLegalRepresentative = null;

    if (representativeData) {
      newLegalRepresentative = await User.create(
        {
          given_name: rep_given_name,
          surname: rep_surname,
          phone: rep_phone,
          email: rep_email,
          password: null,
          role_id: roleRepresentative.id,
        },
        { transaction }
      );

      await LegalRepresentative.create(
        {
          patient_id: newPatient.id,
          legal_representative_id: newLegalRepresentative.id,
        },
        { transaction }
      );
    }

    // Información adicional
    await AdditionalInformation.create(
      {
        date_of_birth,
        sex,
        data_privacy_consent,
        psychological_treatment_consent,
        user_id: newPatient.id,
        service_id: service.id,
      },
      { transaction }
    );

    await transaction.commit();
    return newPatient;
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
      as: "role",
      attributes: ["role"],
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return {
    uid: user.id,
    name: user.name,
    second_name: user.second_name,
    last_name: user.last_name,
    second_last_name: user.second_last_name,
    gender: user.gender,
    cellphone: user.cellphone,
    email: user.email,
    role: user.role?.role,
  };
};