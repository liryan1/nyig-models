import { z } from "zod";

export interface CreateAdminAccountRequest {
  _id: string;
  user: string;
  pwd: string;
}

export interface ChangePasswordRequest {
  prev: string;
  next: string;
}

export interface LoginRequest {
  user: string;
  pwd: string;
}

export interface LoginResponse {
  user: string;
  token: string;
}

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
