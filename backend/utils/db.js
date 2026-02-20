import { Sequelize } from "sequelize";
import { DB_URL } from "./config.js";

export const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");

    await sequelize.sync({ alter: true });
    console.log("Database synced");
  } catch (err) {
    console.log(err);

    console.log("connecting database failed");
    return process.exit(1);
  }

  return null;
};
