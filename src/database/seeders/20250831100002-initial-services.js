import { v4 as uuidv4 } from "uuid";

export async function up({ context }) {
  await context.bulkInsert(
    "services",
    [
      {
        id: uuidv4(),
        name: "Sin Miedos",
        description:
          "Terapia de exposición con realidad virtual para enfrentar fobias y ansiedad social.",
        items: JSON.stringify([
          "Acompañamiento profesional frente a situaciones temidas",
          "Escenarios virtuales: hablar en público, alturas, volar, etc.",
          "Exposición gradual en un entorno seguro y controlado",
          "Estrategias de afrontamiento con apoyo psicológico en tiempo real",
          "Progreso emocional supervisado y personalizado",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Socialízate",
        description:
          "Entrenamiento en habilidades sociales y autoestima con RV, conecta, expresa y cree en ti mismo",
        items: JSON.stringify([
          "Práctica de interacciones sociales en entornos simulados",
          "Escenarios como entrevistas, presentaciones y conversaciones cotidianas",
          "Retroalimentación personalizada de un psicólogo",
          "Mejora de habilidades sociales y expresión asertiva",
          "Fortalecimiento de la confianza y la autoimagen",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Emociónate",
        description:
          "Gestión emocional y regulación de ansiedad asistida por IA, Comprender tus emociones, vivir con más calma",
        items: JSON.stringify([
          "Sesiones de identificación y manejo emocional con un terapeuta",
          "Plataforma con IA que acompaña entre sesiones",
          "Registro de estados de ánimo y apoyo personalizado",
          "Ejercicios adaptados de respiración, relajación y mindfulness",
          "Revisión constante del progreso por el profesional",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Relájate",
        description:
          "Programa personalizado para el manejo del estrés, aprende a cuidarte cuando todo parece demasiado",
        items: JSON.stringify([
          "Terapia para enfrentar el estrés diario con TCC adaptada",
          "Estrategias de organización del tiempo y autocuidado emocional",
          "Apoyo con IA para seguimiento y ejercicios guiados",
          "Técnicas de relajación profunda y resiliencia personal",
          "Modalidad presencial o virtual según preferencia",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Conéctate",
        description:
          "Talleres grupales de inteligencia emocional y autoestima. Crecer, compartir y fortalecerte",
        items: JSON.stringify([
          "Espacios grupales guiados por un psicólogo",
          "Dinámicas para trabajar empatía, autoestima y resolución de conflictos",
          "Juegos de rol y ejercicios prácticos para fortalecer habilidades sociales",
          "Intercambio de experiencias entre pares",
          "Modalidad presencial o virtual según grupo",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
}

export async function down({ context }) {
  await context.bulkDelete(
    "services",
    {
      name: [
        "Sin Miedos",
        "Socialízate",
        "Emociónate",
        "Relájate",
        "Conéctate",
      ],
    },
    {}
  );
}
