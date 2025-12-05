import { v4 as uuidv4 } from "uuid";

export async function up({ context }) {
  await context.bulkInsert(
    "spaces",
    [
      {
        id: uuidv4(),
        title: "Sala de Entrenamiento en Comunicación Terapéutica",
        description:
          "La Sala de Entrenamiento en Comunicación Terapéutica es un espacio dirigido a personas con miedo a hablar en público o ansiedad social. Mediante técnicas psicológicas y ejercicios guiados, ayuda a mejorar la confianza, la expresión y la seguridad al comunicarse.",
        url: "https://www.spatial.io/s/Sala-Cielp-692c7b46ab39474d1b19bcc4?share=281102136189982839",
        image_url:
          "https://s3.ppllstatics.com/elcorreo/www/multimedia/202111/25/media/cortadas/metaverso-kgJH-U16032571521FmF-1248x770@RC.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
}

export async function down({ context }) {
  await context.bulkDelete(
    "spaces",
    {
      title: ["Sala de Entrenamiento en Comunicación Terapéutica"],
    },
    {}
  );
}
