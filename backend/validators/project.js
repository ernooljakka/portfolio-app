import { z } from "zod";

// Creating a new project
export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(150, "Description must be at most 150 characters"),
  longDescription: z
    .string()
    .max(2000, "Long description must be at most 2000 characters")
    .optional(),
  githubURL: z.url("Invalid GitHub URL").optional(),
  projectURL: z.url("Invalid URL").optional(),
  imageURL: z.url("Invalid URL").optional(),
  techStack: z.array(z.string().min(1)).min(1, "At least one tech is required").optional(),
});

// Updating a project
export const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100).optional(),
  description: z.string().min(10).max(150),
  longDescription: z.string().max(2000).optional(),
  githubURL: z.url().optional(),
  projectURL: z.url().optional(),
  imageURL: z.url().optional(),
  techStack: z.array(z.string().min(1)).optional(),
});
