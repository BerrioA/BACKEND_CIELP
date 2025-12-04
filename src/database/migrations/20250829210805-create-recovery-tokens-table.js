import { DataTypes } from "sequelize";

export async function up({ context }) {
  await context.createTable("recovery_tokens", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    expires_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
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
  await context.dropTable("recovery_tokens");
}
