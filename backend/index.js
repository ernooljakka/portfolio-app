import express from "express";
import cors from "cors";
import { PORT } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";
import "./models/index.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
