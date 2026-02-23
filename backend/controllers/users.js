import { User } from "../models/user.js";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash"] },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash,
      bio,
      role: "user",
    });

    const { passwordHash: _, ...userData } = user.toJSON();

    res.status(201).json(userData);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Change username PUT

// Change bio PUT

// Change role to admin PUT

export default router;
