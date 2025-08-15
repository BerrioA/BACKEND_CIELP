import { Rol } from "./roles.model.js";
import { User } from "./user.model.js";
import { UserInformation } from "./user_information.model.js";
import { Service } from "./services.model.js";

// Un rol tiene muchos usuarios
Rol.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Rol, { foreignKey: "roleId" });

// Un usuario tiene una información correspondiente
User.hasOne(UserInformation, { foreignKey: "userId" });
UserInformation.belongsTo(User, { foreignKey: "userId" });

// Una información de usuario tiene un servicio relacionado
UserInformation.belongsTo(Service, { foreignKey: "serviceId" });
Service.hasMany(UserInformation, { foreignKey: "serviceId" });
