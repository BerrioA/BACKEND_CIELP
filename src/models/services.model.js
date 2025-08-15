import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Service = sequelize.define("services", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

// Hook para insertar servicios después de sincronizar la tabla
Service.afterSync(async () => {
  const services = [
    {
      name: "Vencer el miedo paso a paso, en un espacio seguro",
      description:
        "Terapia de exposición con realidad virtual para enfrentar fobias y ansiedad social",
      items: [
        "Acompañamiento profesional frente a situaciones temidas",
        "Escenarios virtuales: hablar en público, alturas, volar, etc.",
        "Exposición gradual en un entorno seguro y controlado",
        "Estrategias de afrontamiento con apoyo psicológico en tiempo real",
        "Progreso emocional supervisado y personalizado",
      ],
    },
    {
      name: "Conecta, expresa y cree en ti",
      description: "Entrenamiento en habilidades sociales y autoestima con RV",
      items: [
        "Práctica de interacciones sociales en entornos simulados",
        "Escenarios como entrevistas, presentaciones y conversaciones cotidianas",
        "Retroalimentación personalizada de un psicólogo",
        "Mejora de habilidades sociales y expresión asertiva",
        "Fortalecimiento de la confianza y la autoimagen",
      ],
    },
    {
      name: "Comprender tus emociones, vivir con más calma",
      description: "Gestión emocional y regulación de ansiedad asistida por IA",
      items: [
        "Sesiones de identificación y manejo emocional con un terapeuta",
        "Plataforma con IA que acompaña entre sesiones",
        "Registro de estados de ánimo y apoyo personalizado",
        "Ejercicios adaptados de respiración, relajación y mindfulness",
        "Revisión constante del progreso por el profesional",
      ],
    },
    {
      name: "Aprende a cuidarte cuando todo parece demasiado",
      description: "Programa personalizado para el manejo del estrés",
      items: [
        "Terapia para enfrentar el estrés diario con TCC adaptada",
        "Estrategias de organización del tiempo y autocuidado emocional",
        "Apoyo con IA para seguimiento y ejercicios guiados",
        "Técnicas de relajación profunda y resiliencia personal",
        "Modalidad presencial o virtual según preferencia",
      ],
    },
    {
      name: "Crecer juntos, compartir y fortalecerte",
      description: "Talleres grupales de inteligencia emocional y autoestima",
      items: [
        "Espacios grupales guiados por un psicólogo",
        "Dinámicas para trabajar empatía, autoestima y resolución de conflictos",
        "Juegos de rol y ejercicios prácticos para fortalecer habilidades sociales",
        "Intercambio de experiencias entre pares",
        "Modalidad presencial o virtual según grupo",
      ],
    },
  ];

  await Service.bulkCreate(services, { ignoreDuplicates: true });
});
