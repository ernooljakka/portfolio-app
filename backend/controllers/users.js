import { User } from "../models/user.js";
import { Project } from "../models/project.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import { tokenExtractor, validate } from "../utils/middleware.js";
import { createUserSchema, updateUsernameSchema, updateBioSchema } from "../validators/user.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash"] },
    include: {
      model: Project,
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
    },
  });
  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(createUserSchema), async (req, res, next) => {
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
    next(error);
  }
});

// Change username
router.put("/username", tokenExtractor, validate(updateUsernameSchema), async (req, res, next) => {
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
    next(error);
  }
});

// Change bio PUT
router.put("/bio", tokenExtractor, validate(updateBioSchema), async (req, res, next) => {
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
    next(error);
  }
});

// Delete user, only self can delete user
router.delete("/:id", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Only allow deleting own account (or expand later for admin)
    if (user.id !== req.decodedToken.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await user.destroy();

    res.status(204).end();
  } catch (error) {
    next(error); // passes to your global error handler
  }
});

// Change role to admin

export default router;
