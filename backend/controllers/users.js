import { User } from "../models/user.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import { tokenExtractor } from "../utils/middleware.js";

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
    const { username, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash,
      role: "user",
    });

    const { passwordHash: _, ...userData } = user.toJSON();

    res.status(201).json(userData);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Change username
router.put("/username", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = req.body.username;
    await user.save();

    const { passwordHash, ...userData } = user.toJSON();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Change bio PUT
router.put("/bio", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.bio = req.body.bio;
    await user.save();

    const { passwordHash, ...userData } = user.toJSON();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Change role to admin

export default router;
