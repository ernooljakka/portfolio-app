import { z } from "zod";

// Creating new user
export const createUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().optional(),
});

// Updating username
export const updateUsernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export const updateBioSchema = z.object({
  bio: z.string().min(5, "Bio must be at least 5 characters"),
});

// Login
export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
