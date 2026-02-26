import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { ZodError } from "zod";

// JWT auth check
export const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      //console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

// Zod validation

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(error); // fallback for other errors
  }
};

// Error handler
export const errorHandler = (error, req, res, next) => {
  console.error("ERROR:", error);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      error: "Unique constraint failed",
      fields: error.errors?.map((e) => e.path) || [],
    });
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      error: "Invalid foreign key",
    });
  }

  if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      error: "Database error",
      details: error.message,
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  return res.status(500).json({
    error: "Internal Server Error",
  });
};
