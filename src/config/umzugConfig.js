import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "./db.js";

export const migrator = new Umzug({
  migrations: { glob: "src/database/migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export const seeder = new Umzug({
  migrations: { glob: "src/database/seeders/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: "SequelizeData" }),
  logger: console,
});
