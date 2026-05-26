import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email"),
    name: z.string().min(3, "Name must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type signUpRequestNeonAuth = z.infer<typeof registerSchema>;
export type loginRequestNeonAuth = z.infer<typeof loginSchema>;