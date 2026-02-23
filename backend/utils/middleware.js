import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

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

// Error handler
