import app from "./app.js";
import { sequelize } from "./config/db.js";
import { NODE_ENV, PORT } from "./config/env.js";
import { migrator, seeder } from "./config/umzugConfig.js";
import "./models/relations.model.js";

async function main() {
  try {
    await sequelize.authenticate();
    console.log(
      "✅ La conexión con la base de datos se ha realizado con éxito."
    );

    // await sequelize.sync({ alter: true });

    // await migrator.up();
    // await seeder.up();

    if (NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`✅ Servidor CIELP corriendo en el puerto: ${PORT}`);
      });
    }
  } catch (error) {
    console.log(
      "❌ Error al intentar establecer la conexión con la base de datos CIELP.",
      error
    );
  }
}

main();
