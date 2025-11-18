import { DataTypes } from "sequelize";

export async function up({ context }) {
  await context.createTable("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    given_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    status: {
      type: DataTypes.ENUM("verified", "pending", "suspended"),
      allowNull: false,
      defaultValue: "verified",
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
  await context.dropTable("users");
}
