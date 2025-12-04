import { DataTypes } from "sequelize";

export async function up({ context }) {
  await context.createTable("legal_representatives", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    legal_representative_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
}

export async function down({ context }) {
  await context.dropTable("legal_representatives");
}