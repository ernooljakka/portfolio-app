import { z } from "zod";

// Creating a new project
export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  projectURL: z.url("Invalid URL").optional(),
  imageURL: z.url("Invalid URL").optional(),
  techStack: z.array(z.string()).optional(),
});

// Updating a project
export const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  projectURL: z.url().optional(),
  imageURL: z.url().optional(),
  techStack: z.array(z.string()).optional(),
});
