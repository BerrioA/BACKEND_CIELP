import { Sequelize } from "sequelize";
import { POSTGRES_URL } from "./env.js";

export const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Importante para Render
    },
  },
  logging: false,
});
