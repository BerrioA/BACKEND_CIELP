import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Rol } from "./roles.model.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  second_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  second_last_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("Masculino", "Femenino", "Otro"),
    allowNull: false,
  },
  cellphone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Rol,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

// Hook para asignar automáticamente el rol de Paciente a nuevos usuarios
User.beforeCreate(async (user) => {
  if (!user.roleId) {
    try {
      const patientRol = await Rol.findOne({
        where: { role: "Paciente" },
      });

      if (patientRol) {
        user.roleId = patientRol.id;
      } else {
        console.error("No se encontró el rol de Paciente");
      }
    } catch (error) {
      console.error("Error al asignar rol por defecto:", error);
    }
  }
});
