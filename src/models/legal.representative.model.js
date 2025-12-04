import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";

export const LegalRepresentative = sequelize.define(
  "legal_representatives",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    legal_representative_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "legal_representatives",
  }
);
