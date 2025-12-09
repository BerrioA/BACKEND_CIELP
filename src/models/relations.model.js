import { Role } from "./roles.model.js";
import { User } from "./user.model.js";
import { AdditionalInformation } from "./additional.information.model.js";
import { LegalRepresentative } from "./legal.representative.model.js";
import { RecoveryToken } from "./recovery.tokens.model.js";
import { Service } from "./services.model.js";

// Un rol tiene muchos usuarios
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// Un usuario tiene muchos representantes legales (como paciente)
User.hasMany(LegalRepresentative, {
  foreignKey: "patient_id",
  as: "legalRepresentatives",
});
LegalRepresentative.belongsTo(User, {
  foreignKey: "patient_id",
  as: "patient",
});

// Un usuario puede ser representante legal de muchos pacientes
User.hasMany(LegalRepresentative, {
  foreignKey: "legal_representative_id",
  as: "representingPatients",
});
LegalRepresentative.belongsTo(User, {
  foreignKey: "legal_representative_id",
  as: "legalRepresentativeUser",
});

// Un usuario tiene una información adicional
User.hasOne(AdditionalInformation, { foreignKey: "user_id" });
AdditionalInformation.belongsTo(User, { foreignKey: "user_id" });

// Una información de usuario tiene un servicio relacionado
AdditionalInformation.belongsTo(Service, { foreignKey: "service_id" });
Service.hasMany(AdditionalInformation, { foreignKey: "service_id" });

// Un usuario tiene muchos tokens de recuperación
User.hasMany(RecoveryToken, { foreignKey: "user_id" });
RecoveryToken.belongsTo(User, { foreignKey: "user_id" });
