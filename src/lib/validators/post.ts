import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(150, "Must be less than 120 characters"),
  content: z.string().min(10, "Must be at least 10 characters").max(1400, "Must be less than 5000 characters"),
});
