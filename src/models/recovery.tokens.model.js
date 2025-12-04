import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";

export const RecoveryToken = sequelize.define(
  "recovery_tokens",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    expires_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "recovery_tokens",
  }
);
