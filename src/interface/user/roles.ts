import { z } from "zod";

export enum Role {
  SUPERADMIN = 7926,
  ADMIN = 2023,
  USER = 2014,
}

export const zUserRoles = z.object({
  user: z.number().int(),
  admin: z.number().int(),
  superadmin: z.number().int(),
});
export type UserRoles = z.infer<typeof zUserRoles>;
