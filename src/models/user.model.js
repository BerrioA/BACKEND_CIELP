import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./roles.model.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  given_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  role_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  status: {
    type: DataTypes.ENUM("verified", "pending", "suspended"),
    allowNull: false,
    defaultValue: "verified",
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: { 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Hook para asignar automáticamente el rol de Paciente a nuevos usuarios
User.beforeCreate(async (user) => {
  if (!user.roleId) {
    try {
      const patientRol = await Role.findOne({
        where: { name: "patient" },
      });

      if (patientRol) {
        user.role_id = patientRol.id;
      } else {
        console.error("No se encontró el rol de Paciente");
      }
    } catch (error) {
      console.error("Error al asignar rol por defecto:", error);
    }
  }
});
