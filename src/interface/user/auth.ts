import { z } from "zod";

export const zCreateAdminAccountRequest = z.object({
  _id: z.string(),
  user: z.string().min(3, "Username must be at least 3 characters"),
  pwd: z.string().min(6),
});

export const zChangePasswordRequest = z.object({
  prev: z.string().min(6),
  next: z.string().min(6),
});

export const zLoginRequest = z.object({
  user: z.string().min(3, "Username must be at least 3 characters"),
  pwd: z.string().min(6),
});

export const zLoginResponse = z.object({
  user: z.string(),
  token: z.string(),
});

export type CreateAdminAccountRequest = z.infer<typeof zCreateAdminAccountRequest>;
export type ChangePasswordRequest = z.infer<typeof zChangePasswordRequest>;
export type LoginRequest = z.infer<typeof zLoginRequest>;
export type LoginResponse = z.infer<typeof zLoginResponse>;
