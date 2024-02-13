import { z } from "zod";

export const zBUserInfo = z.object({
  firstName: z.string(),
  lastName: z.string(),
  rank: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export type BUserInfo = z.infer<typeof zBUserInfo>;
