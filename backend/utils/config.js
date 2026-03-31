import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const DB_URL =
  process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/portfoliodb";

export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";
