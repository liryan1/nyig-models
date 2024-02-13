import { z } from "zod";

export const zUserRoles = z.object({
  user: z.number().int(),
  admin: z.number().int(),
  superadmin: z.number().int(),
});
export type UserRoles = z.infer<typeof zUserRoles>;
