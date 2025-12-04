import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Space = sequelize.define(
  "spaces",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "spaces",
  }
);
