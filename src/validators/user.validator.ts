import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().max(255).optional(),
  username: z.string({ message: "username required" }),
  email: z
    .string({ message: "email required" })
    .email({ message: "invalid email format" }),
  password: z
    .string({ message: "password required" })
    .min(5, { message: "password must be at least 5 characters" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "email required" })
    .email({ message: "invalid email format" }),
  password: z.string({ message: "password required" }),
});

export type TLogin = z.infer<typeof loginSchema>;
export type TUser = z.infer<typeof registerSchema>;
export type TRegister = z.infer<typeof registerSchema>;
