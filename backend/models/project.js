import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { User } from "./user.js";

export const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  projectURL: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  techStack: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],

    set(value) {
      if (!value) {
        this.setDataValue("techStack", []);
        return;
      }

      const normalized = [...new Set(value.map((tech) => tech.toLowerCase().trim()))];

      this.setDataValue("techStack", normalized);
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
