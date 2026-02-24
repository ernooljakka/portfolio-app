import { Router } from "express";
import { tokenExtractor } from "../utils/middleware.js";
import { Project } from "../models/project.js";

const router = Router();

// GET all projects for the logged-in user
router.get("/", tokenExtractor, async (req, res, next) => {
  try {
    const userId = req.decodedToken.id;
    const projects = await Project.findAll({ where: { userId } });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// GET all projects
router.get("/all", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const userId = req.decodedToken.id;
    const project = await Project.create({
      userId,
      ...req.body,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// Delete a project by ID
router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Only allow deleting if the logged-in user owns the project
    if (project.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await project.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
