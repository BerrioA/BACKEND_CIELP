import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Service } from "./services.model.js";

export const UserInformation = sequelize.define("user_informations", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  serviceId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Service,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
