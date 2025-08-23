import app from "./src/app.js";
import { sequelize } from "./src/config/db.js";
import "./src/models/relations.model.js";

async function main() {
  try {
    await sequelize.authenticate();
    console.log(
      "✅ La conexión con la base de datos se ha realizado con éxito."
    );

     await sequelize.sync({ force: true });
     await seedAll();

    // await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor LAPSI corriendo en el puerto: ${PORT}`);
    });
  } catch (error) {
    console.log(
      "❌ Error al intentar establecer la conexión con la base de datos CIELP.",
      error
    );
  }
}
main();
