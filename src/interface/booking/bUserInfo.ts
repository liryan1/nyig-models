import { Types } from "mongoose";
import { z } from "zod";

export const zBUserInfo = z.object({
  userId: z.instanceof(Types.ObjectId).optional(),
  firstName: z.string(),
  lastName: z.string(),
  rank: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export type BUserInfo = z.infer<typeof zBUserInfo>;
