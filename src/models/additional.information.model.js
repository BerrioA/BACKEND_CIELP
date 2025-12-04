import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Service } from "./services.model.js";

export const AdditionalInformation = sequelize.define(
  "additional_information",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data_privacy_consent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    psychological_treatment_consent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    service_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Service,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "additional_information",
  }
);
