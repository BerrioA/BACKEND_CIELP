import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Rol = sequelize.define("roles", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

// Hook para insertar roles después de sincronizar la tabla
Rol.afterSync(async () => {
  const roles = ["SuperAdmin", "Admin", "Psicologo", "Paciente"];
  await Rol.bulkCreate(
    roles.map((rol) => ({ role: rol })),
    { ignoreDuplicates: true }
  );
});
