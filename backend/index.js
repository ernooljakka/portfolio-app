import express from "express";
import cors from "cors";
import { PORT } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";
import "./models/index.js";
import { errorHandler } from "./utils/middleware.js";

import userRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import projectRouter from "./controllers/projects.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/projects", projectRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(`
    <h1>Backend is running!</h1>
    <ul>
      <li><a href="http://localhost:5000/api/projects/all">All Projects</a></li>
      <li><a href="http://localhost:5000/api/users">Users</a></li>
    </ul>
  `);
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
  });
};

start();
