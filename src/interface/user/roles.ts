import { z } from "zod";

export enum Role {
  SUPERADMIN = 7926,
  ADMIN = 2023,
  USER = 2014,
}

export interface UserRoles {
  user: number;
  admin?: number;
  superadmin?: number;
}

export const zUserRoles = z.object({
  user: z.number().int(),
  admin: z.number().int().optional(),
  superadmin: z.number().int().optional(),
});
